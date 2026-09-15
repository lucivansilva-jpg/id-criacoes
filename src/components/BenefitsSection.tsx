import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Zap, ShieldCheck, Search, MessageSquare, Headphones, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';

export function BenefitsSection({ activeTheme }: { activeTheme: ThemeConfig }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const benefits = [
    {
      icon: Smartphone,
      title: '100% Responsivo & Mobile First',
      description: 'Mais de 85% dos seus clientes acessam pelo celular. Nossos sites são desenhados com metodologia Mobile-First para garantir uma experiência impecável em smartphones e tablets.'
    },
    {
      icon: Zap,
      title: 'Velocidade Ultra Rápida',
      description: 'Carregamento instantâneo em menos de 1 segundo. Menos tempo de espera significa maior retenção de visitantes, menos rejeição e mais conversões para o seu negócio.'
    },
    {
      icon: ShieldCheck,
      title: 'Hospedagem em Nuvem & SSL Seguro',
      description: 'Infraestrutura global de alta disponibilidade com certificado de segurança SSL grátis (HTTPS). Seus dados e a privacidade dos seus clientes totalmente protegidos.'
    },
    {
      icon: Search,
      title: 'Otimização para o Google (SEO Local)',
      description: 'Código estruturado e metadados otimizados para que sua empresa apareça nas buscas locais do Google quando clientes procurarem pelos seus serviços.'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Integrado com Mensagem Pronta',
      description: 'Botões inteligentes estrategicamente posicionados que abrem o WhatsApp com uma mensagem pré-configurada sobre o serviço ou produto de interesse.'
    },
    {
      icon: Headphones,
      title: 'Suporte Técnico Humanizado',
      description: 'Você nunca fica sozinho. Contamos com um canal de atendimento direto no WhatsApp para tirar dúvidas, realizar alterações e manter seu site sempre atualizado.'
    }
  ];

  return (
    <section id="beneficios" className={`py-24 scroll-mt-28 ${activeTheme.sectionAltBg} transition-colors`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
            Vantagens Exclusivas
          </span>
          <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-4`}>
            Por que escolher a ID Criações?
          </h2>
          <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
            Clique nas opções abaixo para conhecer em detalhes os diferenciais que garantem o sucesso digital da sua empresa.
          </p>
        </div>

        {/* Accordion for Benefits */}
        <div className="space-y-4">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? `${activeTheme.cardBg} ${activeTheme.accentBorder} shadow-lg`
                    : `${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} hover:border-current`
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl ${activeTheme.accentPill} flex items-center justify-center shrink-0`}>
                      <Icon size={22} className={activeTheme.accentText} />
                    </div>
                    <span className={`text-base sm:text-lg font-bold ${isOpen ? activeTheme.accentText : activeTheme.textPrimary} transition-colors`}>
                      {b.title}
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${isOpen ? `${activeTheme.accentPill} rotate-180` : `${activeTheme.btnSecondaryBg} ${activeTheme.textMuted}`}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed border-t ${activeTheme.cardBorder}`}>
                        <p>{b.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Big Highlight Box */}
        <div className={`mt-14 ${activeTheme.cardBg} border ${activeTheme.cardBorder} p-8 sm:p-12 rounded-[40px] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8`}>
          <div className="space-y-3 max-w-2xl text-center sm:text-left">
            <span className={`px-3 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider`}>
              Garantia de Satisfação
            </span>
            <h3 className={`text-2xl sm:text-3xl font-black ${activeTheme.textPrimary}`}>
              Seu site pronto, aprovado e gerando orçamentos
            </h3>
            <p className={`text-sm ${activeTheme.textSecondary}`}>
              Você acompanha tudo do início ao fim e só publicamos após sua aprovação 100% satisfeita.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold justify-center sm:justify-start">
                <Check size={16} className={activeTheme.accentText} />
                <span className={activeTheme.textSecondary}>Sem contratos de fidelidade</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold justify-center sm:justify-start">
                <Check size={16} className={activeTheme.accentText} />
                <span className={activeTheme.textSecondary}>Código moderno e otimizado</span>
              </div>
            </div>
          </div>

          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noreferrer"
            className={`px-8 py-4 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-2xl transition-all ${activeTheme.accentShadow} active:scale-95 flex items-center gap-2 shrink-0 text-sm sm:text-base`}
          >
            <span>Falar com Especialista</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
