import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import Experience from '@/components/Experience';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import Location from '@/components/Location';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedMenu />
      <Experience />
      <Location />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
