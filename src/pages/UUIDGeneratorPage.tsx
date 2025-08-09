import { Layout } from "@/components/Layout";
import { UUIDGenerator } from "@/components/UUIDGenerator";

const UUIDGeneratorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">UUID Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate unique identifiers (UUID v4) for your applications instantly.
          </p>
        </div>
        <UUIDGenerator />
      </div>
    </Layout>
  );
};

export default UUIDGeneratorPage;