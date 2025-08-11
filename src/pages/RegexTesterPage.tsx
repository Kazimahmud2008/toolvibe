import { Layout } from "@/components/Layout";
import RegexTester from "@/components/RegexTester";

const RegexTesterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <RegexTester />
      </div>
    </Layout>
  );
};

export default RegexTesterPage;