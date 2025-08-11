import { Layout } from "@/components/Layout";
import WordCounter from "@/components/WordCounter";

const WordCounterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <WordCounter />
      </div>
    </Layout>
  );
};

export default WordCounterPage;