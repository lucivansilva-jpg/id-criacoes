import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MessageCircle, Menu, X, Palette, Building2 } from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data';
import { ThemeMode, THEMES, ThemeConfig } from '../theme';
import { AdminUser } from '../admin/adminTypes';
import { ThemeSelectorDropdown } from './ThemeSelector';

export function Navbar({
  adminUser,
  theme,
  activeTheme,
  onSelectTheme,
  onOpenInstitutionalModal,
  scrollToSection,
  onNavigate,
  currentView = 'home'
}: {
  adminUser?: AdminUser | null;
  theme: ThemeMode;
  activeTheme: ThemeConfig;
  onSelectTheme: (t: ThemeMode) => void;
  onOpenAdminModal?: () => void;
  onOpenDashboard?: () => void;
  onOpenInstitutionalModal: () => void;
  scrollToSection: (id: string) => void;
  onNavigate?: (view: 'home' | 'servicos' | 'modelos') => void;
  currentView?: 'home' | 'servicos' | 'modelos';
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync mobile menu open status to document.body for dynamic z-index coordination
  useEffect(() => {
    if (isMenuOpen) {
      document.body.setAttribute('data-mobile-menu-open', 'true');
    } else {
      document.body.removeAttribute('data-mobile-menu-open');
    }
    return () => {
      document.body.removeAttribute('data-mobile-menu-open');
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    if (currentView !== 'home' && (id === 'vitrine' || id === 'hero' || id === 'briefing' || id === 'processo' || id === 'beneficios' || id === 'faq')) {
      if (onNavigate) {
        onNavigate('home');
        setTimeout(() => scrollToSection(id), 100);
      } else {
        window.location.href = `/#${id}`;
      }
      return;
    }
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const handleGoToServices = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('servicos');
    } else {
      window.location.href = '/servicos.html';
    }
  };

  const handleGoToModels = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('modelos');
    } else {
      window.location.href = '/modelos.html';
    }
  };

  const handleGoHome = () => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.href = '/';
    }
  };

  // Função para lidar com o clique nos links do menu mobile
  function handleMobileNavClick(targetId: string) {
    setIsMenuOpen(false);
    setTimeout(() => {
      const cleanId = targetId.replace(/^#/, '');
      const element = document.getElementById(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        scrollToSection(cleanId);
      }
    }, 100);
  }

  return (
    <nav className={`fixed ${adminUser ? 'top-10' : 'top-0'} left-0 right-0 z-40 ${activeTheme.navBg} border-b ${activeTheme.navBorder} transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={handleGoHome}>
            <div className={`w-10 h-10 ${activeTheme.accentBg} rounded-xl flex items-center justify-center ${activeTheme.accentShadow} group-hover:scale-105 transition-transform`}>
              <Globe className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} size={24} />
            </div>
            <span className={`text-xl font-black tracking-tight ${activeTheme.textPrimary}`}>
              ID Criações
            </span>
          </div>

          {/* Desktop Nav: Quem Somos, Modelos, Serviços & Planos, Iniciar Projeto */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Início (when not on home) */}
            {currentView !== 'home' && (
              <button
                type="button"
                onClick={handleGoHome}
                className={`text-xs xl:text-sm font-semibold ${activeTheme.navText} hover:${activeTheme.accentText} transition-colors whitespace-nowrap cursor-pointer`}
              >
                Início
              </button>
            )}

            {/* Quem Somos */}
            <button
              type="button"
              onClick={onOpenInstitutionalModal}
              className={`flex items-center gap-1.5 text-xs xl:text-sm font-medium ${activeTheme.navText} transition-colors whitespace-nowrap cursor-pointer`}
            >
              <Building2 size={15} className={activeTheme.accentText} />
              <span>Quem Somos</span>
            </button>

            {/* Modelos */}
            <button 
              type="button"
              onClick={handleGoToModels} 
              className={`text-xs xl:text-sm font-medium ${currentView === 'modelos' ? activeTheme.accentText + ' font-bold' : activeTheme.navText} transition-colors whitespace-nowrap cursor-pointer`}
            >
              Modelos
            </button>

            {/* Serviços & Planos */}
            <button 
              type="button"
              onClick={handleGoToServices} 
              className={`text-xs xl:text-sm font-bold ${currentView === 'servicos' ? activeTheme.accentText + ' underline underline-offset-4' : activeTheme.accentText} hover:opacity-80 transition-opacity whitespace-nowrap cursor-pointer`}
            >
              Serviços & Planos
            </button>

            {/* Iniciar Projeto */}
            <button 
              type="button"
              onClick={() => handleNavClick('briefing')} 
              className={`text-xs xl:text-sm font-medium ${activeTheme.navText} transition-colors whitespace-nowrap cursor-pointer`}
            >
              Iniciar Projeto
            </button>

            {/* Theme Dropdown */}
            <ThemeSelectorDropdown 
              currentTheme={theme} 
              onSelectTheme={onSelectTheme}
              activeTheme={activeTheme}
            />

            <a 
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} text-xs xl:text-sm font-black rounded-full transition-all active:scale-95 ${activeTheme.accentShadow} whitespace-nowrap cursor-pointer`}
            >
              <MessageCircle size={17} className="stroke-[2.5]" />
              <span>Orçamento Grátis</span>
            </a>
          </div>

          {/* Mobile & Tablet Menu Controls */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSelectorDropdown 
              currentTheme={theme} 
              onSelectTheme={onSelectTheme}
              activeTheme={activeTheme}
            />

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryBorder} ${activeTheme.textPrimary} border transition-colors cursor-pointer`}
              aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            data-mobile-nav-open="true"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden ${activeTheme.cardBg} backdrop-blur-xl border-b ${activeTheme.cardBorder} overflow-hidden`}
          >
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Theme Switcher Bar */}
              <div className={`p-3 ${activeTheme.cardBgSubtle} rounded-2xl border ${activeTheme.cardBorder} mb-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <Palette size={14} className={activeTheme.accentText} />
                    Escolher Paleta de Cores:
                  </span>
                  <span className={`text-[10px] ${activeTheme.accentText} font-bold uppercase tracking-wider`}>
                    {activeTheme.shortName}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
                    const t = THEMES[mode];
                    const isSelected = theme === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => onSelectTheme(mode)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[10px] font-medium transition-all ${
                          isSelected
                            ? `${activeTheme.accentPill} font-bold border-current shadow-xs`
                            : `${activeTheme.cardBg} border-transparent ${activeTheme.textMuted} hover:${activeTheme.textPrimary}`
                        }`}
                        title={t.name}
                      >
                        <div className={`w-4 h-4 rounded-full ${t.accentBg}`} />
                        <span className="truncate w-full text-center">{t.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Nav Links (Exclusive: Quem Somos, Modelos, Planos & Preços, Iniciar Projeto) */}
              <div className="flex flex-col space-y-2">
                <button 
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenInstitutionalModal();
                  }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium ${activeTheme.textPrimary} hover:${activeTheme.cardBgSubtle} transition-colors flex items-center gap-2 cursor-pointer`}
                >
                  <Building2 size={16} className={activeTheme.accentText} />
                  <span>Quem Somos</span>
                </button>
                {currentView !== 'home' && (
                  <button 
                    type="button" 
                    onClick={handleGoHome} 
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTheme.textPrimary} hover:${activeTheme.cardBgSubtle} transition-colors cursor-pointer`}
                  >
                    Início
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={handleGoToModels} 
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium ${activeTheme.textPrimary} hover:${activeTheme.cardBgSubtle} transition-colors cursor-pointer`}
                >
                  Modelos
                </button>
                <button 
                  type="button" 
                  onClick={handleGoToServices} 
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-bold ${activeTheme.accentText} hover:${activeTheme.cardBgSubtle} transition-colors cursor-pointer`}
                >
                  Serviços & Planos
                </button>
                <button 
                  type="button" 
                  onClick={() => handleMobileNavClick('briefing')} 
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium ${activeTheme.textPrimary} hover:${activeTheme.cardBgSubtle} transition-colors cursor-pointer`}
                >
                  Iniciar Projeto
                </button>
              </div>

              <div className="pt-3 border-t border-zinc-200/20 dark:border-zinc-800/50 flex flex-col gap-2.5">
                <a 
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg`}
                >
                  <MessageCircle size={18} />
                  <span>Orçamento via WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
