import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Target, Heart, Award, ShieldCheck, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';

export function InstitutionalModal({
  isOpen,
  onClose,
  activeTheme
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto ${activeTheme.cardBg} ${activeTheme.textPrimary} border ${activeTheme.cardBorder} rounded-[36px] shadow-2xl p-6 sm:p-10`}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-6 right-6 p-2.5 rounded-2xl ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryBorder} ${activeTheme.textPrimary} border hover:scale-105 transition-all cursor-pointer`}
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} flex items-center justify-center shadow-lg shrink-0`}>
              <Building2 size={26} />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.accentText}`}>
                Conheça a ID Criações
              </span>
              <h2 className={`text-2xl sm:text-3xl font-black ${activeTheme.textPrimary}`}>
                Quem Somos & Nossa Essência
              </h2>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
            {/* Quem Somos - 15 anos */}
            <div className={`p-6 rounded-3xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} space-y-2`}>
              <div className={`flex items-center gap-2 font-bold text-base ${activeTheme.textPrimary}`}>
                <Clock size={18} className={activeTheme.accentText} />
                <span>Quem Somos</span>
              </div>
              <p className={`text-sm ${activeTheme.textSecondary} leading-relaxed`}>
                Com mais de 15 anos de sólida experiência no universo do design e da comunicação visual, a <strong className={`font-extrabold ${activeTheme.textPrimary}`}>ID Criações</strong> expande sua atuação para a criação de sites de alta performance. Unimos um olhar estético altamente refinado a estratégias modernas de conversão digital.
              </p>
            </div>

            {/* Nossa Missão & Propósito */}
            <div className={`p-6 rounded-3xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} space-y-2`}>
              <div className={`flex items-center gap-2 font-bold text-base ${activeTheme.textPrimary}`}>
                <Target size={18} className={activeTheme.accentText} />
                <span>Nossa Missão & Propósito</span>
              </div>
              <p className={`text-sm ${activeTheme.textSecondary} leading-relaxed`}>
                Descomplicar a presença online de autônomos, comércios e empresas, entregando sites rápidos, limpos e funcionais que geram resultados reais no WhatsApp, sem burocracia ou taxas abusivas.
              </p>
            </div>

            {/* Valores Inegociáveis */}
            <div>
              <h3 className={`text-base font-extrabold ${activeTheme.textPrimary} mb-3 flex items-center gap-2`}>
                <Sparkles size={18} className={activeTheme.accentText} />
                <span>Valores Inegociáveis</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-5 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} space-y-2`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${activeTheme.textPrimary}`}>
                    <ShieldCheck size={16} className={activeTheme.accentText} />
                    <span>Transparência Absoluta</span>
                  </div>
                  <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed`}>
                    Preços claros, sem taxas ocultas, fidelidade ou letras miúdas. O domínio e o projeto pertencem 100% à sua empresa.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} space-y-2`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${activeTheme.textPrimary}`}>
                    <Award size={16} className={activeTheme.accentText} />
                    <span>Qualidade e Rigor Visual</span>
                  </div>
                  <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed`}>
                    A estética apurada de quem domina o design há uma década e meia, aplicada em cada detalhe do seu site.
                  </p>
                </div>

                <div className={`p-5 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} space-y-2`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${activeTheme.textPrimary}`}>
                    <Heart size={16} className={activeTheme.accentText} />
                    <span>Suporte Humanizado</span>
                  </div>
                  <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed`}>
                    Atendimento direto, ágil e sem enrolação para manter sua empresa sempre ativa e atualizada.
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA inside modal */}
            <div className={`p-6 rounded-3xl ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl`}>
              <div>
                <h4 className="font-black text-lg">Pronto para transformar sua presença digital?</h4>
                <p className="text-xs opacity-90 mt-0.5">Fale agora mesmo com nossa equipe e inicie seu projeto hoje.</p>
              </div>
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noreferrer"
                className={`px-6 py-3 rounded-2xl ${activeTheme.isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-zinc-950 hover:bg-zinc-100'} font-black text-xs transition-all hover:scale-105 flex items-center gap-2 shrink-0 shadow-md`}
              >
                <MessageCircle size={15} />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
