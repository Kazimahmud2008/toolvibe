import { Layout } from "@/components/Layout";
import ColorConverter from "@/components/ColorConverter";

const ColorConverterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ColorConverter />
      </div>
    </Layout>
  );
};

export default ColorConverterPage;