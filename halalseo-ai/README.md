# HalalSEO AI

HalalSEO AI is a simple AI-powered landing page and content generator for halal restaurant directories. It lets you enter a restaurant name and address, then generates SEO-ready restaurant content with a meta description and simple WordPress-friendly HTML.

Many pages have been generated for the website https:\\halaloptions.com.au 
e.g.
https://halaloptions.com.au/location/sydney/
https://halaloptions.com.au/location/melbourne/
https://halaloptions.com.au/location/canberra/
https://halaloptions.com.au/location/brisbane/
https://halaloptions.com.au/location/adelaide/
https://halaloptions.com.au/location/perth/
https://halaloptions.com.au/location/tasmania/
https://halaloptions.com.au/location/wollongong/


## Features

- SEO-friendly restaurant profile generation
- 150-character meta description
- WordPress-ready HTML output
- Uses only `<h2>`, `<p>`, `<strong>` and `<br>` tags in generated content
- Built with Next.js and the OpenAI JavaScript SDK
- API key stays server-side, not in the browser

## Tech Stack

- Next.js
- React
- OpenAI Responses API
- CSS

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy the example file:

```bash
cp .env.example .env
```

Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.2-mini
```

You can change the model depending on what is available in your OpenAI account.

### 3. Run locally

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## How It Works

The app sends only the restaurant name and address from the browser to the backend route:

```bash
POST /api/generate
```

The reusable SEO template is stored server-side inside:

```bash
app/api/generate/route.js
```

This keeps the browser request small and avoids exposing your API key.

## Example Input

```text
Restaurant Name: Mango Coco
Address: Bankstown Central, The Appian Way, Bankstown NSW 2200
```

## Deployment

You can deploy this app to Vercel, Render, AWS, Azure or any Node.js hosting provider.

For Vercel:

1. Push this project to GitHub
2. Import the repository into Vercel
3. Add environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
4. Deploy

## Notes

The generated content should be reviewed before publishing, especially halal certification, pork, alcohol and delivery platform availability.

## License

MIT
