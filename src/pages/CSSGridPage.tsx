import { Layout } from "@/components/Layout";
import { CSSGridGenerator } from "@/components/CSSGridGenerator";

const CSSGridPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSGridGenerator />

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">CSS Grid Layout Generator</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">What is CSS Grid?</h3>
              <p className="text-muted-foreground mb-4">
                CSS Grid is a powerful layout system that allows you to create complex, responsive 
                web layouts with ease. It provides precise control over both rows and columns, 
                making it perfect for modern web design.
              </p>
              <h3 className="text-lg font-semibold mb-3">Generator Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Visual grid layout builder</li>
                <li>• Live preview with instant updates</li>
                <li>• Flexible grid template configuration</li>
                <li>• Advanced alignment controls</li>
                <li>• Gap and spacing customization</li>
                <li>• Clean, copy-ready CSS code</li>
                <li>• Download complete HTML examples</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Perfect For</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Web developers and designers</li>
                <li>• Frontend developers learning CSS Grid</li>
                <li>• UI/UX designers</li>
                <li>• Students learning web development</li>
                <li>• Anyone creating responsive layouts</li>
              </ul>
              <h3 className="text-lg font-semibold mb-3 mt-6">Common Use Cases</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Website main layouts</li>
                <li>• Photo galleries and portfolios</li>
                <li>• Dashboard interfaces</li>
                <li>• Card-based layouts</li>
                <li>• Magazine-style designs</li>
                <li>• Responsive component layouts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CSSGridPage;