import { Layout } from '@/components/Layout';
import { URLShortener } from '@/components/URLShortener';

const URLShortenerPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              URL Shortener
            </h1>
            <p className="text-xl text-muted-foreground">
              Create short, memorable links from long URLs and track clicks
            </p>
          </div>
          
          <URLShortener />
        </div>
      </div>
    </Layout>
  );
};

export default URLShortenerPage;