import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  CheckCircle,
  CreditCard,
  TrendingUp,
  Shield,
  Wallet,
  Star,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    const element = document.getElementById('cta-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // 🔹 Content aligned with RupeeRakshak (NO logic change)
  const benefits = [
    { text: "Transparent scholarship funding", icon: CheckCircle },
    { text: "Direct wallet-to-wallet transfers", icon: Wallet },
    { text: "Blockchain-verified proof", icon: Shield },
    { text: "Global donors, local impact", icon: Zap }
  ];

  const stats = [
    { value: "100%", label: "Transparent" },
    { value: "0%", label: "Middlemen" },
    { value: "24/7", label: "Public Proof" }
  ];

  return (
    <section
      id="cta-section"
      className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main CTA Card */}
        <Card
          className={`cosmic-glow relative overflow-hidden border-border backdrop-blur-sm bg-gradient-to-br from-background/80 to-background/60 transition-all duration-700 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="p-8 md:p-12 lg:p-16">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-full bg-muted text-white">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                  Start Transparent Giving
                  <ArrowRight className="h-2.5 w-2.5 text-primary" />
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground mb-6">
                <span className="text-cyan-200">RupeeRakshak</span>
                <span className="text-white block">
                  Trust Built on Blockchain
                </span>
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance mb-8">
                A transparent scholarship platform where students receive help,
                donors see proof, and every transaction is publicly verifiable on
                the blockchain.
              </p>
            </div>

            {/* Benefits */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-300 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border"
                  >
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div
              className={`flex justify-center mb-12 transition-all duration-700 delay-500 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/80 text-lg h-14 px-8 group"
                onClick={() => navigate('/auth')}
              >
                <Wallet className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Transparent Giving
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 pt-8 border-t border-border transition-all duration-700 delay-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-1100 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span>Trusted by donors</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <span>Blockchain verified</span>
            <div className="h-4 w-px bg-border"></div>
            <span>No intermediaries</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;