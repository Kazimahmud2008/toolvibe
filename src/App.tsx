import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import QRCodePage from "./pages/QRCodePage";
import JSONFormatterPage from "./pages/JSONFormatterPage";
import ColorPickerPage from "./pages/ColorPickerPage";
import HTMLCSSPage from "./pages/HTMLCSSPage";
import ImageCompressorPage from "./pages/ImageCompressorPage";
import URLShortenerPage from "./pages/URLShortenerPage";
import FaviconPage from "./pages/FaviconPage";
import MetaTagsPage from "./pages/MetaTagsPage";
import LinkInBioPage from "./pages/LinkInBioPage";
import CSSGridPage from "./pages/CSSGridPage";
import ToolsPage from "./pages/ToolsPage";
import Base64Page from "./pages/Base64Page";
import PasswordGeneratorPage from "./pages/PasswordGeneratorPage";
import UUIDGeneratorPage from "./pages/UUIDGeneratorPage";
import HashGeneratorPage from "./pages/HashGeneratorPage";
import CSSAnimationPage from "./pages/CSSAnimationPage";
import TextCaseConverterPage from "./pages/TextCaseConverterPage";
import WordCounterPage from "./pages/WordCounterPage";
import LoremIpsumPage from "./pages/LoremIpsumPage";
import RegexTesterPage from "./pages/RegexTesterPage";
import TimestampConverterPage from "./pages/TimestampConverterPage";
import CSSBorderRadiusPage from "./pages/CSSBorderRadiusPage";
import CSSBoxShadowPage from "./pages/CSSBoxShadowPage";
import CSSFormatterPage from "./pages/CSSFormatterPage";
import CSSGradientPage from "./pages/CSSGradientPage";
import ColorConverterPage from "./pages/ColorConverterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/qr-code" element={<QRCodePage />} />
          <Route path="/tools/json-formatter" element={<JSONFormatterPage />} />
          <Route path="/tools/color-picker" element={<ColorPickerPage />} />
          <Route path="/tools/html-css" element={<HTMLCSSPage />} />
          <Route path="/tools/image-compressor" element={<ImageCompressorPage />} />
          <Route path="/tools/url-shortener" element={<URLShortenerPage />} />
          <Route path="/tools/favicon" element={<FaviconPage />} />
          <Route path="/tools/meta-tags" element={<MetaTagsPage />} />
          <Route path="/tools/link-in-bio" element={<LinkInBioPage />} />
          <Route path="/tools/css-grid" element={<CSSGridPage />} />
          <Route path="/tools/base64" element={<Base64Page />} />
          <Route path="/tools/password-generator" element={<PasswordGeneratorPage />} />
          <Route path="/tools/uuid-generator" element={<UUIDGeneratorPage />} />
          <Route path="/tools/hash-generator" element={<HashGeneratorPage />} />
          <Route path="/tools/css-animation" element={<CSSAnimationPage />} />
          <Route path="/tools/text-case-converter" element={<TextCaseConverterPage />} />
          <Route path="/tools/word-counter" element={<WordCounterPage />} />
          <Route path="/tools/lorem-ipsum" element={<LoremIpsumPage />} />
          <Route path="/tools/regex-tester" element={<RegexTesterPage />} />
          <Route path="/tools/timestamp-converter" element={<TimestampConverterPage />} />
          <Route path="/tools/css-border-radius" element={<CSSBorderRadiusPage />} />
          <Route path="/tools/css-box-shadow" element={<CSSBoxShadowPage />} />
          <Route path="/tools/css-formatter" element={<CSSFormatterPage />} />
          <Route path="/tools/css-gradient" element={<CSSGradientPage />} />
          <Route path="/tools/color-converter" element={<ColorConverterPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
