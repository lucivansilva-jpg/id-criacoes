import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  ExternalLink, 
  MessageCircle, 
  Edit, 
  Globe, 
  Layout, 
  Sparkles, 
  Pause, 
  Play, 
  MousePointerClick,
  ArrowRight
} from 'lucide-react';
import { WebsiteModel } from '../types';
import { ThemeConfig } from '../theme';

interface VitrineSectionProps {
  models: WebsiteModel[];
  categories: string[];
  activeTheme: ThemeConfig;
  onOpenPreview: (model: WebsiteModel) => void;
  onOrderModel: (title: string) => void;
  isAdmin?: boolean;
  inlineEditMode?: boolean;
  onOpenManageModels?: () => void;
  isHomeHighlight?: boolean;
  onNavigate?: (view: 'home' | 'servicos' | 'modelos') => void;
}

export function VitrineSection({
  models,
  categories,
  activeTheme,
  onOpenPreview,
  onOrderModel,
  isAdmin = false,
  inlineEditMode = false,
  onOpenManageModels,
  isHomeHighlight = true,
  onNavigate
}: VitrineSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isMarqueeActive = !isHomeHighlight && selectedCategory === 'Todos';

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleGoToFullCatalog = () => {
    if (onNavigate) {
      onNavigate('modelos');
    } else {
      window.location.href = '/modelos.html';
    }
  };

  const filteredModels = useMemo(() => {
    if (isHomeHighlight) {
      return models.slice(0, 4);
    }
    if (selectedCategory === 'Todos') {
      return models;
    }
    return models.filter(m => m.category === selectedCategory);
  }, [models, selectedCategory, isHomeHighlight]);

  // Build seamless duplicate list for infinite continuous marquee ONLY when category is 'Todos'
  const marqueeItems = useMemo(() => {
    if (!isMarqueeActive || !filteredModels || filteredModels.length === 0) return [];
    
    // Ensure base list has enough cards to span beyond ultra-wide screens before cloning
    const baseList: WebsiteModel[] = [...filteredModels];
    while (baseList.length < 6 && filteredModels.length > 0) {
      baseList.push(...filteredModels);
    }
    
    // Exactly two identical halves for a 100% seamless translateX(-50%) loop
    return [...baseList, ...baseList];
  }, [filteredModels, isMarqueeActive]);

  // Calculate proportional smooth duration based on items
  const animationDuration = useMemo(() => {
    const baseCount = Math.floor(marqueeItems.length / 2);
    // ~7.5 seconds per item in the half-set ensures a pleasant browsing speed
    return Math.max(35, baseCount * 7.5);
  }, [marqueeItems.length]);

  // Card click handler: pauses animation if active and opens the project preview
  const handleCardClick = (model: WebsiteModel) => {
    if (isMarqueeActive) {
      setIsPaused(true);
    }
    onOpenPreview(model);
  };

  // Direct external link click (opens URL in new tab without triggering modal)
  const handleDirectLinkClick = (e: React.MouseEvent, demoUrl: string) => {
    e.stopPropagation();
    if (isMarqueeActive) {
      setIsPaused(true);
    }
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp order click
  const handleOrderClick = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    if (isMarqueeActive) {
      setIsPaused(true);
    }
    onOrderModel(title);
  };

  // Sub-component to render an individual website card cleanly
  const renderCard = (model: WebsiteModel, key: string, isCarouselItem: boolean = false) => {
    const hasError = !!imageErrors[model.id];

    return (
      <div
        key={key}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick(model)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick(model);
          }
        }}
        className={`group relative ${
          isCarouselItem 
            ? 'w-[310px] sm:w-[370px] md:w-[410px] shrink-0' 
            : 'w-full'
        } ${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverShadow} rounded-3xl overflow-hidden transition-all duration-300 flex flex-col cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-cyan-500/50 hover:-translate-y-1`}
      >
        {/* Card Image Area with Browser Bar */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900/10 dark:bg-zinc-800/40">
          {/* Browser top mockup bar */}
          <div className={`absolute top-0 left-0 right-0 h-7 ${activeTheme.isLight ? 'bg-slate-200/90' : 'bg-zinc-950/80'} backdrop-blur-md z-10 flex items-center justify-between px-3 border-b ${activeTheme.cardBorder}`}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-amber-500/80" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex-1 px-2">
              <span className={`text-[10px] ${activeTheme.textMuted} truncate font-mono flex items-center gap-1`}>
                <Globe size={10} />
                <span className="truncate">{model.demoUrl.replace(/^https?:\/\//, '')}</span>
              </span>
            </div>

            {/* Direct External Link icon in bar */}
            <button
              type="button"
              onClick={(e) => handleDirectLinkClick(e, model.demoUrl)}
              className={`p-1 rounded text-zinc-400 hover:${activeTheme.accentText} transition-colors cursor-pointer`}
              title="Abrir link direto em nova aba"
            >
              <ExternalLink size={11} />
            </button>
          </div>

          {/* Image or Graphic Fallback */}
          {hasError ? (
            <div className="w-full h-full pt-7 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-zinc-800/10 to-amber-500/10">
              <div className={`w-12 h-12 rounded-2xl ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                <Layout size={24} />
              </div>
              <span className={`text-sm font-bold ${activeTheme.textPrimary} mb-1`}>{model.title}</span>
              <span className={`text-[11px] ${activeTheme.textMuted} flex items-center gap-1`}>
                <Sparkles size={11} className={activeTheme.accentText} />
                <span>Modelo pronto para personalização</span>
              </span>
            </div>
          ) : (
            <img
              src={model.imageUrl}
              alt={model.title}
              className="w-full h-full object-cover pt-7 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => handleImageError(model.id)}
            />
          )}

          {/* Hover Overlay indicating click to open */}
          <div className="absolute inset-0 pt-7 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity duration-200 flex items-center justify-center pointer-events-none">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-extrabold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye size={14} />
              <span>Clique para abrir</span>
            </span>
          </div>

          {/* Badge Category Overlay */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className={`px-2.5 py-1 ${activeTheme.accentPill} backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
              {model.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${activeTheme.textPrimary} group-hover:${activeTheme.accentText} transition-colors mb-2 line-clamp-1`}>
              {model.title}
            </h3>
            <p className={`text-xs sm:text-sm ${activeTheme.textMuted} line-clamp-2 mb-4 leading-relaxed`}>
              {model.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(model);
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all cursor-pointer`}
              title="Ver projeto na visualização interativa"
            >
              <Eye size={14} />
              <span>Ver ao Vivo</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleDirectLinkClick(e, model.demoUrl)}
              className={`p-2.5 rounded-xl border ${activeTheme.btnSecondaryBorder} ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} hover:${activeTheme.accentText} transition-all cursor-pointer`}
              title="Abrir site oficial em nova aba"
            >
              <ExternalLink size={14} />
            </button>

            <button
              type="button"
              onClick={(e) => handleOrderClick(e, model.title)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} transition-all ${activeTheme.accentShadow} active:scale-95 cursor-pointer`}
              title="Pedir este modelo via WhatsApp"
            >
              <MessageCircle size={14} />
              <span>Quero este</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="vitrine" className={`py-24 ${activeTheme.sectionBg} transition-colors overflow-hidden relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider`}>
                {isHomeHighlight ? 'Vitrine em Destaque' : 'Catálogo Completo de Modelos'}
              </span>

              {isAdmin && inlineEditMode && onOpenManageModels && (
                <button
                  type="button"
                  onClick={onOpenManageModels}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} text-xs font-bold rounded-full ${activeTheme.accentShadow} transition-all cursor-pointer`}
                >
                  <Edit size={13} />
                  <span>Gerenciar Vitrine (Admin)</span>
                </button>
              )}
            </div>

            <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight`}>
              Modelos Prontos de Alta Performance
            </h2>
            <p className={`text-sm sm:text-base ${activeTheme.textSecondary} mt-2 max-w-2xl`}>
              {isHomeHighlight
                ? 'Conheça alguns dos nossos modelos em destaque. Todos são 100% personalizáveis com a identidade e fotos do seu negócio.'
                : isMarqueeActive 
                  ? 'Role continuamente pelos nossos modelos prontos. Passe o mouse ou clique em qualquer card para pausar e abrir o projeto ao vivo.'
                  : `Exibindo modelos selecionados na categoria ${selectedCategory}. Clique em qualquer projeto para abrir a prévia ao vivo.`}
            </p>
          </div>

          {/* Right Controls: Marquee Pause/Play Toggle (only visible in full catalog marquee mode) */}
          {!isHomeHighlight && isMarqueeActive && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaused(prev => !prev)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isPaused
                    ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} ${activeTheme.accentShadow}`
                    : `${activeTheme.cardBg} ${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary}`
                }`}
                title={isPaused ? 'Clique para retomar a rolagem contínua' : 'Clique para pausar a rolagem'}
              >
                {isPaused ? (
                  <>
                    <Play size={14} className="fill-current" />
                    <span>Retomar Rolagem</span>
                  </>
                ) : (
                  <>
                    <Pause size={14} />
                    <span>{isHovered ? 'Pausado (Hover)' : 'Pausar Rolagem'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Filter Pills (only shown when not in home highlight mode) */}
        {!isHomeHighlight && (
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-zinc-800/20 dark:border-zinc-800/60">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsPaused(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} ${activeTheme.accentShadow} scale-105`
                        : `${activeTheme.cardBg} ${activeTheme.cardBorder} border ${activeTheme.textMuted} hover:${activeTheme.textPrimary}`
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className={`hidden sm:flex items-center gap-2 text-xs ${activeTheme.textMuted}`}>
              <MousePointerClick size={14} className={activeTheme.accentText} />
              <span>Clique no card para abrir e interagir com o site</span>
            </div>
          </div>
        )}
      </div>

      {/* RENDER CONTENT */}
      {isHomeHighlight ? (
        /* HOME MODE: 4 highlighted flagship models in clean static responsive grid */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {filteredModels.map((model) => 
              renderCard(model, `home-highlight-${model.id}`, false)
            )}
          </div>

          {/* High-conversion CTA to see full catalog */}
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleGoToFullCatalog}
              className={`inline-flex items-center gap-3 px-8 py-4 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all active:scale-95 cursor-pointer hover:shadow-cyan-500/20`}
            >
              <span>Ver Catálogo Completo de Modelos ({models.length} Modelos)</span>
              <ArrowRight size={18} />
            </button>
            <p className={`text-xs ${activeTheme.textMuted} mt-3`}>
              Modelos para Delivery, Energia Solar, Clínicas, Advocacia, Eventos, Negócios Locais e muito mais.
            </p>
          </div>
        </div>
      ) : isMarqueeActive ? (
        /* FULL CATALOG MODE 1: Infinite continuous horizontal marquee */
        <div 
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Gradient Fade Masks on Left and Right Edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 z-20 bg-gradient-to-r from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 z-20 bg-gradient-to-l from-[var(--bg-page)] via-[var(--bg-page)]/80 to-transparent" />

          {marqueeItems.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              Nenhum modelo disponível no momento.
            </div>
          ) : (
            <div
              className={`marquee-track gap-6 px-4 sm:px-8 ${isPaused ? 'marquee-paused' : ''}`}
              style={{
                animationDuration: `${animationDuration}s`,
                animationPlayState: isPaused ? 'paused' : undefined,
              }}
            >
              {marqueeItems.map((model, idx) => 
                renderCard(model, `marquee-${model.id}-${idx}`, true)
              )}
            </div>
          )}
        </div>
      ) : (
        /* FULL CATALOG MODE 2: Normal static responsive grid for specific categories */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {filteredModels.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              Nenhum modelo cadastrado nesta categoria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredModels.map((model) => 
                renderCard(model, `grid-${model.id}`, false)
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
