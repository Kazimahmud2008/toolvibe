import { Layout } from "@/components/Layout";
import { HashGenerator } from "@/components/HashGenerator";

const HashGeneratorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Hash Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate cryptographic hashes from your text using MD5, SHA-1, SHA-256, and SHA-512 algorithms.
          </p>
        </div>
        <HashGenerator />
      </div>
    </Layout>
  );
};

export default HashGeneratorPage;