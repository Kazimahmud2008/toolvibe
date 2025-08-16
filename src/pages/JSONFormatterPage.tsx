import { Layout } from "@/components/Layout";
import { JSONFormatter } from "@/components/JSONFormatter";

const JSONFormatterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">JSON Formatter & Validator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Format, validate, and minify JSON data instantly. Perfect for developers working with APIs, debugging JSON responses, and data validation.
          </p>
        </div>
        <JSONFormatter />
        
        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">JSON Formatter Tool Guide</h2>
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-4">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write. Our JSON formatter helps you format, validate, and minify JSON data with ease.
            </p>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Format and beautify messy JSON data</li>
              <li>Validate JSON syntax and structure</li>
              <li>Minify JSON to reduce file size</li>
              <li>Real-time error detection and highlighting</li>
              <li>Copy formatted JSON with one click</li>
              <li>Supports large JSON files</li>
            </ul>
            <h3 className="text-xl font-semibold mb-3">Common Use Cases</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>API response debugging and analysis</li>
              <li>Configuration file formatting</li>
              <li>Data structure validation</li>
              <li>JSON minification for production</li>
              <li>Converting between JSON formats</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JSONFormatterPage;