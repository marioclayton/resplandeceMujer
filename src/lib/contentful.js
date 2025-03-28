// lib/contentful.js

import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID, // Set in .env.local
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN, // Set in .env.local
});

export default client;
