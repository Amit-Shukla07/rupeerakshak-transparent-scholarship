import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GridPatternCard, GridPatternCardBody } from '@/components/ui/card-with-grid-ellipsis-pattern';
import { 
  ArrowRight, 
  Building2, 
  Users, 
  Zap, 
  Shield, 
  Wallet, 
  Target,
  Heart,
  Globe,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const teamValues = [
    {
      icon: Lightbulb,
      title: 'Transparency by Design',
      description: 'Every rupee sent is traceable on the blockchain with public proof.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Funds move directly between donor and student wallets without intermediaries.'
    },
    {
      icon: Heart,
      title: 'Social Impact First',
      description: 'Built to empower students and ensure financial aid reaches the right hands.'
    },
    {
      icon: Globe,
      title: 'Global Giving',
      description: 'Donors from anywhere in the world can support students with full visibility.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-16 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 cosmic-grid opacity-20"></div>

        <div className={`relative z-10 max-w-5xl text-center space-y-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-muted text-white">
              <Rocket className="h-3 w-3 text-primary" />
              About RupeeRakshak
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-foreground leading-none">
            <span className="text-primary">Rebuilding Trust</span>
            <span className="text-3xl md:text-5xl lg:text-6xl block mt-2">
              in Scholarships & Aid
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            RupeeRakshak is a blockchain-powered platform that ensures every scholarship
            and aid payment reaches the student directly — with public proof, zero middlemen,
            and complete transparency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                <Wallet className="h-4 w-4 mr-2" />
                Go to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Financial aid often fails due to lack of transparency, delays, and misuse.
              RupeeRakshak replaces trust in people with trust in technology.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              By using blockchain, we ensure that donors, governments, and NGOs can
              see exactly where funds go — instantly and permanently.
            </p>
            <div className="flex items-center gap-4">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-white font-medium">
                Every rupee reaches the student
              </span>
            </div>
          </div>

          <GridPatternCard className="h-64">
            <GridPatternCardBody className="flex flex-col items-center justify-center text-center">
              <Building2 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Built for Impact
              </h3>
              <p className="text-gray-300">
                Education • Aid • Transparency
              </p>
            </GridPatternCardBody>
          </GridPatternCard>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 md:px-12 bg-black/30">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-300">
            Principles that guide RupeeRakshak
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamValues.map((value, index) => (
            <GridPatternCard key={index}>
              <GridPatternCardBody className="p-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {value.description}
                </p>
              </GridPatternCardBody>
            </GridPatternCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 md:px-12 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Transparent Giving Movement
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Whether you are a student, donor, NGO, or government body —
            RupeeRakshak helps you give and receive aid with trust and proof.
          </p>
        <Button
          size="lg"
          onClick={() => navigate('/auth')}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-base font-medium"
        >
          Start Transparent Giving
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
                
        <Button 
          variant="outline" 
          size="lg"
          className="bg-black border-gray-700 text-white hover:bg-gray-900 rounded-full px-8 text-base font-medium"
          onClick={() => navigate('/transparency')}
        >
          View Public Transparency
        </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;