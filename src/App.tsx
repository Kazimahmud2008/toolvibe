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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
