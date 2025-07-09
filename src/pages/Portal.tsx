
import Header from '@/components/portal/Header';
import Footer from '@/components/portal/Footer';
import HeroBanner from '@/components/portal/HeroBanner';
import TenantSelector from '@/components/portal/TenantSelector';

const Portal = () => {
  console.log('Portal component rendering');
  
  return (
    <div className="min-h-screen flex flex-col page-enter bg-white">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <TenantSelector />
      </main>
      <Footer />
    </div>
  );
};

export default Portal;
