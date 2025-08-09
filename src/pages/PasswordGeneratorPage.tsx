import { Layout } from "@/components/Layout";
import { PasswordGenerator } from "@/components/PasswordGenerator";

const PasswordGeneratorPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Password Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate secure passwords with customizable length and character options.
          </p>
        </div>
        <PasswordGenerator />
      </div>
    </Layout>
  );
};

export default PasswordGeneratorPage;