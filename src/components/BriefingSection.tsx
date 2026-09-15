import React, { useState, Dispatch, SetStateAction } from 'react';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  FileText,
  Zap,
  Palette
} from 'lucide-react';
import { ThemeConfig } from '../theme';
import { MaiaChatModal } from './MaiaChatModal';

export function getNicheConsultingInsight(industry: string, companyName?: string) {
  const ind = (industry || '').toLowerCase();
  const company = companyName ? companyName.trim() : 'sua empresa';

  if (ind.includes('pet') || ind.includes('veterin') || ind.includes('banho') || ind.includes('tosa') || ind.includes('animal') || ind.includes('cao') || ind.includes('cão') || ind.includes('gato')) {
    return {
      nicheTitle: 'Pet Shop & Clínica Veterinária',
      structure: 'Catálogo de Rações e Acessórios + Tabela de Serviços (Banho e Tosa) + Botão de Agendamento Rápido no WhatsApp + Galeria dos Pets Atendidos',
      features: ['Botão direto para Banho e Tosa', 'Apresentação da Equipe Veterinária', 'Localização com Mapa Interativo', 'Avaliações de Clientes Apaixonados'],
      colorRecommendation: 'Tons amigáveis e vivos (Verde Menta, Azul Turquesa, Amarelo Aconchegante)',
      consultingMsg: `Excelente segmento! No mercado Pet, o amor e o cuidado visual geram conexão imediata com os tutores 🐾. Para a **${company}**, recomendo uma página acolhedora que destaque seus serviços e facilite o agendamento de consultas e banhos com apenas 1 toque no WhatsApp.`
    };
  }

  if (ind.includes('artesan') || ind.includes('croch') || ind.includes('feltro') || ind.includes('resina') || ind.includes('manual') || ind.includes('feito a mao') || ind.includes('personalizad') || ind.includes('costura')) {
    return {
      nicheTitle: 'Artesanato & Peças Personalizadas',
      structure: 'Galeria Visual de Peças Exclusivas + Histórias dos Produtos + Botão de Pedido Sob Medida no WhatsApp + Depoimentos de Clientes',
      features: ['Galeria em Alta Definição (Zoom)', 'Explicação do Processo Feito à Mão', 'Tabela de Prazos de Produção', 'Destaque de Envio para Todo o Brasil'],
      colorRecommendation: 'Tons quentes e artesanais (Terracota, Tons Terrosos, Ocre, Dourado e Nude)',
      consultingMsg: `Maravilhoso! O artesanato vende pela exclusividade, riqueza de detalhes e sentimento de peça única ✨. Para a **${company}**, o ideal é uma vitrine fotográfica impecável com botão para encomendas personalizadas sob medida via WhatsApp.`
    };
  }

  if (ind.includes('sindicat') || ind.includes('associac') || ind.includes('associaç') || ind.includes('cooperat') || ind.includes('ong') || ind.includes('entidade')) {
    return {
      nicheTitle: 'Sindicatos & Associações Profissionais',
      structure: 'Portal Institucional + Benefícios do Associado + Convenções Coletivas / Editais para Download + Canal de Filiação e Atendimento Jurídico',
      features: ['Formulário de Filiação Online', 'Mural de Notícias e Circulares', 'Lista de Parcerias e Convênios', 'Canal Direto com a Diretoria'],
      colorRecommendation: 'Tons de autoridade e credibilidade (Azul Institucional, Marinho, Grafite e Branco)',
      consultingMsg: `Muito estratégico! Entidades de classe e associações precisam transmitir máxima solidez, transparência e valor aos associados 🏛️. Para a **${company}**, estruturaremos uma página com canal de filiação e acesso facilitado a serviços jurídicos e benefícios.`
    };
  }

  if (ind.includes('odont') || ind.includes('dentist') || ind.includes('saud') || ind.includes('saúd') || ind.includes('medic') || ind.includes('médic') || ind.includes('clinic') || ind.includes('clínic') || ind.includes('estet') || ind.includes('estét')) {
    return {
      nicheTitle: 'Saúde, Odontologia & Estética',
      structure: 'Apresentação dos Tratamentos + Corpo Clínico + Fotos de Antes e Depois (respeitando normas) + Botão de Agendamento de Avaliação',
      features: ['Agendamento Direto no WhatsApp', 'Depoimentos de Pacientes', 'Infraestrutura da Clínica', 'Perguntas Frequentes sobre Procedimentos'],
      colorRecommendation: 'Tons de higiene e sofisticação (Ciano Médico, Azul Céu, Dourado Luxo ou Verde Esmeralda)',
      consultingMsg: `Excelente nicho! Pacientes buscam confiança, ambiente seguro e excelência técnica 🦷. Para a **${company}**, criaremos uma apresentação de alto padrão focada em agendar avaliações diretamente no WhatsApp da sua recepção.`
    };
  }

  if (ind.includes('advoc') || ind.includes('jurid') || ind.includes('juríd') || ind.includes('direit') || ind.includes('oab')) {
    return {
      nicheTitle: 'Advocacia & Consultoria Jurídica',
      structure: 'Áreas de Atuação Especializadas + Perfil dos Advogados + Artigos / Insights Jurídicos + Botão de Consulta Sigilosa',
      features: ['Canal Direto e Sigiloso de Consulta', 'Casos de Sucesso e Artigos', 'Currículo dos Sócios', 'Conformidade com o Código de Ética da OAB'],
      colorRecommendation: 'Tons de sobriedade e prestígio (Azul Noturno, Dourado Envelhecido, Preto Fosco e Grafite)',
      consultingMsg: `Perfeito! No meio jurídico, a autoridade e a discrição são decisivas para a contratação ⚖️. Para a **${company}**, a estratégia é destacar as especialidades com clareza e oferecer um canal rápido de contato com os advogados.`
    };
  }

  if (ind.includes('energ') || ind.includes('solar') || ind.includes('fotovolt')) {
    return {
      nicheTitle: 'Energia Solar & Sustentabilidade',
      structure: 'Calculadora de Economia + Simulador de Redução de Conta de Luz + Projetos Homologados + Botão de Estudo de Viabilidade Gratuito',
      features: ['Simulação com Valor da Conta de Luz', 'Garantias dos Equipamentos (25 anos)', 'Marcas Parceiras de Inversores e Módulos', 'Homologação Rápida com a Concessionária'],
      colorRecommendation: 'Tons energéticos e sustentáveis (Amarelo Solar, Laranja Vibrante e Verde Limpo)',
      consultingMsg: `Segmento espetacular! O cliente de energia solar quer ver o cálculo de economia imediato na conta de luz ☀️. Para a **${company}**, desenharemos uma página de alta conversão focada em simulações gratuitas de projetos solares.`
    };
  }

  if (ind.includes('arquit') || ind.includes('engenh') || ind.includes('constru') || ind.includes('obras') || ind.includes('reforma')) {
    return {
      nicheTitle: 'Arquitetura, Engenharia & Reformas',
      structure: 'Portfólio de Obras Realizadas com Fotos em Alta Resolução + Etapas do Projeto (Do 3D à Entrega) + Botão de Orçamento de Obra',
      features: ['Galeria de Renders 3D e Obras Reais', 'Metodologia de Gestão de Prazos', 'Diferenciais Técnicos e Normas', 'Formulário de Orçamento por Metragem'],
      colorRecommendation: 'Neutros arquitetônicos (Grafite, Bege Concreto e Ciano ou Dourado)',
      consultingMsg: `Perfeito! Projetos desse segmento demandam um portfólio visual impecável e que mostre a sofisticação da sua entrega 📐. Para a **${company}**, o ideal é uma **vitrine de projetos realizados** com botão para solicitação de estudo e orçamento personalizado.`
    };
  }

  if (ind.includes('doc') || ind.includes('bolo') || ind.includes('confeit') || ind.includes('pizz') || ind.includes('hamburg') || ind.includes('restaur') || ind.includes('comida') || ind.includes('lanch')) {
    return {
      nicheTitle: 'Gastronomia & Delivery',
      structure: 'Cardápio Digital Interativo + Fotos de Dar Água na Boca + Botão de Pedido Direto no WhatsApp + Horários e Entregas',
      features: ['Cardápio Separado por Categorias', 'Botão de Pedir com 1 Clique', 'Informações de Frete e Taxas', 'Destaque para Promoções do Dia'],
      colorRecommendation: 'Tons apetitosos (Vermelho Terracota, Laranja, Dourado ou Preto Sofisticado)',
      consultingMsg: `Delicioso! Na gastronomia, a imagem é o que mais vende e a facilidade de pedir define a conversão 🍕. Para a **${company}**, recomendo um **Cardápio/Catálogo Digital ultra rápido**, onde o cliente escolhe os itens e envia o pedido pronto para o seu WhatsApp sem taxas de apps de entrega!`
    };
  }

  // Universal Dynamic AI Consultant Engine for ANY other custom niche
  return {
    nicheTitle: industry || 'Serviço Personalizado',
    structure: `Landing Page Estratégica para ${industry || 'seu negócio'} com Banner Principal de Alto Impacto + Vitrine de Soluções + Prova Social + Botão Flutuante de WhatsApp`,
    features: [
      `Apresentação Exclusiva das Soluções da ${company}`,
      'Botão Flutuante de Orçamento no WhatsApp',
      'Depoimentos e Avaliações de Clientes',
      'Seção de Diferenciais Competitivos'
    ],
    colorRecommendation: 'Paleta personalizada moderna e alinhada à sua identidade visual',
    consultingMsg: `Excelente! O ramo de **${industry || 'seu negócio'}** tem um potencial enorme no digital quando estruturado com clareza e foco comercial 🚀. Para a **${company}**, podemos criar uma **página sob medida** com chamada forte, apresentação clara dos seus diferenciais e botão direto para o seu WhatsApp.`
  };
}

