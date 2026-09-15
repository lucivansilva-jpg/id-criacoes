import { WEBSITE_MODELS, WHATSAPP_NUMBER } from '../data';
import { WebsiteModel } from '../types';
import { 
  SiteConfig, 
  EditablePricingPlan, 
  EditableHeroContent, 
  AdminUser, 
  LeadSubmission, 
  AUTHORIZED_ADMIN_EMAIL 
} from './adminTypes';

const STORAGE_KEY_CONFIG = 'id_criacoes_site_config';
const STORAGE_KEY_SESSION = 'id_criacoes_admin_session';

export const DEFAULT_PLANS: EditablePricingPlan[] = [
  {
    id: 'site-essencial',
    name: 'Site Essencial / Cartão Digital',
    badge: 'Para Iniciantes',
    popular: false,
    subtitle: 'Presença digital rápida e profissional para autônomos e pequenos prestadores de serviços.',
    targetAudience: 'Ideal para: Autônomos, Profissionais Liberais, MEIs e Prestadores.',
    setupPrice: 'R$ 350',
    setupPeriod: 'valor único',
    maintenancePrice: 'Sem mensalidade fixa',
    maintenancePeriod: 'sem mensalidade fixa',
    maintenanceNote: 'Hospedagem inclusa. Sem mensalidade obrigatória.',
    domainInfo: 'À parte',
    hostingInfo: 'Inclusa',
    features: [
      'Página única responsiva (Mobile First)',
      'Botão de WhatsApp direto com mensagem personalizada',
      'Links integrados para redes sociais e portfólio',
      'Carregamento ultrarrápido otimizado',
      'Hospedagem inclusa',
      'Certificado de Segurança SSL (HTTPS)'
    ],
    ctaText: 'Quero Site Essencial'
  },
  {
    id: 'landing-page',
    name: 'Landing Page Profissional',
    badge: 'Alta Conversão',
    popular: false,
    subtitle: 'Estrutura one-page focada em transformar visitantes de anúncios em contatos imediatos no WhatsApp.',
    targetAudience: 'Ideal para: Tráfego Pago, Prestadores, Clínicas e Consultorias.',
    setupPrice: 'R$ 800',
    setupPeriod: 'valor único',
    maintenancePrice: 'Sem mensalidade fixa',
    maintenancePeriod: 'sem mensalidade fixa',
    maintenanceNote: 'Hospedagem inclusa. Sem mensalidade obrigatória.',
    domainInfo: 'À parte',
    hostingInfo: 'Inclusa',
    features: [
      '1 Página One-Page de Alta Conversão',
      'Botão WhatsApp com mensagem pré-configurada',
      'Otimizada para Google Ads & Meta Ads',
      'Carregamento ultrarrápido (< 1s)',
      'Hospedagem de alta performance inclusa',
      'Certificado SSL (HTTPS) gratuito',
      'Formulário inteligente para leads'
    ],
    ctaText: 'Escolher Landing Page'
  },
  {
    id: 'catalogo-delivery',
    name: 'Catálogo Digital & Delivery',
    badge: 'Mais Popular ⭐',
    popular: true,
    subtitle: 'Cardápio ou catálogo interativo completo com carrinho de pedidos direto no WhatsApp.',
    targetAudience: 'Ideal para: Restaurantes, Pizzarias, Lojas e Delivery.',
    setupPrice: 'R$ 1.500',
    setupPeriod: 'valor único',
    maintenancePrice: 'R$ 150/mês',
    maintenancePeriod: '/mês',
    maintenanceNote: 'Hospedagem inclusa com suporte e atualizações contínuas de cardápio.',
    domainInfo: 'À parte',
    hostingInfo: 'Inclusa',
    features: [
      'Catálogo / Cardápio interativo com carrinho',
      'Envio de pedido detalhado no WhatsApp',
      '0% de comissões por venda',
      'Edição profissional e troca de fotos mensal',
      'Atualização de preços e novos produtos',
      'QR Code personalizado para mesas e balcão'
    ],
    ctaText: 'Quero Catálogo / Delivery'
  },
  {
    id: 'institucional',
    name: 'Site Institucional Completo',
    badge: 'Empresas & Negócios',
    popular: false,
    subtitle: 'Presença corporativa multi-páginas de alto impacto para consolidação de marca e negócios.',
    targetAudience: 'Ideal para: Empresas, Construtoras, Franquias e Indústrias.',
    setupPrice: 'A partir de R$ 3.500',
    setupPeriod: 'ou sob orçamento',
    maintenancePrice: 'A partir de R$ 600/mês',
    maintenancePeriod: '/mês',
    maintenanceNote: 'Hospedagem corporativa inclusa, segurança avançada e suporte prioritário.',
    domainInfo: 'À parte',
    hostingInfo: 'Inclusa',
    features: [
      'Estrutura multi-páginas completa',
      'Painel de Gestão e Blog corporativo',
      'Segurança avançada e backups contínuos',
      'Otimização SEO avançada no Google',
      'Atendimento prioritário corporativo',
      'Contas de e-mail profissional inclusas'
    ],
    ctaText: 'Solicitar Orçamento'
  }
];

export const DEFAULT_HERO: EditableHeroContent = {
  badgeText: 'Sites de Alta Performance que Vendem 24h por Dia',
  headlinePrefix: 'Transforme sua presença digital com',
  headlineHighlight: 'Sites de Alta Conversão',
  subheadline: 'Desenvolvemos landing pages, catálogos e sites institucionais profissionais feitos sob medida para prestadores de serviços, comércios e empresas.',
  whatsappNumber: WHATSAPP_NUMBER
};

