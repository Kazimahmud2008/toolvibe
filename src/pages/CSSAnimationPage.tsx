import Layout from "@/components/Layout";
import CSSAnimationGenerator from "@/components/CSSAnimationGenerator";

const CSSAnimationPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSAnimationGenerator />
      </div>
    </Layout>
  );
};

export default CSSAnimationPage;