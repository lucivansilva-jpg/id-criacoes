import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check } from 'lucide-react';
import { ThemeMode, THEMES, ThemeConfig } from '../theme';

export function ThemeSelectorDropdown({
  currentTheme,
  onSelectTheme,
  activeTheme
}: {
  currentTheme: ThemeMode;
  onSelectTheme: (t: ThemeMode) => void;
  activeTheme: ThemeConfig;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryBorder} ${activeTheme.btnSecondaryText} shadow-sm`}
        title="Alterar Cores e Tema da Página"
      >
        <span
          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs border border-white/20"
          style={{ backgroundColor: activeTheme.accentHex }}
        />
        <span className="hidden xl:inline">{activeTheme.shortName}</span>
        <Palette size={13} className={activeTheme.accentText} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-64 p-2 ${activeTheme.cardBg} backdrop-blur-xl border ${activeTheme.cardBorder} rounded-2xl shadow-2xl z-50 overflow-hidden text-xs`}
          >
            <div className={`px-3 py-2 border-b ${activeTheme.cardBorder} mb-1 flex items-center justify-between`}>
              <span className={`font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                <Palette size={13} className={activeTheme.accentText} />
                Paleta & Modo de Cores
              </span>
              <span className={`text-[10px] ${activeTheme.textMuted} font-mono`}>5 Temas</span>
            </div>

            <div className="space-y-1">
              {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
                const t = THEMES[mode];
                const isSelected = currentTheme === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      onSelectTheme(mode);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left cursor-pointer ${
                      isSelected
                        ? `${activeTheme.accentPill} font-bold border ${activeTheme.accentBorder} shadow-xs`
                        : `hover:${activeTheme.sectionAltBg} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary}`
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: t.previewColor }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: t.accentHex }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{t.name}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check size={14} className={`${activeTheme.accentText} shrink-0`} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FloatingThemeWidget({
  currentTheme,
  onSelectTheme,
  activeTheme
}: {
  currentTheme: ThemeMode;
  onSelectTheme: (t: ThemeMode) => void;
  activeTheme: ThemeConfig;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex items-center gap-2 px-3.5 py-3 rounded-full ${activeTheme.cardBg} ${activeTheme.textPrimary} border ${activeTheme.cardBorder} shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer`}
          title="Opções de Cores e Tema"
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs animate-pulse"
            style={{ backgroundColor: activeTheme.accentHex }}
          />
          <Palette size={16} className={activeTheme.accentText} />
          <span className={`text-xs font-bold hidden sm:inline ${activeTheme.textSecondary}`}>
            {activeTheme.shortName}
          </span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.9 }}
              className={`flex items-center gap-1.5 p-1.5 ${activeTheme.cardBg} backdrop-blur-xl border ${activeTheme.cardBorder} rounded-full shadow-2xl`}
            >
              {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
                const t = THEMES[mode];
                const isSelected = currentTheme === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      onSelectTheme(mode);
                      setIsExpanded(false);
                    }}
                    title={t.name}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-current scale-110 shadow-md'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{ backgroundColor: t.previewColor, color: t.accentHex }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: t.accentHex }}
                    />
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
