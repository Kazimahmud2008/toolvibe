import { Layout } from "@/components/Layout";
import CSSBoxShadowGenerator from "@/components/CSSBoxShadowGenerator";

const CSSBoxShadowPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSBoxShadowGenerator />
      </div>
    </Layout>
  );
};

export default CSSBoxShadowPage;