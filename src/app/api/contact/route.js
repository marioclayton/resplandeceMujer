import nodemailer from "nodemailer";
import { cleanText, escapeHtml, isSameSiteRequest, isValidEmail } from "../../../lib/request-security";

export async function POST(req) {
  if (!isSameSiteRequest(req)) return Response.json({ message: "Solicitud no permitida." }, { status: 403 });
  try {
    const body = await req.json();
    if (body.website) return Response.json({ message: "Mensaje recibido." });
    const name = cleanText(body.name, 100);
    const email = cleanText(body.email, 254);
    const subject = cleanText(body.subject, 150);
    const message = cleanText(body.message, 5000);
    if (!name || !message || !isValidEmail(email)) return Response.json({ message: "Revisa los campos requeridos." }, { status: 400 });
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) return Response.json({ message: "El servicio no está disponible." }, { status: 503 });

    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS } });
    await transporter.sendMail({
      from: `Resplandece Mujer <${process.env.GMAIL_USER}>`,
      replyTo: `${name} <${email}>`,
      to: process.env.GMAIL_USER,
      subject: subject || "Nuevo mensaje de contacto",
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return Response.json({ message: "Mensaje enviado con éxito." });
  } catch {
    return Response.json({ message: "No se pudo enviar el mensaje." }, { status: 500 });
  }
}
