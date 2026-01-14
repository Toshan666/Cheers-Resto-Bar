// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Phone, MapPin, Clock, Star, Users, Utensils, Wine, ParkingCircle, ArrowRight, ChevronDown } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { MenuItems, RestaurantFeatures, Locations } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for Design System ---

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12 opacity-30">
    <div className="h-16 w-[1px] bg-accent-gold/50"></div>
  </div>
);

const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply" 
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
  </div>
);

const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image src={src} alt={alt} className="w-full h-full object-cover" width={1200} />
      </motion.div>
    </div>
  );
};

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [features, setFeatures] = useState<RestaurantFeatures[]>([]);
  const [location, setLocation] = useState<Locations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fidelity Protocol: Preservation of Logic ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [menuResult, featuresResult, locationsResult] = await Promise.all([
        BaseCrudService.getAll<MenuItems>('menuitems'),
        BaseCrudService.getAll<RestaurantFeatures>('restaurantfeatures'),
        BaseCrudService.getAll<Locations>('locations')
      ]);
      
      setMenuItems(menuResult.items.filter(item => item.isPopular));
      setFeatures(featuresResult.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      setLocation(locationsResult.items[0] || null);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Functional Handlers ---
  const handleCallNow = () => {
    window.location.href = 'tel:09718999702';
  };

  const handleGetDirections = () => {
    if (location?.getDirectionsUrl) {
      window.open(location.getDirectionsUrl, '_blank');
    }
  };

  const handleWhatsApp = () => {
    if (location?.whatsappNumber) {
      window.open(`https://wa.me/${location.whatsappNumber.replace(/\D/g, '')}`, '_blank');
    }
  };

  // --- Scroll Progress for Global Motion ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph selection:bg-accent-gold/30 selection:text-foreground overflow-x-clip">
      <GrainOverlay />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-gold origin-left z-[100]"
        style={{ scaleX }}
      />

      <Header onCallNow={handleCallNow} onGetDirections={handleGetDirections} />

      {/* --- HERO SECTION: The Grand Entrance --- */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=1" 
            alt="Cheers Resto Bar Ambience" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
              Est. Rohini, New Delhi
            </span>
            <h1 className="font-heading text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mb-6">
              Cheers<br />
              <span className="text-accent-gold italic font-light">Resto Bar</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-paragraph text-lg md:text-xl text-white/90 max-w-xl mx-auto leading-relaxed mb-12 font-light"
          >
            Good Food. Great Vibes. Cheers to Every Meal.
            <br />
            <span className="text-sm text-white/60 mt-2 block">A sanctuary for taste and togetherness.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto"
          >
            <button
              onClick={handleCallNow}
              className="group relative px-8 py-4 bg-accent-gold text-white overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                Reserve Table <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            
            <button
              onClick={handleGetDirections}
              className="group px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-500 rounded-sm backdrop-blur-sm"
            >
              <span className="font-medium tracking-wide">Get Directions</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- ABOUT SECTION: Asymmetrical Layout --- */}
      <section className="relative w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Sticky Image Column */}
            <div className="lg:col-span-5 relative lg:sticky lg:top-32 h-fit">
              <RevealText>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                  <Image 
                    src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=2" 
                    alt="Interior Detail" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-4 text-white">
                      <Star className="w-6 h-6 text-accent-gold fill-accent-gold" />
                      <span className="font-heading text-2xl">4.0 Rating</span>
                    </div>
                    <p className="text-white/70 text-sm mt-2">Based on 420+ verified reviews</p>
                  </div>
                </div>
              </RevealText>
              
              {/* Decorative Element */}
              <div className="absolute -z-10 top-12 -left-12 w-full h-full border border-accent-gold/20 rounded-sm hidden lg:block" />
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center py-12">
              <RevealText>
                <h4 className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Story</h4>
                <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-12 leading-[1.1]">
                  A Women-Owned <br/>
                  <span className="italic text-secondary/60">Sanctuary of Flavor</span>
                </h2>
              </RevealText>

              <RevealText delay={0.2}>
                <p className="font-paragraph text-lg text-secondary leading-relaxed mb-8 border-l-2 border-accent-gold pl-6">
                  Welcome to Cheers Resto Bar, a proud women-owned establishment in the heart of Rohini. 
                  We are more than just a restaurant; we are a curated experience of warmth, hygiene, and culinary excellence.
                </p>
              </RevealText>

              <RevealText delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
                  <div>
                    <Utensils className="w-8 h-8 text-accent-gold mb-4" />
                    <h3 className="font-heading text-2xl mb-2">Culinary Craft</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      Every dish is a masterpiece, prepared with the finest ingredients and hygienic practices that set industry standards.
                    </p>
                  </div>
                  <div>
                    <Users className="w-8 h-8 text-accent-gold mb-4" />
                    <h3 className="font-heading text-2xl mb-2">Family First</h3>
                    <p className="text-secondary text-sm leading-relaxed">
                      A safe, welcoming environment designed for families, where conversations flow as freely as our signature drinks.
                    </p>
                  </div>
                </div>
              </RevealText>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* --- MENU SECTION: The Gallery of Taste --- */}
      <section id="menu" className="relative w-full py-32 bg-white">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <RevealText>
              <h2 className="font-heading text-5xl md:text-7xl text-foreground leading-none">
                Curated <br/>
                <span className="text-accent-gold italic">Selections</span>
              </h2>
            </RevealText>
            <RevealText delay={0.2}>
              <p className="font-paragraph text-secondary max-w-md text-right md:text-left">
                From North Indian classics to Tandoori specialties. 
                Explore our most beloved dishes.
              </p>
            </RevealText>
          </div>

          {/* Menu Grid */}
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {menuItems.map((item, index) => (
                  <RevealText key={item._id} delay={index * 0.1} className="group cursor-default">
                    <div className="relative overflow-hidden mb-6 aspect-[4/3] rounded-sm bg-secondary/5">
                      {item.itemImage ? (
                        <Image
                          src={item.itemImage}
                          alt={item.itemName || 'Dish'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={600}
                        />
                      ) : (
                        <Image
                          src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=3"
                          alt="Placeholder"
                          className="w-full h-full object-cover opacity-50 grayscale"
                          width={600}
                        />
                      )}
                      
                      {/* Price Tag Overlay */}
                      {item.price && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-sm shadow-sm">
                          <span className="font-heading font-bold text-lg">₹{item.price}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-heading text-3xl text-foreground group-hover:text-accent-gold transition-colors duration-300">
                          {item.itemName}
                        </h3>
                      </div>
                      
                      <div className="flex gap-3 mb-2">
                        {item.cuisineType && (
                          <span className="text-[10px] uppercase tracking-wider border border-secondary/20 px-2 py-1 rounded-full text-secondary">
                            {item.cuisineType}
                          </span>
                        )}
                        {item.dietaryClassification && (
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${
                            item.dietaryClassification.toLowerCase().includes('veg') && !item.dietaryClassification.toLowerCase().includes('non') 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                          }`}>
                            {item.dietaryClassification}
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="font-paragraph text-sm text-secondary/80 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </RevealText>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-secondary/20 rounded-lg">
                <p className="text-secondary">Our seasonal menu is currently being updated.</p>
              </div>
            )}
          </div>
          
          <div className="mt-20 text-center">
            <button 
              onClick={handleCallNow}
              className="inline-flex items-center gap-2 text-accent-gold hover:text-foreground transition-colors duration-300 border-b border-accent-gold pb-1 uppercase tracking-widest text-sm"
            >
              Inquire for Specials <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* --- BAR SECTION: The Atmospheric Break --- */}
      <section className="relative w-full py-40 overflow-hidden bg-deep-black text-white">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20">
           <Image 
             src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=4" 
             alt="Bar Texture" 
             className="w-full h-full object-cover grayscale" 
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <RevealText>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-accent-gold"></div>
                  <span className="text-accent-gold uppercase tracking-[0.2em] text-sm">The Bar</span>
                </div>
                <h2 className="font-heading text-5xl md:text-7xl mb-8 leading-tight">
                  Spirits & <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Conversations</span>
                </h2>
              </RevealText>
              
              <RevealText delay={0.2}>
                <p className="font-paragraph text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
                  Unwind in an atmosphere that balances energy with intimacy. 
                  From our signature Long Island Iced Tea to a curated selection of premium beers, 
                  our bar is designed for the refined palate.
                </p>
              </RevealText>

              <RevealText delay={0.3}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm">
                    <Clock className="w-6 h-6 text-accent-gold" />
                    <div>
                      <h4 className="font-heading text-xl">Happy Hours</h4>
                      <p className="text-sm text-white/60">Special pricing on select drinks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-white/10 rounded-sm bg-white/5 backdrop-blur-sm">
                    <Wine className="w-6 h-6 text-accent-gold" />
                    <div>
                      <h4 className="font-heading text-xl">Extensive Collection</h4>
                      <p className="text-sm text-white/60">Domestic & International Spirits</p>
                    </div>
                  </div>
                </div>
              </RevealText>
            </div>

            <div className="relative h-[600px] hidden md:block">
               <ParallaxImage 
                 src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=5" 
                 alt="Cocktail Preparation" 
                 className="w-full h-full rounded-sm shadow-2xl"
               />
               {/* Floating Badge */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className="absolute -bottom-10 -left-10 bg-accent-gold text-deep-black p-8 rounded-sm shadow-xl max-w-[200px]"
               >
                 <p className="font-heading text-2xl leading-tight font-bold">
                   "Best Long Island Iced Tea in Rohini"
                 </p>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION: Horizontal Flow --- */}
      <section className="w-full py-32 bg-background overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <RevealText>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Why Choose Us</h2>
              <div className="w-1 h-12 bg-accent-gold mx-auto"></div>
            </div>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? null : features.length > 0 ? (
              features.filter(f => f.isHighlighted).map((feature, index) => (
                <RevealText key={feature._id} delay={index * 0.15}>
                  <div className="group relative p-10 bg-white border border-secondary/5 hover:border-accent-gold/30 transition-all duration-500 h-full flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-2">
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-accent-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {feature.featureImage ? (
                        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
                          <Image src={feature.featureImage} alt={feature.featureName || ''} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <Star className="w-16 h-16 text-accent-gold relative z-10" />
                      )}
                    </div>
                    <h3 className="font-heading text-2xl text-foreground mb-4 group-hover:text-accent-gold transition-colors">
                      {feature.featureName}
                    </h3>
                    <p className="font-paragraph text-secondary text-sm leading-relaxed">
                      {feature.featureDescription}
                    </p>
                  </div>
                </RevealText>
              ))
            ) : (
              // Fallback Static Features if CMS is empty
              <>
                <RevealText delay={0}>
                  <div className="p-10 bg-white border border-secondary/5 h-full flex flex-col items-center text-center">
                    <Users className="w-16 h-16 text-accent-gold mb-6" />
                    <h3 className="font-heading text-2xl mb-4">Family Friendly</h3>
                    <p className="text-secondary text-sm">Designed for comfort and connection.</p>
                  </div>
                </RevealText>
                <RevealText delay={0.1}>
                  <div className="p-10 bg-white border border-secondary/5 h-full flex flex-col items-center text-center">
                    <ParkingCircle className="w-16 h-16 text-accent-gold mb-6" />
                    <h3 className="font-heading text-2xl mb-4">Free Parking</h3>
                    <p className="text-secondary text-sm">Hassle-free arrival for all guests.</p>
                  </div>
                </RevealText>
                <RevealText delay={0.2}>
                  <div className="p-10 bg-white border border-secondary/5 h-full flex flex-col items-center text-center">
                    <MapPin className="w-16 h-16 text-accent-gold mb-6" />
                    <h3 className="font-heading text-2xl mb-4">Prime Location</h3>
                    <p className="text-secondary text-sm">Central Prashant Vihar, Rohini.</p>
                  </div>
                </RevealText>
              </>
            )}
          </div>
        </div>
      </section>

      {/* --- LOCATION & CONTACT: The Final Anchor --- */}
      <section id="contact" className="w-full bg-white pt-32 pb-0">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 mb-20">
          <div className="grid lg:grid-cols-2 gap-16">
            <RevealText>
              <h2 className="font-heading text-5xl md:text-6xl mb-12">
                Visit Us
              </h2>
              
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-background flex items-center justify-center rounded-full group-hover:bg-accent-gold group-hover:text-white transition-colors duration-300 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl mb-2 text-foreground">Address</h4>
                    <p className="text-secondary leading-relaxed max-w-xs">
                      {location?.fullAddress || 'G16, RG 1 Complex, Opposite Balaji Mandir, Prashant Vihar, Sector 14, Rohini, New Delhi – 110085'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-background flex items-center justify-center rounded-full group-hover:bg-accent-gold group-hover:text-white transition-colors duration-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl mb-2 text-foreground">Contact</h4>
                    <p className="text-secondary leading-relaxed">
                      {location?.phoneNumber || '097189 99702'}
                    </p>
                    <button onClick={handleWhatsApp} className="text-sm text-accent-gold mt-1 hover:underline">
                      Chat on WhatsApp
                    </button>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-12 h-12 bg-background flex items-center justify-center rounded-full group-hover:bg-accent-gold group-hover:text-white transition-colors duration-300 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xl mb-2 text-foreground">Opening Hours</h4>
                    <p className="text-secondary leading-relaxed">
                      Open Daily<br/>
                      Closes at 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <button 
                  onClick={handleCallNow}
                  className="px-8 py-3 bg-foreground text-white hover:bg-accent-gold transition-colors duration-300 rounded-sm"
                >
                  Call Now
                </button>
                <button 
                  onClick={handleGetDirections}
                  className="px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-white transition-colors duration-300 rounded-sm"
                >
                  Get Directions
                </button>
              </div>
            </RevealText>

            <div className="h-[500px] lg:h-auto w-full bg-secondary/10 rounded-sm overflow-hidden relative">
              {location?.googleMapsEmbedUrl ? (
                <iframe
                  src={location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cheers Resto Bar Location"
                  className="hover:filter-none transition-all duration-700"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/5">
                  <p className="text-secondary">Map Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer location={location} onCallNow={handleCallNow} onGetDirections={handleGetDirections} onWhatsApp={handleWhatsApp} />
    </div>
  );
}