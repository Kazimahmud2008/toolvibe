import { Layout } from "@/components/Layout";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";

const QRCodePage = () => {
  return (
    <Layout>
      <QRCodeGenerator />
    </Layout>
  );
};

export default QRCodePage;