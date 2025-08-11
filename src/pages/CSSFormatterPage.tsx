import { Layout } from "@/components/Layout";
import CSSFormatter from "@/components/CSSFormatter";

const CSSFormatterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <CSSFormatter />
      </div>
    </Layout>
  );
};

export default CSSFormatterPage;