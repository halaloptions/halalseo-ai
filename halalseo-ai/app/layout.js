export const metadata = {
  title: 'HalalSEO AI - Restaurant SEO Content Generator',
  description: 'Generate SEO-ready halal restaurant pages, meta descriptions and HTML content in seconds.'
};

import './styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
