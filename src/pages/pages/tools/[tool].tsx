// pages/tools/[tool].tsx

import { useRouter } from 'next/router';
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
}

