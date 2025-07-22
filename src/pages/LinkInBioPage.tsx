import { Layout } from "@/components/Layout";
import { LinkInBioGenerator } from "@/components/LinkInBioGenerator";

const LinkInBioPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <LinkInBioGenerator />

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Free Link-in-Bio Generator</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">What is a Link-in-Bio Page?</h3>
              <p className="text-muted-foreground mb-4">
                A Link-in-Bio page is a simple landing page that consolidates multiple links in one place. 
                Perfect for social media profiles where you can only include one link, like Instagram, 
                TikTok, or Twitter.
              </p>
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Beautiful, responsive design templates</li>
                <li>• Multiple customizable themes</li>
                <li>• Upload custom profile pictures</li>
                <li>• Unlimited links with descriptions</li>
                <li>• Mobile-first responsive design</li>
                <li>• Download as HTML file</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Perfect For</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Social media influencers</li>
                <li>• Content creators</li>
                <li>• Small business owners</li>
                <li>• Artists and musicians</li>
                <li>• Bloggers and writers</li>
                <li>• Freelancers and consultants</li>
              </ul>
              <h3 className="text-lg font-semibold mb-3 mt-6">Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Instagram bio link</li>
                <li>• TikTok profile link</li>
                <li>• Twitter bio link</li>
                <li>• YouTube channel description</li>
                <li>• Email signature links</li>
                <li>• Business card QR codes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LinkInBioPage;