export function BriefingSection({
  formData,
  setFormData,
  activeTheme
}: {
  formData: {
    companyName: string;
    industry: string;
    preferredModel: string;
    goal: string;
    notes: string;
  };
  setFormData: Dispatch<SetStateAction<{
    companyName: string;
    industry: string;
    preferredModel: string;
    goal: string;
    notes: string;
  }>>;
  activeTheme: ThemeConfig;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ai' | 'form'>('ai');

  const openAiBriefing = () => {
    setModalMode('ai');
    setIsModalOpen(true);
  };

  const openFormBriefing = () => {
    setModalMode('form');
    setIsModalOpen(true);
  };

  return (
    <section id="briefing" className={`py-20 ${activeTheme.sectionBg} scroll-mt-28 relative overflow-hidden transition-colors`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek, High-Converting Card without vertical bloat */}
        <div className={`relative ${activeTheme.cardBg} border ${activeTheme.cardBorder} rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden`}>
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left: Maia Avatar & Value Proposition */}
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} className="text-cyan-400" />
                <span>Consultoria Inteligente com IA</span>
              </div>

              <h2 className={`text-2xl sm:text-4xl font-black ${activeTheme.textPrimary} tracking-tight leading-tight`}>
                Planeje o Site Ideal Para Sua Empresa em Poucos Minutos
              </h2>

              <p className={`text-sm sm:text-base ${activeTheme.textSecondary} max-w-xl leading-relaxed`}>
                Não sabe qual modelo ou estrutura escolher? Converse com a <strong>Maia</strong>, nossa Consultora de Estratégia Web. Em menos de 2 minutos ela analisa seu nicho e recomenda o projeto sob medida para converter visitantes em clientes.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className={`p-3 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} flex items-center gap-2.5`}>
                  <Zap size={18} className={activeTheme.accentText} />
                  <span className={`text-xs font-semibold ${activeTheme.textPrimary}`}>Diagnóstico Instantâneo</span>
                </div>
                <div className={`p-3 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} flex items-center gap-2.5`}>
                  <Palette size={18} className={activeTheme.accentText} />
                  <span className={`text-xs font-semibold ${activeTheme.textPrimary}`}>Cores & Estrutura</span>
                </div>
                <div className={`p-3 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} flex items-center gap-2.5`}>
                  <MessageCircle size={18} className="text-emerald-400" />
                  <span className={`text-xs font-semibold ${activeTheme.textPrimary}`}>Direto no WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right: Conversion Action Box */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col items-center gap-3">
              {/* Maia Avatar Pill */}
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-14 h-14 rounded-2xl ${activeTheme.accentBg} flex items-center justify-center ${activeTheme.accentShadow} shadow-lg relative`}>
                  <Bot size={28} className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className={`text-sm font-black ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <span>Maia</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Online</span>
                  </div>
                  <span className={`text-xs ${activeTheme.textMuted}`}>Consultora de IA</span>
                </div>
              </div>

              {/* Primary High-Conversion Button */}
              <button
                type="button"
                onClick={openAiBriefing}
                className={`w-full py-4 px-6 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer hover:shadow-cyan-500/25`}
              >
                <Sparkles size={18} />
                <span>Falar com a Maia / Iniciar Briefing com IA</span>
              </button>

              {/* Secondary Direct Form Button */}
              <button
                type="button"
                onClick={openFormBriefing}
                className={`w-full py-3 px-4 ${activeTheme.cardBgSubtle} hover:${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} border ${activeTheme.cardBorder} font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer`}
              >
                <FileText size={15} />
                <span>Ou preencha o formulário rápido</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Modal for Maia Chat and Quick Form */}
      <MaiaChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeTheme={activeTheme}
        formData={formData}
        setFormData={setFormData}
        initialMode={modalMode}
      />
    </section>
  );
}
