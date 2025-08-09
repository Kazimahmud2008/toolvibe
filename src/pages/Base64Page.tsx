import { Layout } from "@/components/Layout";
import { Base64Encoder } from "@/components/Base64Encoder";

const Base64Page = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Base64 Encoder/Decoder</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encode text to Base64 or decode Base64 strings back to text instantly in your browser.
          </p>
        </div>
        <Base64Encoder />
      </div>
    </Layout>
  );
};

export default Base64Page;