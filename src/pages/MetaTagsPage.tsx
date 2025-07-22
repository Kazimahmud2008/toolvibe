import { Layout } from "@/components/Layout";
import { MetaTagGenerator } from "@/components/MetaTagGenerator";

const MetaTagsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Meta Tag Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate SEO-optimized meta tags for better search engine visibility and social media sharing.
            Improve your website's performance with properly formatted HTML meta tags.
          </p>
        </div>

        <MetaTagGenerator />

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Free Meta Tag Generator Tool</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">What are Meta Tags?</h3>
              <p className="text-muted-foreground mb-4">
                Meta tags are HTML elements that provide metadata about your web page. They don't appear 
                on the page itself but help search engines and social media platforms understand your content.
              </p>
              <h3 className="text-lg font-semibold mb-3">Why Use This Generator?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Generate complete meta tag sets instantly</li>
                <li>• Include Open Graph and Twitter Card tags</li>
                <li>• Follow SEO best practices automatically</li>
                <li>• Preview character limits in real-time</li>
                <li>• Copy-paste ready HTML code</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Perfect For</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Website owners and bloggers</li>
                <li>• Digital marketers</li>
                <li>• Web developers</li>
                <li>• SEO professionals</li>
                <li>• Social media managers</li>
                <li>• Content creators</li>
              </ul>
              <h3 className="text-lg font-semibold mb-3 mt-6">Key Benefits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Improved search engine rankings</li>
                <li>• Better social media previews</li>
                <li>• Enhanced click-through rates</li>
                <li>• Professional appearance in search results</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MetaTagsPage;