import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Shield, 
  CreditCard, 
  Globe,
  Users,
  Zap
} from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const FAQSection = () => {
  const faqs = [
  {
    category: "Scholarship Process",
    icon: Users,
    questions: [
      {
        question: "How does RupeeRakshak work?",
        answer:
          "Students submit scholarship or aid requests with their details and wallet address. Donors or NGOs review these requests and send funds directly to student wallets. Every transaction is recorded on the blockchain for full transparency."
      },
      {
        question: "Who can apply for financial aid?",
        answer:
          "Any student in need of financial assistance can apply by submitting their basic details, reason for support, and wallet address."
      },
      {
        question: "Who can send scholarship funds?",
        answer:
          "Verified donors, NGOs, institutions, or administrators can review student requests and send funds directly through the platform."
      }
    ]
  },
  {
    category: "Transparency & Trust",
    icon: Globe,
    questions: [
      {
        question: "How do donors know the money reached the student?",
        answer:
          "Once a donation is made, the transaction is permanently recorded on the blockchain. Anyone can verify the transaction and confirm that the funds reached the student."
      },
      {
        question: "Can transactions be changed or hidden?",
        answer:
          "No. Blockchain records are immutable. Transactions cannot be edited, deleted, or hidden by any individual or organization."
      },
      {
        question: "Is proof visible to everyone?",
        answer:
          "Yes. The platform shows transaction ID, amount, timestamp, and blockchain proof so both donors and students can verify the transfer."
      }
    ]
  },
  {
    category: "Security & Safety",
    icon: Shield,
    questions: [
      {
        question: "Is RupeeRakshak secure?",
        answer:
          "Yes. Funds are protected by blockchain security and cryptographic wallets. Only the wallet owner controls access to the funds."
      },
      {
        question: "What if a student loses access to their wallet?",
        answer:
          "Students can recover their wallet using the recovery phrase generated during wallet setup. RupeeRakshak does not store private keys."
      },
      {
        question: "Can RupeeRakshak control or access user funds?",
        answer:
          "No. RupeeRakshak never holds or controls funds. Transfers happen directly between donor and student wallets."
      }
    ]
  },
  {
    category: "Platform Usage",
    icon: HelpCircle,
    questions: [
      {
        question: "Is RupeeRakshak free to use?",
        answer:
          "Yes. Students can apply for scholarships for free. Donors only pay standard blockchain transaction fees."
      },
      {
        question: "Can governments or NGOs use this platform?",
        answer:
          "Yes. RupeeRakshak is designed to support large-scale scholarship and aid distribution by governments and non-profit organizations."
      },
      {
        question: "Do users need blockchain knowledge?",
        answer:
          "No. The platform is built to be simple and user-friendly. Users do not need any prior blockchain knowledge."
      }
    ]
  }

  ];

  const [isVisible, setIsVisible] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default
  const [minimized, setMinimized] = useState<{ [key: number]: boolean }>(() => {
    // All minimized by default
    const state: { [key: number]: boolean } = {};
    for (let i = 0; i < faqs.length; i++) {
      state[i] = true;
    }
    return state;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('faq-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleMinimize = (categoryIndex: number) => {
    setMinimized(prev => ({ ...prev, [categoryIndex]: !prev[categoryIndex] }));
  };

  return (
    <section 
      id="faq-section"
      className="relative w-full py-20 md:py-32 px-6 md:px-12 bg-background overflow-hidden"
    >
      {/* 3D Animated Background */}
      <AnimatedBackground projectId="cm294jqwv1hkdml0hncxmdyvp" overlay="light" className="inset-x-6 md:inset-x-12 inset-y-8 md:inset-y-12" />
      
      {/* Subtle overlay for the container effect */}
      <div className="absolute inset-x-6 md:inset-x-12 inset-y-8 md:inset-y-12 bg-muted/5 rounded-3xl"></div>
      
      {/* Background Effects - Keep some for layering */}
      <div className="absolute inset-0 cosmic-grid opacity-3"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[10px] font-medium rounded-full bg-background/80 backdrop-blur text-white border border-border">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              Support Center
              <HelpCircle className="h-2.5 w-2.5 text-primary" />
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground mb-6">
            <span className="text-cyan-200">Everything About</span>
            <span className="text-white block">Transparent Scholarship System</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Learn how RupeeRakshak ensures every rupee reaches the right 
            student using blockchain-based transparency and trust.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            const isMinimized = minimized[categoryIndex];
            return (
              <Card
                key={categoryIndex}
                className={`cosmic-glow relative bg-background/80 backdrop-blur-sm border-border transition-all duration-700 delay-${(categoryIndex + 1) * 200} transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Category Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.category}
                    </h3>
                  </div>
                  {/* Minimize button: mobile only */}
                  <button
                    className="block md:hidden ml-2 p-1 rounded hover:bg-muted/20 transition-colors"
                    onClick={() => toggleMinimize(categoryIndex)}
                    aria-label={isMinimized ? 'Expand FAQ' : 'Minimize FAQ'}
                  >
                    {isMinimized ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Questions: show if not minimized on mobile, always show on md+ */}
                <div className={`${isMinimized ? 'hidden' : ''} md:block`}> 
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 10 + questionIndex;
                    const isOpen = openItems.includes(globalIndex);
                    return (
                      <div key={questionIndex}>
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full p-6 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between group"
                        >
                          <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                            {faq.question}
                          </span>
                          <div className="ml-4 flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Contact Support CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="cosmic-glow relative p-8 bg-primary/5 backdrop-blur-sm border-primary/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground">
                Our team is here to help students, donors, and organizations understand and use
                RupeeRakshak for transparent and trustworthy scholarship distribution.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=itsamitshukla01@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
