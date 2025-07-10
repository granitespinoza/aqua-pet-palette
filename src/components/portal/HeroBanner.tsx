const HeroBanner = () => {
  return <section className="hero-banner" style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1920&h=1080&q=80')`
  }}>
      <div className="hero-overlay">
        <div className="hero-content rounded-sm">
          <h1 className="text-orange-500 font-extra-bold">El Mejor lugar para tus mascotas</h1>
          <p>Todo lo que necesitas para tu fiel compañero, en un solo lugar.</p>
        </div>
      </div>
    </section>;
};
export default HeroBanner;