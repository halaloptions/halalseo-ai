'use client';

import { useState } from 'react';

const example = {
  name: 'Mango Coco',
  address: 'Bankstown Central, The Appian Way, Bankstown NSW 2200'
};

export default function Home() {
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  async function generateContent(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantName, address })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Something went wrong');
      setResult(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function fillExample() {
    setRestaurantName(example.name);
    setAddress(example.address);
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    alert('Copied to clipboard');
  }

  return (
    <main>
      <section className="hero">
        <nav className="nav">
          <div className="brand">HalalSEO AI</div>
          <a href="#demo" className="navButton">Try demo</a>
        </nav>

        <div className="heroGrid">
          <div>
            <p className="eyebrow">AI content tool for restaurant directories</p>
            <h1>Generate SEO-ready halal restaurant pages in seconds.</h1>
            <p className="subtitle">
              Enter a restaurant name and address. Get a polished meta description, location-aware content,
              halal status sections, dining experience copy and clean HTML ready for WordPress.
            </p>
            <div className="ctaRow">
              <a href="#demo" className="primaryButton">Generate content</a>
              <a href="#features" className="secondaryButton">See features</a>
            </div>
            <div className="trustRow">
              <span>SEO friendly</span>
              <span>HTML ready</span>
              <span>Directory scale</span>
            </div>
          </div>

          <div className="previewCard">
            <div className="browserDots"><span></span><span></span><span></span></div>
            <p className="metaPreview"><strong>Meta:</strong> Discover halal dining in Bankstown with fresh desserts, family-friendly service and easy nearby parking.</p>
            <h2>About the Restaurant</h2>
            <p>Mango Coco is a halal-friendly dessert and cafe destination located in Bankstown NSW 2200...</p>
            <h2>Menu & Signature Dishes</h2>
            <p>Popular choices include fruit desserts, refreshing drinks and sweet treats ideal for families...</p>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="sectionHeader">
          <p className="eyebrow">Built for content teams</p>
          <h2>From blank page to publish-ready restaurant content.</h2>
        </div>
        <div className="featureGrid">
          <div className="feature"><h3>Location-aware SEO</h3><p>Mentions suburbs, postcodes, major city areas, nearby landmarks and relevant search phrases naturally.</p></div>
          <div className="feature"><h3>Halal details</h3><p>Includes prompts for certification, Muslim-owned status, alcohol, pork and halal menu clarity.</p></div>
          <div className="feature"><h3>WordPress ready</h3><p>Outputs simple HTML with h2, p, strong and br tags so it can be pasted directly into pages.</p></div>
        </div>
      </section>

      <section id="demo" className="demoSection">
        <div className="demoCard">
          <div>
            <p className="eyebrow">Live generator</p>
            <h2>Try it with one restaurant</h2>
            <p className="muted">Requires an OpenAI API key in your local environment.</p>
          </div>

          <form onSubmit={generateContent} className="form">
            <label>Restaurant name</label>
            <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder="e.g. Mango Coco" required />

            <label>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Bankstown Central, NSW 2200" required />

            <div className="formActions">
              <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate SEO Content'}</button>
              <button type="button" className="ghost" onClick={fillExample}>Use example</button>
            </div>
          </form>

          {error && <div className="error">{error}</div>}
          {result && (
            <div className="resultBox">
              <div className="resultHeader">
                <h3>Generated content</h3>
                <button onClick={copyResult}>Copy</button>
              </div>
              <pre>{result}</pre>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
