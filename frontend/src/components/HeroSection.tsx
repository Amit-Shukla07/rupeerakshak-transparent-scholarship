import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Users, Zap, Shield, Wallet, X } from 'lucide-react';
import { PinContainer } from '@/components/ui/3d-pin';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Custom hook for viewport detection
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isDesktop;
}

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Video background - no additional initialization needed

  // Show redirect notice for logged-in users after 3 seconds
  useEffect(() => {
    if (user) {
      const redirectTimer = setTimeout(() => {
        setShowRedirectNotice(true);
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [user]);

  // Get user's dashboard route
  const getDashboardRoute = () => {
    return '/dashboard';
  };

  return (
    <section className="relative w-full pt-8 sm:pt-4 md:pt-8 lg:pt-12 pb-8 sm:pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center overflow-hidden bg-background mt-16 sm:mt-14 md:mt-17 lg:mt-21">
      {/* Rounded Container with Black Background - Responsive Aspect Ratio */}
      <div
        className="relative w-full bg-black rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{
          aspectRatio: isMobile ? '2/3' : '16/12',
          maxWidth: '100%',
          height: 'auto',
          minHeight: isMobile ? '800px' : '700px'
        }}
      >
        {/* Background - Video for Desktop, Gradient for Mobile */}
        <div
          className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl"
          style={{
            pointerEvents: 'none'
          }}
        >
          {isMobile ? (
            // Mobile: Deep blue gradient background
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 20%, #334155 40%, #1e40af 60%, #1e3a8a 80%, #0f172a 100%)',
                opacity: 0.95
              }}
            />
          ) : (
            // Desktop: Video background
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                minWidth: '100%',
                minHeight: '100%',
                opacity: 0.8
              }}
            >
              <source src="/BG.mp4" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Subtle background effects for layering */}
        <div className="absolute inset-0 cosmic-grid opacity-5 z-10"></div>

        {/* Container Content */}
        <div className="absolute inset-0 z-20 px-4 sm:px-4 md:px-6 lg:px-12 py-8 sm:py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center">
          {/* Redirect Notice for Logged-in Users */}
          {showRedirectNotice && user && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-background border border-border rounded-lg shadow-lg p-4 max-w-sm mx-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Welcome to RupeeRakshak!</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRedirectNotice(false)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                View your scholarship dashboard and transactions?
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => navigate(getDashboardRoute())}
                  className="flex-1"
                >
                  <Wallet className="h-3 w-3 mr-1" />
                  Open Scholarship Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowRedirectNotice(false)}
                >
                  Stay Here
                </Button>
              </div>
            </div>
          )}

          {/* Hero Content */}
          <div className={`relative z-20 max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl text-center space-y-5 sm:space-y-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Status Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-muted text-white">
                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
                <span className="hidden sm:inline">Transparent Scholarship Distribution on Blockchain</span>
                <span className="sm:hidden">Scholarship on Blockchain</span>
                <Zap className="h-2.5 w-2.5 text-primary" />
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter text-white leading-tight sm:leading-none px-1 sm:px-0">
              <span className="text-cyan-200 block sm:inline">RupeeRakshak</span>
              <span className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block mt-2 sm:mt-2 text-white">
                <span className="block">Every Rupee.</span>
                <span className="block">Right Student.</span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base xs:text-lg sm:text-lg md:text-xl text-white/90 max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto text-balance leading-relaxed px-2 sm:px-2 md:px-0">
              <span className="sm:hidden block">Direct scholarship transfer with full transparency.</span>
              <span className="hidden sm:inline">RupeeRakshak is a blockchain-based platform that ensures scholarship funds reach students directly — without delays or middlemen. Every transaction is publicly verifiable <span className="text-cyan-200">bringing trust+transparency+accountability </span>to education funding.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 items-center w-full max-w-sm sm:max-w-none">
              {user ? (
                // Show dashboard button for logged-in users
                <Button
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm font-medium h-11 px-6 sm:px-7 flex items-center justify-center space-x-1.5"
                  onClick={() => navigate(getDashboardRoute())}
                >
                  <Wallet className="h-4 w-4 mr-1" />
                  <span>Scholarship Dashboard</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-sm font-medium h-11 px-6 sm:px-7 flex items-center justify-center sm:mr-2"
                    onClick={() => navigate('/find-students')}
                  >
                    Needy Student Scholarship Portal <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-black border-gray-700 text-white hover:bg-gray-900 rounded-full text-sm font-medium h-11 px-6 sm:px-7 flex items-center justify-center"
                    onClick={() => window.location.href = '/about'}
                  >
                    How it works
                  </Button>
                </>
              )}
            </div>

            {/* Trust Indicator */}
            <div className="pt-4 sm:pt-6 text-xs sm:text-sm text-white/80 text-center px-4">
              <span className="block sm:inline">Blockchain-secured</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">Public transaction ledger</span>
              <span className="hidden sm:inline"> • </span>
              <span className="block sm:inline">No middleman</span>
            </div>
          </div>

          {/* Feature Cards - Desktop Only */}
          {!isMobile && (
            <div className={`w-full max-w-7xl mt-10 sm:mt-12 md:mt-16 lg:mt-20 z-20 relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-6 md:gap-8 lg:gap-12 justify-center items-center px-4 sm:px-4">
                {isDesktop ? (
                  <>
                    {/* Individual Solutions Card (3D) */}
                    <PinContainer title="Scholarship" href="" containerClassName="cursor-default">
                      <div className="flex flex-col p-6 sm:p-8 tracking-tight text-slate-100/50 w-full max-w-[22rem] sm:w-[24rem] h-auto min-h-[24rem] sm:h-[26rem] bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
                        {/* Header */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-slate-700/40 flex items-center justify-center">
                            <Users className="h-6 w-6 sm:h-7 sm:w-7 text-slate-300" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">For Students</h3>
                            <p className="text-sm text-slate-400">Direct Scholarship Wallet</p>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                          <div className="space-y-2">
                            <div className="text-2xl sm:text-3xl font-bold text-slate-200">100%</div>
                            <div className="text-xs text-slate-400 leading-relaxed">Direct Transfer</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-2xl sm:text-3xl font-bold text-slate-200">Public</div>
                            <div className="text-xs text-slate-400 leading-relaxed">Ledger</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 sm:space-y-4 flex-1">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">Scholarship sent directly to student wallet</span>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">All transactions visible on blockchain</span>
                          </div>
                          <div className="flex items-center gap-3 sm:gap-4">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 flex-shrink-0" />
                            <span className="text-slate-300 text-sm">No middlemen or fund misuse</span>
                          </div>
                        </div>
                        {/* Status Indicator REMOVED */}

                      </div>
                    </PinContainer>

                  </>
                ) : (
                  <>
                    {/* Minimal Individual Card */}
                    <div className="w-full max-w-sm bg-slate-800/70 backdrop-blur-sm border border-slate-600/30 rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">For Students</h3>
                          <p className="text-sm text-slate-300">Direct Scholarship Wallet</p>
                        </div>
                      </div>
                      <div className="text-sm text-slate-200 font-medium leading-relaxed">Receive scholarships directly in your wallet with full transparency</div>
                      {/* Feature List */}
                      <ul className="mt-2 space-y-3 w-full">
                        <li className="flex items-center gap-3 text-sm text-slate-200">
                          <Shield className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          Direct scholarship transfer to students
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-200">
                          <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          Public blockchain transaction proof
                        </li>
                        <li className="flex items-center gap-3 text-sm text-slate-200">
                          <Users className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          No middlemen or fund misuse
                        </li>
                      </ul>

                      {/* View Scholarship Button REMOVED */}
                    </div>

                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
