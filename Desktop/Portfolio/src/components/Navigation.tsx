
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm border-b border-slate-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Portfolio
          </Link>
          <div className="hidden md:flex space-x-8">
            {isHomePage ? (
              <>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('skills')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Skills
                </button>
                <button 
                  onClick={() => scrollToSection('achievements')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Achievements
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  to="/#skills"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Skills
                </Link>
                <Link 
                  to="/#achievements"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Achievements
                </Link>
                <Link 
                  to="/#contact"
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </>
            )}
            <Link 
              to="/academics"
              className={`hover:text-blue-400 transition-colors duration-200 ${
                location.pathname === '/academics' ? 'text-blue-400' : ''
              }`}
            >
              Academics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
