import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-110 group border border-amber-400/20"
          title="Return to top"
        >
          <ChevronUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" />
          
          {/* Elegant glow effect */}
          <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 animate-pulse"></div>
        </button>
      )}
    </>
  );
}
