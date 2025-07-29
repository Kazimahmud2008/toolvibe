import { useRouter } from 'next/router';
import Head from 'next/head';

import QRCodePage from '@/components/QRCodePage';
import JSONFormatterPage from '@/components/JSONFormatterPage';
import ColorPickerPage from '@/components/ColorPickerPage';
import CSSGridPage from '@/components/CSSGridPage';
import FaviconPage from '@/components/FaviconPage';
import HTMLCSSPage from '@/components/HTMLCSSPage';
import ImageCompressorPage from '@/components/ImageCompressorPage';
import LinkInBioPage from '@/components/LinkInBioPage';
import MetaTagsPage from '@/components/MetaTagsPage';
import URLShortenerPage from '@/components/URLShortenerPage';
import NotFound from '@/components/NotFound';

export default function ToolRouter() {
  const router = useRouter();
  const { tool } = router.query;

  if (!tool || typeof tool !== 'string') {
    return null; // or loading spinner
  }

  const renderPage = () => {
    switch (tool) {
      case 'qr-code':
        return <QRCodePage />;
      case 'json-formatter':
        return <JSONFormatterPage />;
      case 'color-picker':
        return <ColorPickerPage />;
      case 'css-grid':
        return <CSSGridPage />;
      case 'favicon':
        return <FaviconPage />;
      case 'html-css':
        return <HTMLCSSPage />;
      case 'image-compressor':
        return <ImageCompressorPage />;
      case 'link-in-bio':
        return <LinkInBioPage />;
      case 'meta-tags':
        return <MetaTagsPage />;
      case 'url-shortener':
        return <URLShortenerPage />;
      default:
        return <NotFound />;
    }
  };

  const titleMap: Record<string, string> = {
    'qr-code': 'QR Code Generator',
    'json-formatter': 'JSON Formatter',
    'color-picker': 'Color Picker',
    'css-grid': 'CSS Grid Generator',
    'favicon': 'Favicon Generator',
    'html-css': 'HTML & CSS Beautifier',
    'image-compressor': 'Image Compressor',
    'link-in-bio': 'Link in Bio Page',
    'meta-tags': 'Meta Tags Preview',
    'url-shortener': 'Shorten URLs Easily',
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://toolvibe-ten.vercel.app/tools/${tool}`}
        />
        <title>
          {titleMap[tool] ? `${titleMap[tool]} | ToolVibe` : 'Tool | ToolVibe'}
        </title>
        <meta
          name="description"
          content={
            titleMap[tool]
              ? `Use ToolVibe's free ${titleMap[tool]} online. Fast, simple, and effective.`
              : 'Tool page on ToolVibe'
          }
        />
      </Head>
      {renderPage()}
    </>
  );
}