export const INITIAL_LEADS: LeadSubmission[] = [
  {
    id: 'lead-1',
    companyName: 'Lumina Engenharia Solar',
    industry: 'Energia Solar',
    phone: '(85) 98844-1122',
    preferredModel: 'Lumina Solar (Energia Solar)',
    goal: 'Gerar Mais Vendas e Clientes no WhatsApp',
    notes: 'Precisa de formulário de cotação rápido e mapa de atendimento.',
    createdAt: 'Hoje às 10:42',
    source: 'form',
    status: 'novo'
  },
  {
    id: 'lead-2',
    companyName: 'Dra. Camila Odontologia',
    industry: 'Saúde / Odonto',
    phone: '(85) 99123-4567',
    preferredModel: 'Odonto Smile (Odontologia)',
    goal: 'Agendamento de Consultas',
    notes: 'Interesse no plano Landing Page Profissional.',
    createdAt: 'Ontem às 16:15',
    source: 'chat',
    status: 'atendido'
  },
  {
    id: 'lead-3',
    companyName: 'Pizzaria Bella Napoli',
    industry: 'Alimentação / Delivery',
    phone: '(85) 99788-3300',
    preferredModel: 'Bella Pizza (Pizzaria)',
    goal: 'Vender Produtos Online',
    notes: 'Deseja implementar catálogo com cardápio de 40 sabores.',
    createdAt: 'Há 2 dias',
    source: 'form',
    status: 'novo'
  }
];

export function getStoredConfig(): SiteConfig {
  if (typeof window === 'undefined') {
    return {
      plans: DEFAULT_PLANS,
      models: WEBSITE_MODELS,
      hero: DEFAULT_HERO,
      leads: INITIAL_LEADS,
      metrics: {
        whatsappClicks: 142,
        briefingsSent: 28,
        demoViews: 384
      }
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      let currentModels = parsed.models || WEBSITE_MODELS;
      if (Array.isArray(currentModels)) {
        // Filter out explicitly removed default models like rayssa15anos
        currentModels = currentModels.filter((m: WebsiteModel) => !m.demoUrl?.includes('rayssa15anos') && m.title !== 'Rayssa 15 Anos');
        const existingUrls = new Set(currentModels.map((m: WebsiteModel) => m.demoUrl));
        const missingDefaultModels = WEBSITE_MODELS.filter(m => !existingUrls.has(m.demoUrl));
        if (missingDefaultModels.length > 0) {
          currentModels = [...currentModels, ...missingDefaultModels];
        }
      }

      let currentPlans = parsed.plans || DEFAULT_PLANS;
      if (Array.isArray(currentPlans)) {
        // If plans contain old pricing like 'R$ 200 a R$ 400' or missing domainInfo, upgrade to DEFAULT_PLANS
        if (currentPlans[0]?.setupPrice !== 'R$ 350' || !currentPlans[0]?.domainInfo) {
          currentPlans = DEFAULT_PLANS;
        }
      } else {
        currentPlans = DEFAULT_PLANS;
      }

      return {
        plans: currentPlans,
        models: currentModels,
        hero: parsed.hero || DEFAULT_HERO,
        leads: parsed.leads || INITIAL_LEADS,
        metrics: parsed.metrics || {
          whatsappClicks: 142,
          briefingsSent: 28,
          demoViews: 384
        }
      };
    }
  } catch (err) {
    console.error('Error reading site config from localStorage', err);
  }

  return {
    plans: DEFAULT_PLANS,
    models: WEBSITE_MODELS,
    hero: DEFAULT_HERO,
    leads: INITIAL_LEADS,
    metrics: {
      whatsappClicks: 142,
      briefingsSent: 28,
      demoViews: 384
    }
  };
}

export function saveStoredConfig(config: SiteConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Error saving site config to localStorage', err);
  }
}

export function recordLead(lead: Omit<LeadSubmission, 'id' | 'createdAt'>) {
  const config = getStoredConfig();
  const newLead: LeadSubmission = {
    ...lead,
    status: lead.status || 'novo',
    id: 'lead-' + Date.now(),
    createdAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + ' de ' + new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  };
  config.leads = [newLead, ...config.leads];
  config.metrics.briefingsSent += 1;
  saveStoredConfig(config);
  return config;
}

export function incrementMetric(metric: 'whatsappClicks' | 'demoViews') {
  const config = getStoredConfig();
  if (config.metrics[metric] !== undefined) {
    config.metrics[metric] += 1;
    saveStoredConfig(config);
  }
}

export function getStoredAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (raw) {
      const user: AdminUser = JSON.parse(raw);
      if (user.email === AUTHORIZED_ADMIN_EMAIL && user.token) {
        // Enforce 24-hour session expiry
        if (user.authenticatedAt) {
          const authTime = new Date(user.authenticatedAt).getTime();
          const now = Date.now();
          if (now - authTime > 24 * 60 * 60 * 1000) {
            clearAdminSession();
            return null;
          }
        }
        return user;
      } else {
        clearAdminSession();
      }
    }
  } catch {
    clearAdminSession();
    return null;
  }
  return null;
}

export function saveAdminSession(user: AdminUser) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
  } catch (err) {
    console.error('Error saving session', err);
  }
}

export function clearAdminSession() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } catch {}
}
