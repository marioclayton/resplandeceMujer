import { createClient } from "contentful";
import { messages as fallbackMessages } from "../data/messages";

export type ShortMessage = {
  id: string;
  theme: string;
  text: string;
  reference: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

function assetUrl(value: unknown) {
  if (typeof value !== "string" || !value) return "";
  return value.startsWith("//") ? `https:${value}` : value;
}

function isMissingContentTypeError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const contentfulError = error as {
    status?: number;
    details?: { errors?: Array<{ name?: string }> };
  };

  return contentfulError.status === 400
    && contentfulError.details?.errors?.some(({ name }) => name === "unknownContentType");
}

export async function getShortMessages(limit = 100): Promise<ShortMessage[]> {
  try {
    const response = await client.getEntries({
      content_type: "shortMessage",
      order: ["-sys.createdAt"],
      include: 1,
      limit,
    });

    const contentfulMessages = response.items.flatMap((entry) => {
      const fields = entry.fields as Record<string, any>;
      const imageFields = fields.image?.fields;
      const image = assetUrl(imageFields?.file?.url);

      if (!fields.message || !fields.theme || !image) return [];

      return [{
        id: entry.sys.id,
        theme: String(fields.theme),
        text: String(fields.message),
        reference: fields.scriptureReference ? String(fields.scriptureReference) : "",
        image,
        imageAlt: fields.imageAlt
          ? String(fields.imageAlt)
          : String(imageFields?.description || imageFields?.title || "Imagen que acompaña el mensaje"),
        imagePosition: fields.imagePosition ? String(fields.imagePosition) : "center",
      }];
    });

    return contentfulMessages.length
      ? contentfulMessages
      : (fallbackMessages as ShortMessage[]).slice(0, limit);
  } catch (error) {
    // The sample messages intentionally remain available until the Contentful
    // model is created. Avoid turning that expected state into a Next.js error
    // overlay, while continuing to report genuine delivery/API failures.
    if (!isMissingContentTypeError(error)) {
      console.error("Error fetching short messages from Contentful:", error);
    }
    return (fallbackMessages as ShortMessage[]).slice(0, limit);
  }
}
