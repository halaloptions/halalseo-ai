import OpenAI from 'openai';

export const runtime = 'nodejs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are an expert SEO copywriter for halal restaurant directory pages.
Generate human-like, search-friendly content for one restaurant using only the supplied restaurant name and address.

Output requirements:
- Start with one 150-character meta description in plain markdown bold using **...**.
- Use only these HTML tags after the meta description: <h2>, <p>, <strong>, <br>.
- Do not use <h1>, lists, tables, links, scripts, markdown headings or extra tags.
- Put every <h2> heading on its own line.
- Put paragraphs on their own separate lines.
- Leave one blank line between sections.
- Write in third person.
- Make it useful for travellers and locals.
- Include: About, halal status, cuisine tags, menu/signature dishes, dining experience, ingredients/quality, nearby landmarks, parking, ordering options.
- Naturally answer common questions inside paragraphs instead of writing an FAQ list.
- If certification, alcohol, pork, Uber Eats, DoorDash or Menulog details are unknown, say the listing should be verified before publishing.`;

export async function POST(request) {
  try {
    const { restaurantName, address } = await request.json();

    if (!restaurantName || !address) {
      return Response.json({ error: 'Restaurant name and address are required.' }, { status: 400 });
    }

    const model = process.env.OPENAI_MODEL || 'gpt-5.2-mini';

    const response = await client.responses.create({
      model,
      instructions: SYSTEM_PROMPT,
      input: `Restaurant Name: ${restaurantName}\nAddress: ${address}`,
      max_output_tokens: 1800
    });

    return Response.json({ content: response.output_text || '' });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error.message || 'Failed to generate content.' },
      { status: 500 }
    );
  }
}
