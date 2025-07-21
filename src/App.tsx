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
import ToolsPage from "./pages/ToolsPage";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
