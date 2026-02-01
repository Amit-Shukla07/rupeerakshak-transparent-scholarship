import React, { useState, useEffect } from 'react';
import { GridPatternCard, GridPatternCardBody } from '@/components/ui/card-with-grid-ellipsis-pattern';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { 
  Shield, 
  Zap, 
  Building2, 
  Users, 
  CreditCard,
  Globe,
  Lock,
  TrendingUp,
  Smartphone,
  Eye
} from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Move features array to the top so it's available to all hooks
  const features = [
  {
    icon: Shield,
    title: "Direct Scholarship Transfer",
    description: "Scholarship funds are sent directly to student wallets without intermediaries, ensuring zero leakage and full accountability.",
    delay: "delay-200"
  },
  {
    icon: Eye,
    title: "Public Transaction Ledger",
    description: "Every scholarship disbursement is recorded on the blockchain and can be publicly verified by anyone.",
    delay: "delay-300"
  },
  {
    icon: Building2,
    title: "Government & NGO Ready",
    description: "Designed for governments and NGOs to distribute education funds transparently at scale.",
    delay: "delay-400"
  },
  {
    icon: Users,
    title: "Student-Centric Design",
    description: "Simple wallet-based access for students to receive, track, and verify scholarship funds.",
    delay: "delay-500"
  },
  {
    icon: Lock,
    title: "No Middlemen, No Delays",
    description: "Eliminates third parties and delays by transferring funds directly from authority to student.",
    delay: "delay-600"
  },
  {
    icon: Globe,
    title: "Blockchain-Based Trust",
    description: "Uses blockchain technology to ensure tamper-proof, transparent, and immutable fund records.",
    delay: "delay-700"
  },
  {
    icon: CreditCard,
    title: "Real-Time Fund Tracking",
    description: "Track scholarship amounts from release to receipt with live blockchain transaction proof.",
    delay: "delay-800"
  },
  {
    icon: Smartphone,
    title: "Accessible Anywhere",
    description: "Students can access their scholarship wallet securely from any device, anytime.",
    delay: "delay-900"
  }
];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };
    carouselApi.on('select', onSelect);
    setSelectedIndex(carouselApi.selectedScrollSnap());
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Auto-scroll effect for mobile carousel
  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      const nextIdx = (carouselApi.selectedScrollSnap() + 1) % features.length;
      carouselApi.scrollTo(nextIdx);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselApi, features.length]);

  return (
    <section 
      id="features-section"
      className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-background overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-medium rounded-full bg-muted text-white">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              Why RupeeRakshak?
              <Zap className="h-2.5 w-2.5 text-cyan-200/90" />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground mb-6">
            <span className="text-cyan-200">Every Rupee</span>
            <span className="text-white block">Right Student</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            RupeeRakshak ensures transparent scholarship distribution using blockchain technology. 
            Every fund transfer is direct, traceable, and publicly verifiable.
          </p>
        </div>
        {/* Features Carousel (Mobile Only) */}
        <div className="block md:hidden relative px-8">
          <Carousel className="w-full" setApi={setCarouselApi}>
            <CarouselContent>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <CarouselItem key={index}>
                    <GridPatternCard
                      className={`cosmic-glow relative hover:shadow-lg transition-all duration-500 group w-full h-56 sm:h-64 ${
                        isVisible ? `opacity-100 translate-y-0 ${feature.delay}` : 'opacity-0 translate-y-10'
                      }`}
                    >
                      <GridPatternCardBody className="space-y-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-6 w-6 text-cyan-200/90" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </GridPatternCardBody>
                    </GridPatternCard>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-5 top-1/2 -translate-y-1/2" />
            <CarouselNext className="-right-5 top-1/2 -translate-y-1/2" />
          </Carousel>
          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {features.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  selectedIndex === idx
                    ? 'bg-primary'
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => carouselApi && carouselApi.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>
        {/* Features Grid (Desktop/Tablet Only) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <GridPatternCard
                key={index}
                className={`cosmic-glow relative hover:shadow-lg transition-all duration-500 group w-full h-56 sm:h-64 ${
                  isVisible ? `opacity-100 translate-y-0 ${feature.delay}` : 'opacity-0 translate-y-10'
                }`}
              >
                <GridPatternCardBody className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-cyan-200/90" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GridPatternCardBody>
              </GridPatternCard>
            );
          })}
        </div>
        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm text-muted-foreground">
            Built to ensure fairness, transparency, and trust in education funding • Get started in minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
