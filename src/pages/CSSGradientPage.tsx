import { Layout } from "@/components/Layout";
import CSSGradientGenerator from "@/components/CSSGradientGenerator";

const CSSGradientPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSGradientGenerator />
      </div>
    </Layout>
  );
};

export default CSSGradientPage;