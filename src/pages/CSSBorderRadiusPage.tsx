import { Layout } from "@/components/Layout";
import CSSBorderRadiusGenerator from "@/components/CSSBorderRadiusGenerator";

const CSSBorderRadiusPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSBorderRadiusGenerator />
      </div>
    </Layout>
  );
};

export default CSSBorderRadiusPage;