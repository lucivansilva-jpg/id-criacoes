import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { WEBSITE_MODELS, WHATSAPP_BASE_URL } from './data';
import { WebsiteModel } from './types';
import { ThemeMode, THEMES } from './theme';
import { AdminAuthModal } from './admin/AdminAuthModal';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminBar } from './admin/AdminBar';
import { 
  SiteConfig, 
  AdminUser, 
  EditablePricingPlan,
  AUTHORIZED_ADMIN_EMAIL
} from './admin/adminTypes';
import { 
  getStoredConfig, 
  getStoredAdminSession, 
  clearAdminSession,
  saveStoredConfig
} from './admin/adminState';

// Modular Page Sections & Modals
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VitrineSection } from './components/VitrineSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PricingSection } from './components/PricingSection';
import { BriefingSection } from './components/BriefingSection';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { FloatingThemeWidget } from './components/ThemeSelector';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { IframePreviewModal } from './components/IframePreviewModal';
import { InstitutionalModal } from './components/InstitutionalModal';
import { ServicesPage } from './components/ServicesPage';
import { ModelsPage } from './components/ModelsPage';

export function App() {
  // Navigation view state ('home' | 'servicos' | 'modelos')
  const [currentView, setCurrentView] = useState<'home' | 'servicos' | 'modelos'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('servicos')) return 'servicos';
      if (path.includes('modelos')) return 'modelos';
    }
    return 'home';
  });

  // Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('id_criacoes_theme') as ThemeMode;
    if (saved && THEMES[saved]) return saved;
    return 'light';
  });

  const activeTheme = THEMES[theme] || THEMES.dark;

  // Sync theme changes globally on <html>, <body>, and [data-theme]
  useEffect(() => {
    localStorage.setItem('id_criacoes_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', !activeTheme.isLight);
    document.documentElement.style.colorScheme = activeTheme.isLight ? 'light' : 'dark';
  }, [theme, activeTheme]);

  const handleSelectTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  // Dynamic Site Configuration & Models from Admin State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(getStoredConfig());
  const [models, setModels] = useState<WebsiteModel[]>(() => {
    return siteConfig.models && siteConfig.models.length > 0 ? siteConfig.models : WEBSITE_MODELS;
  });
  const [plans, setPlans] = useState<EditablePricingPlan[]>(() => siteConfig.plans || []);

  // Admin Auth & Dashboard States
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredAdminSession());
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);
  const [dashboardTab, setDashboardTab] = useState<'metrics' | 'plans' | 'models' | 'hero' | 'leads'>('metrics');
  const [inlineEditMode, setInlineEditMode] = useState<boolean>(false);

  // Modal Preview State
  const [selectedPreviewModel, setSelectedPreviewModel] = useState<WebsiteModel | null>(null);

  // Institutional Modal State ("Quem Somos" / "Missão")
  const [showInstitutionalModal, setShowInstitutionalModal] = useState<boolean>(false);

  // Traditional Briefing Form Data State
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    preferredModel: '',
    goal: 'Receber Orçamentos no WhatsApp',
    notes: ''
  });

  // Listen for Live Admin State Updates
  useEffect(() => {
    const handleAdminUpdate = () => {
      const updated = getStoredConfig();
      setSiteConfig(updated);
      if (updated.models && updated.models.length > 0) {
        setModels(updated.models);
      }
      if (updated.plans && updated.plans.length > 0) {
        setPlans(updated.plans);
      }
    };

    window.addEventListener('admin-state-changed', handleAdminUpdate);
    return () => window.removeEventListener('admin-state-changed', handleAdminUpdate);
  }, []);

  const handleLogout = () => {
    signOut(auth).catch(() => {});
    clearAdminSession();
    setAdminUser(null);
    setShowAdminDashboard(false);
    setInlineEditMode(false);
  };

  const handleLoginSuccess = (user: AdminUser) => {
    if (!user || (user.email || '').trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      clearAdminSession();
      setAdminUser(null);
      return;
    }
    setAdminUser(user);
    setShowAdminAuthModal(false);
    setShowAdminDashboard(true);
  };

  const scrollToSection = (id: string) => {
    const targetId = id.replace(/^#/, '');
    const el = document.getElementById(targetId);
    if (el) {
      // Calculate top offset taking fixed navbar into account (~80px - 100px)
      const navOffset = adminUser ? 120 : 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth'
      });
    }
  };

  // Listen for browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('servicos')) {
        setCurrentView('servicos');
      } else if (path.includes('modelos')) {
        setCurrentView('modelos');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: 'home' | 'servicos' | 'modelos') => {
    setCurrentView(view);
    const targetPath = view === 'servicos' ? '/servicos.html' : view === 'modelos' ? '/modelos.html' : '/';
    try {
      window.history.pushState(null, '', targetPath);
    } catch {
      // safe fallback
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderModel = (modelTitle: string) => {
    setSelectedPreviewModel(null);
    const message = encodeURIComponent(`Olá! Gostaria de solicitar um orçamento para o modelo: *${modelTitle}* da ID Criações. Como podemos prosseguir?`);
    window.open(`${WHATSAPP_BASE_URL}?text=${message}`, '_blank');
  };

  const handleSelectPlan = (planName: string) => {
    const message = encodeURIComponent(`Olá! Tenho interesse em contratar o plano: *${planName}* da ID Criações. Poderia me passar mais detalhes?`);
    window.open(`${WHATSAPP_BASE_URL}?text=${message}`, '_blank');
  };

  const categories: string[] = ['Todos', ...(Array.from(new Set(models.map(m => String(m.category)))) as string[])];

  return (
    <div className={`min-h-screen ${activeTheme.pageBg} font-sans transition-colors duration-300 antialiased`}>
      {/* Top Floating Admin Bar for Authenticated Administrator */}
      {adminUser && (
        <AdminBar
          user={adminUser}
          onOpenDashboard={(tab) => {
            if (tab) setDashboardTab(tab);
            setShowAdminDashboard(true);
          }}
          onLogout={handleLogout}
          inlineEditMode={inlineEditMode}
          onToggleInlineEdit={() => setInlineEditMode(!inlineEditMode)}
        />
      )}

      {/* Navigation Header */}
      <Navbar
        adminUser={adminUser}
        theme={theme}
        activeTheme={activeTheme}
        onSelectTheme={handleSelectTheme}
        onOpenAdminModal={() => setShowAdminAuthModal(true)}
        onOpenDashboard={() => setShowAdminDashboard(true)}
        onOpenInstitutionalModal={() => setShowInstitutionalModal(true)}
        scrollToSection={scrollToSection}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content Area */}
      <main>
        {currentView === 'servicos' ? (
          /* Dedicated Services Page */
          <ServicesPage
            activeTheme={activeTheme}
            plans={plans}
            onSelectPlan={handleSelectPlan}
            isAdmin={!!adminUser}
            inlineEditMode={inlineEditMode}
            onEditPlans={() => {
              setDashboardTab('plans');
              setShowAdminDashboard(true);
            }}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentView === 'modelos' ? (
          /* Dedicated Models Page */
          <ModelsPage
            models={models}
            categories={categories}
            activeTheme={activeTheme}
            onOpenPreview={(model) => setSelectedPreviewModel(model)}
            onOrderModel={handleOrderModel}
            isAdmin={!!adminUser}
            inlineEditMode={inlineEditMode}
            onOpenManageModels={() => {
              setDashboardTab('models');
              setShowAdminDashboard(true);
            }}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : (
          /* Home Page - Strictly focused on websites & fast conversion */
          <>
            {/* 1. Hero Section with Abstract Tech Background */}
            <HeroSection
              siteConfig={siteConfig}
              activeTheme={activeTheme}
              adminUser={!!adminUser}
              inlineEditMode={inlineEditMode}
              onOpenHeroEdit={() => {
                setDashboardTab('hero');
                setShowAdminDashboard(true);
              }}
              scrollToSection={scrollToSection}
            />

            {/* 2. Vitrine de Modelos em Destaque (4 top models + Link para catálogo completo) */}
            <VitrineSection
              models={models}
              categories={categories}
              activeTheme={activeTheme}
              onOpenPreview={(model) => setSelectedPreviewModel(model)}
              onOrderModel={handleOrderModel}
              isAdmin={!!adminUser}
              inlineEditMode={inlineEditMode}
              onOpenManageModels={() => {
                setDashboardTab('models');
                setShowAdminDashboard(true);
              }}
              isHomeHighlight={true}
              onNavigate={handleNavigate}
            />

            {/* 3. Como Funciona (Interactive Horizontal Tabs) */}
            <HowItWorksSection activeTheme={activeTheme} />

            {/* 4. Serviços & Planos (4 Clean Cards with Transparent Pricing) */}
            <PricingSection
              plans={plans}
              onSelectPlan={(planName) => handleSelectPlan(planName)}
              activeTheme={activeTheme}
              isAdmin={!!adminUser}
              inlineEditMode={inlineEditMode}
              onEditPlans={() => {
                setDashboardTab('plans');
                setShowAdminDashboard(true);
              }}
            />

            {/* 5. Diferenciais com Acordeão (Foco em Web, sem ruídos) */}
            <BenefitsSection activeTheme={activeTheme} />

            {/* 6. Dúvidas Frequentes (4 Perguntas Essenciais anti-objeção) */}
            <FAQSection activeTheme={activeTheme} />

            {/* 7. Briefing Inteligente (Card direto para abrir Chat da Maia / Modal) */}
            <BriefingSection
              formData={formData}
              setFormData={setFormData}
              activeTheme={activeTheme}
            />
          </>
        )}
      </main>

      {/* Footer Section */}
      <FooterSection
        activeTheme={activeTheme}
        adminUser={adminUser}
        onOpenAdminModal={() => setShowAdminAuthModal(true)}
        onOpenDashboard={() => setShowAdminDashboard(true)}
        scrollToSection={scrollToSection}
        onOpenInstitutionalModal={() => setShowInstitutionalModal(true)}
        onNavigate={handleNavigate}
      />

      {/* Floating Theme Widget (Bottom Left) */}
      <FloatingThemeWidget
        currentTheme={theme}
        onSelectTheme={handleSelectTheme}
        activeTheme={activeTheme}
      />

      {/* Floating WhatsApp Contact Button (Bottom Right) */}
      <FloatingWhatsApp />

      {/* Live Iframe Preview Modal */}
      <IframePreviewModal
        model={selectedPreviewModel}
        onClose={() => setSelectedPreviewModel(null)}
        onOrder={handleOrderModel}
        activeTheme={activeTheme}
      />

      {/* Institutional Modal ("Quem Somos" / "Missão") */}
      <InstitutionalModal
        isOpen={showInstitutionalModal}
        onClose={() => setShowInstitutionalModal(false)}
        activeTheme={activeTheme}
      />

      {/* Admin Authentication Modal */}
      <AdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => setShowAdminAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin Full Dashboard Modal */}
      {adminUser && (
        <AdminDashboard
          isOpen={showAdminDashboard}
          onClose={() => setShowAdminDashboard(false)}
          user={adminUser}
          config={siteConfig}
          onUpdateConfig={(newConfig) => {
            saveStoredConfig(newConfig);
            setSiteConfig(newConfig);
            if (newConfig.models) setModels(newConfig.models);
            if (newConfig.plans) setPlans(newConfig.plans);
          }}
          onLogout={handleLogout}
          initialTab={dashboardTab}
        />
      )}
    </div>
  );
}

export default App;
