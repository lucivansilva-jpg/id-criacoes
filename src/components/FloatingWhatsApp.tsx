import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../data';

export function FloatingWhatsApp({ isNavOpen }: { isNavOpen?: boolean }) {
  const [showBubble, setShowBubble] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic detection to ensure button container always floats above hamburger menu overlays
  useEffect(() => {
    if (typeof isNavOpen === 'boolean') {
      setIsMobileMenuOpen(isNavOpen);
      return;
    }

    const checkMobileMenu = () => {
      if (typeof document === 'undefined') return;
      const isBodyOpen = document.body.getAttribute('data-mobile-menu-open') === 'true';
      const isOverlayPresent = document.querySelector('[data-mobile-nav-open="true"]') !== null;
      const isButtonExpanded = document.querySelector('nav button[aria-expanded="true"]') !== null;
      setIsMobileMenuOpen(isBodyOpen || isOverlayPresent || isButtonExpanded);
    };

    checkMobileMenu();

    const observer = new MutationObserver(() => {
      checkMobileMenu();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-mobile-menu-open'],
      childList: true,
      subtree: true
    });

    window.addEventListener('resize', checkMobileMenu);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobileMenu);
    };
  }, [isNavOpen]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de tirar dúvidas e solicitar um orçamento para meu site.')}`;

  // Dynamic z-index: elevated to z-[70] when mobile hamburger navigation is open, default z-50
  const dynamicZIndex = isMobileMenuOpen ? 'z-[70]' : 'z-50';

  return (
    <div 
      data-floating-whatsapp-container="true"
      className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] max-[380px]:bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] right-3.5 max-[380px]:right-2.5 sm:right-6 ${dynamicZIndex} flex flex-col items-end gap-1.5 sm:gap-2 pointer-events-none transition-[z-index] duration-200`}
    >
      {/* Floating tooltip/notification bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, delay: 1 }}
            className="pointer-events-auto bg-zinc-900/95 dark:bg-zinc-900/95 text-white p-2.5 max-[380px]:p-2 sm:py-2.5 sm:px-3.5 rounded-2xl shadow-2xl border border-zinc-800 backdrop-blur-md max-w-[200px] max-[380px]:max-w-[160px] text-xs flex items-start gap-2 select-none relative group"
          >
            <button
              type="button"
              onClick={() => setShowBubble(false)}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center border border-zinc-700 transition-colors cursor-pointer"
              title="Fechar mensagem"
              aria-label="Fechar mensagem"
            >
              <X size={11} />
            </button>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1 animate-pulse" />
            <div className="flex-1 leading-snug">
              <span className="font-bold text-emerald-400 block text-[10px] sm:text-[11px]">Atendimento Online</span>
              <p className="text-zinc-300 text-[10px] sm:text-[11px] mt-0.5">
                Precisa de um site? Converse no WhatsApp!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <div className="relative pointer-events-auto flex items-center justify-center">
        {/* Soft pulsing animated rings */}
        <span className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-[#25D366]/35 animate-ping duration-1000 opacity-75" />
        <span className="absolute -inset-2 sm:-inset-3 rounded-full bg-[#25D366]/20 animate-pulse duration-700" />

        <motion.a
          id="floating-whatsapp-btn"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          whileHover={{
            scale: 1.08,
            y: -5,
            boxShadow: "0 20px 35px -5px rgba(37, 211, 102, 0.65)"
          }}
          whileTap={{ scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 15
          }}
          className="relative group flex items-center gap-2 sm:gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white p-2.5 max-[380px]:p-2.5 sm:p-4 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-400/40"
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 0.4 }}
            className="shrink-0 flex items-center justify-center"
          >
            <MessageCircle size={24} className="shrink-0 fill-current sm:w-7 sm:h-7" />
          </motion.div>
          <span className="hidden md:inline font-black text-xs uppercase tracking-wider pr-1">
            WhatsApp
          </span>
          <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-300 border-2 border-[#25D366]"></span>
          </span>
        </motion.a>
      </div>
    </div>
  );
}
