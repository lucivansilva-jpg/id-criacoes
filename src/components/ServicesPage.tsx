import React from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  Share2, 
  Check, 
  MessageCircle, 
  Sparkles, 
  ArrowLeft,
  Flame,
  Zap,
  Globe,
  Mail,
  MapPin,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';
import { PricingSection } from './PricingSection';
import { EditablePricingPlan } from '../admin/adminTypes';

interface ServicesPageProps {
  activeTheme: ThemeConfig;
  plans: EditablePricingPlan[];
  onSelectPlan: (planName: string, setupPrice: string) => void;
  isAdmin?: boolean;
  inlineEditMode?: boolean;
  onEditPlans?: () => void;
  onNavigateHome: () => void;
}

export function ServicesPage({
  activeTheme,
  plans,
  onSelectPlan,
  isAdmin,
  inlineEditMode,
  onEditPlans,
  onNavigateHome
}: ServicesPageProps) {
  const handleContactWhatsApp = (message: string) => {
    const url = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`pt-24 pb-20 ${activeTheme.pageBg} transition-colors min-h-screen`}>
      {/* Breadcrumb and Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} text-xs font-bold ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} transition-all cursor-pointer`}
          >
            <ArrowLeft size={14} />
            <span>Voltar para a Página Inicial</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onNavigateHome}
              className={`font-semibold ${activeTheme.textMuted} hover:${activeTheme.textPrimary} transition-colors cursor-pointer`}
            >
              Início
            </button>
            <span className={activeTheme.textMuted}>/</span>
            <span className={`font-bold ${activeTheme.accentText}`}>Serviços & Planos</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <span className={`px-4 py-1.5 ${activeTheme.accentPill} rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block`}>
          Catálogo Oficial de Serviços & Planos
        </span>

        <h1 className={`text-3xl sm:text-5xl md:text-6xl font-black ${activeTheme.textPrimary} tracking-tight max-w-4xl mx-auto leading-tight`}>
          Soluções Completas para Construir e Escalar Sua Presença Digital
        </h1>

        <p className={`text-sm sm:text-base md:text-lg ${activeTheme.textSecondary} max-w-2xl mx-auto mt-4 leading-relaxed`}>
          Marcas marcantes, artes profissionais para redes sociais e sites de alta conversão. Escolha a solução ideal para fortalecer a imagem da sua empresa.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* =========================================================================
            CARD 1: CRIAÇÃO DE LOGOMARCA & IDENTIDADE VISUAL
           ========================================================================= */}
        <section id="logomarca" className="scroll-mt-28">
          <div className={`relative rounded-3xl ${activeTheme.cardBg} border-2 ${activeTheme.accentBorder} p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden`}>
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${activeTheme.accentPill} flex items-center justify-center shrink-0 shadow-sm`}>
                    <Palette size={24} className={activeTheme.accentText} />
                  </div>
                  <span className={`px-3.5 py-1 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black text-xs uppercase tracking-wider rounded-full shadow-sm`}>
                    BRANDING & DESIGN
                  </span>
                </div>

                <h2 className={`text-2xl sm:text-4xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                  Criação de Logomarca & Identidade Visual
                </h2>

                <p className={`text-sm sm:text-base ${activeTheme.textSecondary} leading-relaxed max-w-2xl`}>
                  Desenvolvimento de marca exclusiva, moderna e marcante. Entregamos arquivos em alta resolução (Vetor/PDF/PNG transparente) com guia de cores e tipografia.
                </p>

                {/* Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    'Logotipo principal e variações',
                    'Arquivos para web e impressão',
                    'Paleta de cores e tipografia oficial',
                    'Ícone para perfil de WhatsApp e redes'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                      <div className={`w-5 h-5 rounded-full ${activeTheme.accentPill} flex items-center justify-center shrink-0`}>
                        <Check size={13} className={activeTheme.accentText} />
                      </div>
                      <span className={`font-semibold ${activeTheme.textPrimary}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="w-full lg:w-80 shrink-0 flex flex-col items-center gap-3 p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-zinc-200/20 dark:border-zinc-800/40">
                <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textMuted} text-center`}>
                  Investimento Sob Medida
                </span>
                <p className={`text-xs ${activeTheme.textSecondary} text-center leading-relaxed`}>
                  Projetos personalizados para autônomos, pequenas empresas e renovação de marcas existentes.
                </p>

                <button
                  type="button"
                  onClick={() => handleContactWhatsApp('Olá! Gostaria de consultar o valor e detalhes para a Criação de Logomarca & Identidade Visual pela ID Criações.')}
                  className={`w-full py-4 px-6 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer hover:shadow-cyan-500/25`}
                >
                  <MessageCircle size={18} />
                  <span>Consultar Valor no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO DE PLANOS DE SOCIAL MEDIA & ARTES PARA REDES SOCIAIS (3 CARDS)
           ========================================================================= */}
        <section id="social-media" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
              SOCIAL MEDIA & GESTÃO DE CONTEÚDO
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-3`}>
              Planos de Social Media & Artes para Redes Sociais
            </h2>
            <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
              Publicações consistentes e profissionais para Feed e Stories que posicionam sua marca e atraem clientes qualificados todos os meses.
            </p>
          </div>

          {/* 3 Cards Lado a Lado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* 1. PLANO ESSENCIAL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col justify-between rounded-3xl p-7 ${activeTheme.cardBg} border ${activeTheme.cardBorder} hover:${activeTheme.accentBorder} transition-all duration-300 shadow-lg`}
            >
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${activeTheme.accentText} block mb-1`}>
                  Presença & Ativação
                </span>
                <h3 className={`text-2xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                  Plano Essencial
                </h3>

                {/* Price */}
                <div className="my-5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-zinc-200/20 dark:border-zinc-800/40">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                      R$ 400
                    </span>
                    <span className={`text-xs font-bold ${activeTheme.textMuted}`}>/ mês</span>
                  </div>
                  <span className={`text-[11px] ${activeTheme.textSecondary} block mt-1`}>
                    Sem taxa de adesão ou fidelidade
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textPrimary} block mb-1`}>
                    O que está incluso:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Criação de artes para serviços, avisos, datas comemorativas e promoções.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Formato otimizado para Feed e Stories.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de contratar o Plano Essencial de Social Media (R$ 400 / mês) da ID Criações.')}
                className={`w-full py-4 px-4 rounded-2xl font-black text-xs sm:text-sm ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98`}
              >
                <MessageCircle size={16} />
                <span>Contratar Plano Essencial</span>
              </button>
            </motion.div>

            {/* 2. PLANO INTERMEDIÁRIO (DESTACADO COMO "MAIS POPULAR") */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`relative flex flex-col justify-between rounded-3xl p-7 ${activeTheme.cardBg} border-2 ${activeTheme.accentBorder} ${activeTheme.accentShadow} transition-all duration-300 shadow-2xl md:-translate-y-3`}
            >
              {/* Badge Mais Popular */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className={`px-4 py-1.5 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5`}>
                  <Sparkles size={14} />
                  Mais Popular ⭐
                </span>
              </div>

              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${activeTheme.accentText} block mb-1 mt-1`}>
                  Consistência & Crescimento
                </span>
                <h3 className={`text-2xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                  Plano Intermediário
                </h3>

                {/* Price */}
                <div className={`my-5 p-4 rounded-2xl ${activeTheme.accentPill} border border-current/20`}>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                      R$ 800
                    </span>
                    <span className={`text-xs font-bold ${activeTheme.textMuted}`}>/ mês</span>
                  </div>
                  <span className={`text-[11px] font-bold ${activeTheme.accentText} block mt-1`}>
                    Melhor custo-benefício para engajamento contínuo
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textPrimary} block mb-1`}>
                    O que está incluso:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textPrimary}>
                      <strong>15 a 20 artes por mês</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Inclui posts estáticos, artes em carrossel e conteúdos educativos.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Padronização visual completa com a identidade da marca.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de escolher o Plano Intermediário de Social Media (R$ 800 / mês) da ID Criações.')}
                className={`w-full py-4 px-4 rounded-2xl font-black text-xs sm:text-sm ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} ${activeTheme.accentShadow} transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xl`}
              >
                <MessageCircle size={16} />
                <span>Escolher Plano Intermediário</span>
              </button>
            </motion.div>

            {/* 3. PLANO AVANÇADO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className={`flex flex-col justify-between rounded-3xl p-7 ${activeTheme.cardBg} border ${activeTheme.cardBorder} hover:${activeTheme.accentBorder} transition-all duration-300 shadow-lg`}
            >
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${activeTheme.accentText} block mb-1`}>
                  Volume Máximo & Autoridade
                </span>
                <h3 className={`text-2xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                  Plano Avançado
                </h3>

                {/* Price */}
                <div className="my-5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-zinc-200/20 dark:border-zinc-800/40">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-3xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                      R$ 1.200
                    </span>
                    <span className={`text-xs font-bold ${activeTheme.textMuted}`}>/ mês</span>
                  </div>
                  <span className={`text-[11px] ${activeTheme.textSecondary} block mt-1`}>
                    Produção ilimitada sob demanda para empresas ativas
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-6">
                  <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textPrimary} block mb-1`}>
                    O que está incluso:
                  </span>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textPrimary}>
                      <strong>Sem limite de artes</strong> (produção contínua conforme a demanda da empresa).
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Mix completo de carrosséis, infográficos educativos, avisos e campanhas.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 size={16} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                    <span className={activeTheme.textSecondary}>
                      Atendimento e prioridade de entrega via WhatsApp.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de contratar o Plano Avançado de Social Media (R$ 1.200 / mês) da ID Criações.')}
                className={`w-full py-4 px-4 rounded-2xl font-black text-xs sm:text-sm ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98`}
              >
                <MessageCircle size={16} />
                <span>Quero Plano Avançado</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO OFICIAL DE PLANOS DE DESENVOLVIMENTO DE SITES & LANDING PAGES
           ========================================================================= */}
        <section id="planos-sites" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
              DESENVOLVIMENTO WEB & HOSPEDAGEM
            </span>
            <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-3`}>
              Planos de Criação de Sites Profissionais
            </h2>
            <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
              Criação rápida com valor único, hospedagem inclusa, sem mensalidade fixa para os planos Essencial e Landing Page.
            </p>
          </div>

          <PricingSection
            plans={plans}
            onSelectPlan={onSelectPlan}
            activeTheme={activeTheme}
            isAdmin={isAdmin}
            inlineEditMode={inlineEditMode}
            onEditPlans={onEditPlans}
          />
        </section>

        {/* =========================================================================
            OUTROS SERVIÇOS DIGITAIS ESTRATÉGICOS
           ========================================================================= */}
        <section id="outros-servicos" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
              SOLUÇÕES ADICIONAIS
            </span>
            <h2 className={`text-2xl sm:text-4xl font-black ${activeTheme.textPrimary} tracking-tight mb-2`}>
              Mais Serviços para Impulsionar Seus Resultados
            </h2>
            <p className={`text-xs sm:text-sm ${activeTheme.textSecondary}`}>
              Soluções complementares pontuais ou contínuas para facilitar a sua operação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Google Meu Negócio */}
            <div className={`p-7 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} flex flex-col justify-between shadow-sm hover:shadow-lg transition-all`}>
              <div>
                <div className={`w-11 h-11 rounded-2xl ${activeTheme.accentPill} flex items-center justify-center mb-4`}>
                  <MapPin size={22} className={activeTheme.accentText} />
                </div>
                <h3 className={`text-lg font-black ${activeTheme.textPrimary} mb-2`}>
                  Otimização de Google Meu Negócio
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed mb-4`}>
                  Estruturação completa do Perfil da sua Empresa para aparecer nas primeiras posições de busca local do Google e Google Maps.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de otimizar o Google Meu Negócio da minha empresa com a ID Criações.')}
                className={`w-full py-3 rounded-xl font-bold text-xs ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <MessageCircle size={14} />
                <span>Consultar Valor</span>
              </button>
            </div>

            {/* Convites Interativos */}
            <div className={`p-7 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} flex flex-col justify-between shadow-sm hover:shadow-lg transition-all`}>
              <div>
                <div className={`w-11 h-11 rounded-2xl ${activeTheme.accentPill} flex items-center justify-center mb-4`}>
                  <Mail size={22} className={activeTheme.accentText} />
                </div>
                <h3 className={`text-lg font-black ${activeTheme.textPrimary} mb-2`}>
                  Convites Interativos para WhatsApp
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed mb-4`}>
                  Convites digitais clicáveis em alta resolução com botões de confirmação de presença (RSVP) e rota direta no Waze / Google Maps.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de saber mais sobre os Convites Interativos para WhatsApp da ID Criações.')}
                className={`w-full py-3 rounded-xl font-bold text-xs ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <MessageCircle size={14} />
                <span>Consultar Valor</span>
              </button>
            </div>

            {/* Hospedagem & E-mails Corporativos */}
            <div className={`p-7 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} flex flex-col justify-between shadow-sm hover:shadow-lg transition-all`}>
              <div>
                <div className={`w-11 h-11 rounded-2xl ${activeTheme.accentPill} flex items-center justify-center mb-4`}>
                  <Globe size={22} className={activeTheme.accentText} />
                </div>
                <h3 className={`text-lg font-black ${activeTheme.textPrimary} mb-2`}>
                  Hospedagem & E-mails Profissionais
                </h3>
                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed mb-4`}>
                  Infraestrutura de nuvem segura com SSL grátis (HTTPS) e contas de e-mail corporativas no seu próprio domínio (contato@suaempresa.com.br).
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleContactWhatsApp('Olá! Gostaria de contratar Hospedagem e E-mails Profissionais para a minha empresa.')}
                className={`w-full py-3 rounded-xl font-bold text-xs ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current transition-all flex items-center justify-center gap-1.5 cursor-pointer`}
              >
                <MessageCircle size={14} />
                <span>Consultar Valor</span>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CALL TO ACTION
           ========================================================================= */}
        <section className="pt-4">
          <div className={`p-8 sm:p-12 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.accentBorder} text-center relative overflow-hidden shadow-2xl`}>
            <div className="relative z-10 space-y-4">
              <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider inline-block`}>
                Atendimento Personalizado
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                Precisa de um Pacote Sob Medida para o Seu Negócio?
              </h3>
              <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} max-w-xl mx-auto`}>
                Combine criação de site, logomarca e gestão mensal de redes sociais em uma condição especial pensada para a sua empresa.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleContactWhatsApp('Olá! Gostaria de solicitar uma proposta combinada sob medida para a minha empresa com a ID Criações.')}
                  className={`inline-flex items-center gap-2.5 px-8 py-4 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-2xl shadow-xl transition-all cursor-pointer active:scale-95`}
                >
                  <MessageCircle size={18} />
                  <span>Falar com um Especialista no WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
