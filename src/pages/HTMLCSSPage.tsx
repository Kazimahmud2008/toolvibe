import { Layout } from '@/components/Layout';
import { HTMLCSSGenerator } from '@/components/HTMLCSSGenerator';

const HTMLCSSPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              HTML/CSS Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Generate HTML and CSS code for buttons, cards, and more with live preview
            </p>
          </div>
          
          <HTMLCSSGenerator />
        </div>
      </div>
    </Layout>
  );
};

export default HTMLCSSPage;