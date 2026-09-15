import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Rocket, CheckCircle2, Zap, Clock, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '../theme';

export function HowItWorksSection({ activeTheme }: { activeTheme: ThemeConfig }) {
  const [activeTab, setActiveTab] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Escolha ou Briefing',
      subtitle: 'Definição Estratégica',
      prazo: 'Imediato',
      description: 'Selecione um modelo pronto da nossa vitrine ou utilize nossa Consultora de IA para definir a estrutura perfeita para o seu nicho de atuação.',
      details: [
        'Análise do perfil e público-alvo',
        'Seleção de identidade visual e cores',
        'Definição de chamadas para ação (CTA)'
      ],
      icon: Layers
    },
    {
      step: '02',
      title: 'Personalização Express',
      subtitle: 'Design & Configuração',
      prazo: 'Em até 48h',
      description: 'Nossa equipe adapta as cores, logo, fotos, textos institucionais e integra o botão de WhatsApp diretamente com o seu número.',
      details: [
        'Inserção de logotipo e identidade da marca',
        'Otimização de textos e promessas de venda',
        'Configuração do botão de WhatsApp personalizado'
      ],
      icon: Zap
    },
    {
      step: '03',
      title: 'Aprovação & Lançamento',
      subtitle: 'Publicação na Nuvem',
      prazo: 'No ar em 24h',
      description: 'Você confere o site pronto no seu celular. Após sua aprovação 100% satisfeita, conectamos seu domínio próprio e publicamos na nuvem.',
      details: [
        'Teste completo em dispositivos móveis e desktop',
        'Apontamento de domínio próprio (ex: .com.br)',
        'Instalação de certificado SSL de segurança (HTTPS)'
      ],
      icon: Rocket
    },
    {
      step: '04',
      title: 'Suporte & Manutenção',
      subtitle: 'Acompanhamento Contínuo',
      prazo: 'Contínuo',
      description: 'Hospedagem ultrarrápida na nuvem, certificado SSL grátis e suporte mensal incluso para seu site nunca sair do ar e estar sempre atualizado.',
      details: [
        'Atualização de preços, banners e produtos',
        'Backups automáticos e monitoramento de segurança',
        'Atendimento prioritário humanizado no WhatsApp'
      ],
      icon: CheckCircle2
    }
  ];

  const currentStep = steps[activeTab];
  const IconComponent = currentStep.icon;

  return (
    <section id="processo" className={`py-24 scroll-mt-28 ${activeTheme.sectionBg} relative overflow-hidden transition-colors`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
            Passo a Passo Descomplicado
          </span>
          <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-4`}>
            Como funciona o processo de entrega rápida?
          </h2>
          <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
            Sem reuniões demoradas ou meses de espera. Navegue pelas abas abaixo e conheça nossa metodologia.
          </p>
        </div>

        {/* Horizontal Tabs Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {steps.map((item, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} ${activeTheme.accentShadow} scale-105`
                    : `${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.textMuted} hover:${activeTheme.textPrimary} hover:border-current`
                }`}
              >
                <span className={`w-6 h-6 rounded-lg ${isActive ? (activeTheme.isLight ? 'bg-white/20' : 'bg-black/20') : activeTheme.accentPill} flex items-center justify-center text-[11px] font-mono`}>
                  {item.step}
                </span>
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Horizontal Tab Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverShadow} rounded-[36px] p-8 sm:p-12 relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 ${activeTheme.accentGlow} opacity-15 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl ${activeTheme.accentPill} flex items-center justify-center`}>
                    <IconComponent size={30} className={activeTheme.accentText} />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.accentText} block`}>
                      {currentStep.subtitle}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md ${activeTheme.accentPill} mt-1`}>
                      <Clock size={12} />
                      Prazo: {currentStep.prazo}
                    </span>
                  </div>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black ${activeTheme.textPrimary}`}>
                  Passo {currentStep.step}: {currentStep.title}
                </h3>

                <p className={`text-sm sm:text-base ${activeTheme.textSecondary} leading-relaxed`}>
                  {currentStep.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textPrimary} block`}>
                    O que é realizado nesta etapa:
                  </span>
                  {currentStep.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                      <div className={`w-5 h-5 rounded-full ${activeTheme.accentPill} flex items-center justify-center shrink-0`}>
                        <ArrowRight size={12} className={activeTheme.accentText} />
                      </div>
                      <span className={activeTheme.textSecondary}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side graphic indicator */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-900/5 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-800/50 text-center">
                <span className={`text-6xl sm:text-7xl font-black font-mono ${activeTheme.accentText} mb-2`}>
                  {currentStep.step}
                </span>
                <span className={`text-sm font-bold ${activeTheme.textPrimary}`}>
                  ID Criações • Processo Otimizado
                </span>
                <span className={`text-xs ${activeTheme.textMuted} mt-1`}>
                  Eficiência e agilidade comprovadas em cada entrega.
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
