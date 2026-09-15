import { WebsiteModel, Category } from '../types';

export const AUTHORIZED_ADMIN_EMAIL = 'lucivan.silva@gmail.com';

export interface AdminUser {
  email: string;
  name: string;
  avatarUrl: string;
  authenticatedAt: string;
  token: string;
}

export interface EditablePricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  subtitle: string;
  targetAudience: string;
  setupPrice: string;
  setupPeriod: string;
  maintenancePrice: string;
  maintenancePeriod: string;
  maintenanceNote: string;
  domainInfo?: string;
  hostingInfo?: string;
  features: string[];
  ctaText: string;
}

export interface EditableHeroContent {
  badgeText: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  whatsappNumber: string;
}

export interface LeadSubmission {
  id: string;
  companyName: string;
  industry: string;
  phone?: string;
  preferredModel?: string;
  goal?: string;
  notes?: string;
  createdAt: string;
  source: 'chat' | 'form';
  status?: 'novo' | 'atendido';
}

export interface SiteConfig {
  plans: EditablePricingPlan[];
  models: WebsiteModel[];
  hero: EditableHeroContent;
  leads: LeadSubmission[];
  metrics: {
    whatsappClicks: number;
    briefingsSent: number;
    demoViews: number;
  };
}
