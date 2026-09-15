import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ExternalLink, MessageCircle, X, Monitor, Tablet, Smartphone, Share2, Check } from 'lucide-react';
import { WebsiteModel } from '../types';
import { ThemeConfig } from '../theme';

export function IframePreviewModal({
  model,
  onClose,
  onOrder,
  activeTheme
}: {
  model: WebsiteModel | null;
  onClose: () => void;
  onOrder: (title: string) => void;
  activeTheme: ThemeConfig;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!model) return;
    setIsLoading(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [model, onClose]);

  const handleShare = async () => {
    if (!model) return;

    const shareData = {
      title: `${model.title} - Modelo ID Criações`,
      text: `Confira este modelo de site (${model.category}) da ID Criações: ${model.title}\n${model.demoUrl}`,
      url: model.demoUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }

    try {
      const textToCopy = `Confira o modelo de site "${model.title}" (${model.category}) da ID Criações:\n${model.demoUrl}`;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = model.demoUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!model) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl overflow-hidden"
      >
        {/* Top bar */}
        <div className={`min-h-16 py-2.5 sm:py-0 px-3 sm:px-6 ${activeTheme.cardBg} border-b ${activeTheme.cardBorder} flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 sm:gap-4 z-20 shrink-0`}>
          {/* Left: Info */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 sm:flex-initial max-w-[calc(100%-140px)] sm:max-w-none">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${activeTheme.accentPill} flex items-center justify-center shrink-0`}>
              <Globe size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${activeTheme.accentPill} whitespace-nowrap`}>
                  {model.category}
                </span>
                <span className={`text-[11px] sm:text-xs ${activeTheme.textMuted} hidden md:inline`}>Modo de Visualização</span>
              </div>
              <h3 className={`text-xs sm:text-base font-bold ${activeTheme.textPrimary} truncate`}>{model.title}</h3>
            </div>
          </div>

          {/* Center: Device Mode Toggles (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-xl border border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                deviceMode === 'desktop'
                  ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow-sm`
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor size={14} />
              <span>Computador</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                deviceMode === 'tablet'
                  ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow-sm`
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tablet size={14} />
              <span>Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                deviceMode === 'mobile'
                  ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow-sm`
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone size={14} />
              <span>Celular</span>
            </button>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto sm:ml-0">
            <a
              href={model.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} rounded-xl border ${activeTheme.btnSecondaryBorder} transition-colors whitespace-nowrap`}
              title="Abrir em nova aba"
            >
              <ExternalLink size={14} />
              <span>Nova Aba</span>
            </a>

            {/* Quick Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                copied
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold'
                  : `${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-zinc-700`
              }`}
              title={copied ? 'Link e detalhes copiados!' : 'Compartilhar modelo'}
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400 shrink-0" />
                  <span className="text-emerald-400 font-bold">Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 size={15} className="shrink-0 text-zinc-400 hover:text-zinc-200" />
                  <span className="hidden sm:inline">Compartilhar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOrder(model.title)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black text-xs sm:text-sm rounded-xl transition-all ${activeTheme.accentShadow} active:scale-95 cursor-pointer whitespace-nowrap`}
            >
              <MessageCircle size={15} className="sm:w-4 sm:h-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Quero este modelo</span>
              <span className="xs:hidden sm:hidden">Pedir Site</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2.5 ${activeTheme.btnSecondaryBg} hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border ${activeTheme.btnSecondaryBorder} hover:border-red-500/40 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0`}
              title="Fechar Prévia"
              aria-label="Fechar Prévia"
            >
              <X size={18} />
              <span className="hidden sm:inline">Fechar</span>
            </button>
          </div>
        </div>

        {/* Mobile device mode selector bar on small screens (< md) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 bg-zinc-950/90 px-3 py-2 border-b border-zinc-800 shrink-0 text-xs backdrop-blur-md">
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`flex-1 max-w-[120px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow`
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <Monitor size={13} />
            <span>PC</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('tablet')}
            className={`flex-1 max-w-[120px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
              deviceMode === 'tablet'
                ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow`
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <Tablet size={13} />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`flex-1 max-w-[120px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg font-semibold transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold shadow`
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            <Smartphone size={13} />
            <span>Celular</span>
          </button>
        </div>

        {/* Main iframe container */}
        <div className={`relative flex-1 w-full h-full ${activeTheme.pageBg} overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4`}>
          {/* Fallback framing notice */}
          <div className="w-full p-3 sm:py-2.5 sm:px-4 bg-amber-500/15 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-3 shrink-0 rounded-xl mb-2 shadow-md">
            <div className="flex items-start sm:items-center gap-2.5 text-left w-full md:w-auto">
              <span className="text-base sm:text-lg shrink-0 mt-0.5 sm:mt-0">💡</span>
              <div className="flex-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 mr-1.5">Dica de Navegação:</span>
                <span className="text-zinc-700 dark:text-zinc-300">Alguns sites bloqueiam cliques em molduras (iframe). Para navegar sem restrições:</span>
              </div>
            </div>
            <a
              href={model.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto justify-center px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold rounded-xl transition-all shadow-lg shrink-0 flex items-center gap-2 text-xs cursor-pointer active:scale-95 text-center whitespace-nowrap"
            >
              <ExternalLink size={14} />
              <span>Abrir Site em Tela Cheia</span>
            </a>
          </div>

          <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
            {isLoading && (
              <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center ${activeTheme.pageBg} gap-3`}>
                <div className={`w-8 h-8 border-3 ${activeTheme.accentBorder} border-t-current rounded-full animate-spin ${activeTheme.accentText}`}></div>
                <p className={`text-xs font-medium ${activeTheme.textMuted}`}>Carregando prévia...</p>
              </div>
            )}

            {/* Device Wrapper */}
            <div
              className={`transition-all duration-300 shadow-2xl flex items-center justify-center bg-zinc-950 overflow-hidden relative mx-auto pointer-events-auto ${
                deviceMode === 'mobile'
                  ? 'w-[340px] sm:w-[375px] h-[580px] sm:h-[700px] max-h-full rounded-[32px] sm:rounded-[40px] border-[8px] sm:border-[10px] border-zinc-800 my-auto'
                  : deviceMode === 'tablet'
                  ? 'w-full max-w-[768px] h-[85%] max-h-full rounded-[20px] sm:rounded-[24px] border-[10px] sm:border-[12px] border-zinc-800 my-auto'
                  : 'w-full h-full rounded-lg border border-zinc-800/60'
              }`}
            >
              {deviceMode === 'mobile' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-b-xl z-20 pointer-events-none flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-zinc-700 rounded-full" />
                </div>
              )}
              <iframe
                src={model.demoUrl}
                title={`Prévia do modelo ${model.title}`}
                className="w-full h-full border-0 bg-white pointer-events-auto"
                onLoad={() => setIsLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

