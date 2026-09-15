import { motion } from 'motion/react';
import { Zap, ArrowRight, Sparkles, Edit } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { SiteConfig } from '../admin/adminTypes';

export function HeroSection({
  siteConfig,
  activeTheme,
  adminUser,
  inlineEditMode,
  onOpenHeroEdit,
  scrollToSection
}: {
  siteConfig: SiteConfig;
  activeTheme: ThemeConfig;
  adminUser: boolean;
  inlineEditMode: boolean;
  onOpenHeroEdit: () => void;
  scrollToSection: (id: string) => void;
}) {
  return (
    <section id="hero" className={`relative pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 overflow-hidden scroll-mt-28 ${activeTheme.sectionBg}`}>
      {/* Abstract Tech Grid & Particle Texture Pattern */}
      <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12] pointer-events-none -z-10 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Background Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[520px] ${activeTheme.heroGlow} blur-[130px] rounded-full pointer-events-none -z-10`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Inline Edit Floating Control for Hero */}
          {adminUser && inlineEditMode && (
            <div className="mb-4">
              <button
                type="button"
                onClick={onOpenHeroEdit}
                className={`inline-flex items-center gap-1.5 px-3 py-1 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} text-xs font-bold rounded-full ${activeTheme.accentShadow} transition-all cursor-pointer`}
              >
                <Edit size={13} />
                <span>Editar Textos da Hero (Admin)</span>
              </button>
            </div>
          )}

          {/* Pill Badge */}
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 ${activeTheme.accentPill} rounded-full text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-xs`}>
            <Zap size={15} className="fill-current text-current" />
            <span>{siteConfig.hero.badgeText}</span>
          </span>

          {/* Main Headline with Dynamic Gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 sm:mb-8 leading-[1.18] sm:leading-[1.12] md:leading-[1.08] lg:leading-[1.05] max-w-5xl mx-auto">
            <span className={`bg-clip-text text-transparent ${activeTheme.isLight ? 'bg-gradient-to-r from-slate-950 via-slate-800 to-slate-700' : 'bg-gradient-to-r from-white via-zinc-100 to-zinc-300'}`}>
              {siteConfig.hero.headlinePrefix}
            </span>{" "}
            <br className="hidden sm:inline" />
            <span className="relative inline-block mt-1 sm:mt-2">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${activeTheme.heroGradient} drop-shadow-[0_0_30px_rgba(0,0,0,0.1)] filter`}>
                {siteConfig.hero.headlineHighlight}
              </span>
              {/* Subtle pulsing neon aura behind text */}
              <span className={`absolute -inset-1 ${activeTheme.heroGlow} blur-2xl rounded-full animate-pulse -z-10 pointer-events-none`} />
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`max-w-2xl sm:max-w-3xl mx-auto text-base sm:text-lg md:text-xl ${activeTheme.textSecondary} mb-8 sm:mb-10 leading-relaxed font-normal`}>
            {siteConfig.hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            {/* Primary Button */}
            <button 
              onClick={() => scrollToSection('vitrine')}
              className={`group relative w-full sm:w-auto px-8 py-4 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 ${activeTheme.accentShadow} cursor-pointer text-sm sm:text-base`}
            >
              <span>Ver Vitrine de Modelos</span>
              <ArrowRight size={20} className="stroke-[2.5] group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary Button */}
            <button 
              onClick={() => scrollToSection('planos')}
              className={`group w-full sm:w-auto px-8 py-4 ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryBorder} border ${activeTheme.accentText} hover:border-current font-extrabold rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5 shadow-sm cursor-pointer text-sm sm:text-base`}
            >
              <Sparkles size={18} className="text-current group-hover:rotate-12 transition-transform duration-300" />
              <span>Ver Planos & Preços</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
