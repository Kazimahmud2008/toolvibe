import { Layout } from "@/components/Layout";
import TimestampConverter from "@/components/TimestampConverter";

const TimestampConverterPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <TimestampConverter />
      </div>
    </Layout>
  );
};

export default TimestampConverterPage;