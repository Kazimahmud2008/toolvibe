import { Layout } from "@/components/Layout";
import LoremIpsumGenerator from "@/components/LoremIpsumGenerator";

const LoremIpsumPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <LoremIpsumGenerator />
      </div>
    </Layout>
  );
};

export default LoremIpsumPage;