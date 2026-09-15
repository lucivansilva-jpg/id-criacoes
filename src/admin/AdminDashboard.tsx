import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  DollarSign, 
  Layers, 
  Edit3, 
  Plus, 
  Trash2, 
  Save, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  LogOut, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  Send, 
  Users, 
  MousePointerClick, 
  Eye, 
  FileText, 
  ShieldCheck,
  Search,
  Filter,
  Check,
  AlertCircle,
  AlertTriangle,
  Clock,
  CheckCheck
} from 'lucide-react';
import { 
  SiteConfig, 
  EditablePricingPlan, 
  AdminUser, 
  LeadSubmission,
  AUTHORIZED_ADMIN_EMAIL 
} from './adminTypes';
import { WebsiteModel, Category } from '../types';
import { DEFAULT_PLANS, DEFAULT_HERO, saveStoredConfig } from './adminState';
import { WEBSITE_MODELS } from '../data';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onLogout: () => void;
  initialTab?: 'metrics' | 'plans' | 'models' | 'hero' | 'leads';
  activeTab?: 'metrics' | 'plans' | 'models' | 'hero' | 'leads';
  setActiveTab?: (tab: 'metrics' | 'plans' | 'models' | 'hero' | 'leads') => void;
}

export function AdminDashboard({
  isOpen,
  onClose,
  user,
  config,
  onUpdateConfig,
  onLogout,
  initialTab = 'metrics',
  activeTab: controlledActiveTab,
  setActiveTab: setControlledActiveTab
}: AdminDashboardProps) {
  const [internalTab, setInternalTab] = useState<'metrics' | 'plans' | 'models' | 'hero' | 'leads'>(initialTab);
  const activeTab = controlledActiveTab || internalTab;
  const setActiveTab = (tab: 'metrics' | 'plans' | 'models' | 'hero' | 'leads') => {
    setInternalTab(tab);
    if (setControlledActiveTab) {
      setControlledActiveTab(tab);
    }
  };
  
  // Local edit states
  const [plans, setPlans] = useState<EditablePricingPlan[]>(config.plans);
  const [models, setModels] = useState<WebsiteModel[]>(config.models);
  const [hero, setHero] = useState(config.hero);
  const [saveAlert, setSaveAlert] = useState(false);
  const [searchModel, setSearchModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Deletion confirmation modal state
  const [modelToDelete, setModelToDelete] = useState<WebsiteModel | null>(null);

  // Leads filter state
  const [leadFilter, setLeadFilter] = useState<'todos' | 'novos' | 'atendidos'>('todos');

  // New model form state
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [newModel, setNewModel] = useState<WebsiteModel>({
    id: '',
    title: '',
    description: '',
    category: 'Tecnologia',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    demoUrl: 'https://example.com'
  });

  if (!isOpen) return null;

  const handleSaveAll = () => {
    const updated: SiteConfig = {
      ...config,
      plans,
      models,
      hero
    };
    onUpdateConfig(updated);
    saveStoredConfig(updated);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm('Tem certeza que deseja restaurar as configurações padrão de preços, modelos e textos?')) {
      const resetConfig: SiteConfig = {
        ...config,
        plans: DEFAULT_PLANS,
        models: WEBSITE_MODELS,
        hero: DEFAULT_HERO
      };
      setPlans(DEFAULT_PLANS);
      setModels(WEBSITE_MODELS);
      setHero(DEFAULT_HERO);
      onUpdateConfig(resetConfig);
      saveStoredConfig(resetConfig);
      setSaveAlert(true);
      setTimeout(() => setSaveAlert(false), 3000);
    }
  };

  const handlePlanChange = (index: number, field: keyof EditablePricingPlan, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const handleAddModel = () => {
    if (!newModel.title || !newModel.demoUrl) {
      alert('Por favor, informe ao menos o Título e o Link de Demonstração.');
      return;
    }
    const modelToAdd: WebsiteModel = {
      ...newModel,
      id: 'custom-' + Date.now()
    };
    const updated = [modelToAdd, ...models];
    setModels(updated);
    setIsAddingModel(false);
    setNewModel({
      id: '',
      title: '',
      description: '',
      category: 'Tecnologia',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      demoUrl: 'https://example.com'
    });
  };

  const confirmDeleteModel = () => {
    if (!modelToDelete) return;
    const updated = models.filter(m => m.id !== modelToDelete.id);
    setModels(updated);
    const updatedConfig: SiteConfig = {
      ...config,
      models: updated,
      plans,
      hero
    };
    onUpdateConfig(updatedConfig);
    saveStoredConfig(updatedConfig);
    setModelToDelete(null);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleToggleLeadStatus = (leadId: string) => {
    const updatedLeads = config.leads.map(lead => {
      if (lead.id === leadId) {
        const nextStatus: 'novo' | 'atendido' = lead.status === 'atendido' ? 'novo' : 'atendido';
        return { ...lead, status: nextStatus };
      }
      return lead;
    });
    const updatedConfig: SiteConfig = {
      ...config,
      leads: updatedLeads,
      plans,
      models,
      hero
    };
    onUpdateConfig(updatedConfig);
    saveStoredConfig(updatedConfig);
  };

  const categoriesList: Category[] = [
    'Todos',
    'Eventos',
    'Energia Solar',
    'Tecnologia',
    'Institucional',
    'Financeiro',
    'Hotelaria',
    'Advocacia',
    'Contabilidade',
    'Delivery',
    'Odontologia',
    'Pizzaria',
    'Saúde e Beleza',
    'Serviços'
  ];

  const filteredModels = models.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchModel.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchModel.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || m.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredLeads = config.leads.filter(lead => {
    if (leadFilter === 'novos') return lead.status !== 'atendido';
    if (leadFilter === 'atendidos') return lead.status === 'atendido';
    return true;
  });

  const countNewLeads = config.leads.filter(l => l.status !== 'atendido').length;
  const countAttendedLeads = config.leads.filter(l => l.status === 'atendido').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-6xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
      >
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black text-sm">
              ID
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black text-white">Painel Administrativo</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck size={11} />
                  {AUTHORIZED_ADMIN_EMAIL}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Gestão em tempo real de preços, vitrine e leads da ID Criações</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all cursor-pointer"
            >
              <Save size={14} />
              <span>Salvar Alterações</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-xl border border-zinc-700 transition-colors cursor-pointer"
              title="Fechar Painel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Save Success Alert */}
        <AnimatePresence>
          {saveAlert && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-500/10 border-b border-emerald-500/30 px-5 py-2 text-xs text-emerald-300 flex items-center justify-between shrink-0"
            >
              <span className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Alterações salvas com sucesso! A landing page foi atualizada instantaneamente.
              </span>
              <button onClick={() => setSaveAlert(false)} className="text-emerald-400 hover:underline text-[11px]">
                OK
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Body with Sidebar Tabs */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Left Navigation Bar */}
          <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/70 p-2.5 flex md:flex-col gap-1 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'metrics'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <BarChart3 size={15} />
              <span>Métricas & Leads</span>
              <span className="ml-auto hidden md:inline px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300">
                {countNewLeads > 0 ? `${countNewLeads} novos` : config.leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <DollarSign size={15} />
              <span>Planos & Preços</span>
              <span className="ml-auto hidden md:inline px-1.5 py-0.2 rounded text-[10px] text-zinc-300 font-mono bg-zinc-800">
                {plans.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('models')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'models'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Layers size={15} />
              <span>Vitrine de Modelos</span>
              <span className="ml-auto hidden md:inline px-1.5 py-0.2 rounded text-[10px] text-zinc-300 font-mono bg-zinc-800">
                {models.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'hero'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Edit3 size={15} />
              <span>Hero & Textos</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <FileText size={15} />
              <span>Histórico de Briefings</span>
              {countNewLeads > 0 && (
                <span className="ml-auto hidden md:inline px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  {countNewLeads}
                </span>
              )}
            </button>

            <div className="mt-auto hidden md:block pt-3 border-t border-zinc-900 space-y-1">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Restaurar Padrões</span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                <LogOut size={13} />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto bg-zinc-950/40">
            {/* TAB 1: MÉTRICAS & LEADS */}
            {activeTab === 'metrics' && (
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <BarChart3 size={18} className="text-cyan-400" />
                    Métricas em Tempo Real
                  </h3>
                  <p className="text-[11px] text-zinc-400">Indicadores de conversão e últimos contatos recebidos.</p>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5 font-medium">
                      <span>Briefings Recebidos</span>
                      <Send size={15} className="text-cyan-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{config.metrics.briefingsSent}</div>
                    <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 inline-block">
                      {countNewLeads} pendentes de atendimento
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5 font-medium">
                      <span>Cliques no WhatsApp</span>
                      <MousePointerClick size={15} className="text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{config.metrics.whatsappClicks}</div>
                    <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 inline-block">
                      Taxa de Conversão: 4.8%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                    <div className="flex items-center justify-between text-zinc-400 text-xs mb-1.5 font-medium">
                      <span>Demos Visualizadas</span>
                      <Eye size={15} className="text-purple-400" />
                    </div>
                    <div className="text-2xl font-black text-white">{config.metrics.demoViews}</div>
                    <span className="text-[10px] text-purple-400 font-semibold mt-0.5 inline-block">
                      {models.length} Modelos ativos na vitrine
                    </span>
                  </div>
                </div>

                {/* Recent Leads Preview */}
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Users size={15} className="text-cyan-400" />
                      Últimas Solicitações e Briefings
                    </h4>
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                    >
                      Ver histórico completo ({config.leads.length}) →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {config.leads.slice(0, 3).map((lead) => {
                      const isAttended = lead.status === 'atendido';
                      return (
                        <div key={lead.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{lead.companyName}</span>
                              <span className="px-1.5 py-0.2 bg-zinc-800 text-zinc-300 rounded text-[10px]">
                                {lead.industry}
                              </span>
                              
                              {/* Status Tag */}
                              <button
                                type="button"
                                onClick={() => handleToggleLeadStatus(lead.id)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                  isAttended
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                                }`}
                                title="Clique para alternar o status do atendimento"
                              >
                                {isAttended ? (
                                  <>
                                    <Check size={10} className="text-emerald-400" />
                                    <span>Atendido</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    <span>Novo</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="text-zinc-400 text-[11px] mt-0.5">
                              Interesse: <span className="text-cyan-400 font-medium">{lead.preferredModel || 'Plano Personalizado'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-zinc-500 text-[10px]">{lead.createdAt}</span>
                            <a
                              href={`https://wa.me/5585996722994?text=${encodeURIComponent(`Olá ${lead.companyName}! Recebemos seu briefing na ID Criações.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 text-[11px]"
                            >
                              <Phone size={11} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: GESTÃO DE PLANOS & PREÇOS (Otimizado e Compacto) */}
            {activeTab === 'plans' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <DollarSign size={18} className="text-cyan-400" />
                      Gestão de Planos & Preços
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Edite os valores de setup e manutenção exibidos nos 3 cards principais da landing page.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {plans.map((plan, index) => (
                    <div key={plan.id} className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                      {/* Plan Header */}
                      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-400 font-mono text-[11px] flex items-center justify-center font-bold">
                            0{index + 1}
                          </span>
                          <h4 className="font-black text-sm text-white">{plan.name}</h4>
                        </div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={plan.popular || false}
                            onChange={(e) => handlePlanChange(index, 'popular', e.target.checked)}
                            className="rounded accent-cyan-500 cursor-pointer"
                          />
                          <span className="text-[11px]">Destaque "Mais Popular"</span>
                        </label>
                      </div>

                      {/* Compact Inputs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-400">Nome do Plano</label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => handlePlanChange(index, 'name', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-400">Selo / Badge</label>
                          <input
                            type="text"
                            value={plan.badge || ''}
                            onChange={(e) => handlePlanChange(index, 'badge', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                            placeholder="Ex: Alta Conversão"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-cyan-400">Setup (Desenvolvimento)</label>
                          <input
                            type="text"
                            value={plan.setupPrice}
                            onChange={(e) => handlePlanChange(index, 'setupPrice', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-cyan-500/40 rounded-xl text-xs text-cyan-300 font-bold focus:border-cyan-400 outline-none"
                            placeholder="R$ 600 a R$ 1.500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-400">Manutenção / Suporte</label>
                          <input
                            type="text"
                            value={plan.maintenancePrice}
                            onChange={(e) => handlePlanChange(index, 'maintenancePrice', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold focus:border-emerald-400 outline-none"
                            placeholder="R$ 90 a R$ 150"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-zinc-400">Domínio</label>
                          <input
                            type="text"
                            value={plan.domainInfo || 'À parte'}
                            onChange={(e) => handlePlanChange(index, 'domainInfo', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                            placeholder="À parte"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-emerald-400">Hospedagem</label>
                          <input
                            type="text"
                            value={plan.hostingInfo || 'Inclusa'}
                            onChange={(e) => handlePlanChange(index, 'hostingInfo', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-emerald-400 focus:border-emerald-400 outline-none"
                            placeholder="Inclusa"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-bold text-zinc-400">Subtítulo Estratégico</label>
                          <input
                            type="text"
                            value={plan.subtitle}
                            onChange={(e) => handlePlanChange(index, 'subtitle', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-[11px] font-bold text-zinc-400">Público-Alvo Recomendado</label>
                          <input
                            type="text"
                            value={plan.targetAudience}
                            onChange={(e) => handlePlanChange(index, 'targetAudience', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: GESTÃO DA VITRINE DE MODELOS */}
            {activeTab === 'models' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <Layers size={18} className="text-cyan-400" />
                      Vitrine de Modelos ({models.length} Projetos)
                    </h3>
                    <p className="text-[11px] text-zinc-400">Adicione novos modelos ou altere links de demonstração e fotos.</p>
                  </div>

                  <button
                    onClick={() => setIsAddingModel(true)}
                    className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm w-fit"
                  >
                    <Plus size={15} />
                    <span>Novo Modelo de Site</span>
                  </button>
                </div>

                {/* Filter & Search Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      value={searchModel}
                      onChange={(e) => setSearchModel(e.target.value)}
                      placeholder="Buscar por título ou descrição..."
                      className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-200 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Add New Model Form Drawer */}
                {isAddingModel && (
                  <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-cyan-500/50 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-bold text-xs text-cyan-400 flex items-center gap-1.5">
                        <Plus size={15} />
                        Adicionar Novo Modelo à Vitrine
                      </h4>
                      <button onClick={() => setIsAddingModel(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                        <X size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-zinc-300">Título do Projeto</label>
                        <input
                          type="text"
                          value={newModel.title}
                          onChange={(e) => setNewModel({...newModel, title: e.target.value})}
                          placeholder="Ex: Studio Pilates Pro"
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-zinc-300">Categoria</label>
                        <select
                          value={newModel.category}
                          onChange={(e) => setNewModel({...newModel, category: e.target.value as Category})}
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none"
                        >
                          {categoriesList.filter(c => c !== 'Todos').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-zinc-300">URL de Demonstração (Demo Live)</label>
                        <input
                          type="url"
                          value={newModel.demoUrl}
                          onChange={(e) => setNewModel({...newModel, demoUrl: e.target.value})}
                          placeholder="https://meusite.netlify.app"
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-zinc-300">URL da Imagem de Capa</label>
                        <input
                          type="url"
                          value={newModel.imageUrl}
                          onChange={(e) => setNewModel({...newModel, imageUrl: e.target.value})}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-[11px] text-zinc-300">Descrição Comercial Curta</label>
                        <input
                          type="text"
                          value={newModel.description}
                          onChange={(e) => setNewModel({...newModel, description: e.target.value})}
                          placeholder="Ex: Landing page de alta conversão para estúdios e personal trainers."
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        onClick={() => setIsAddingModel(false)}
                        className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleAddModel}
                        className="px-3 py-1.5 bg-cyan-500 text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Save size={13} />
                        <span>Salvar Modelo</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Models Grid Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredModels.map((model) => (
                    <div key={model.id} className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex gap-3 items-start group">
                      <img
                        src={model.imageUrl}
                        alt={model.title}
                        className="w-18 h-18 rounded-xl object-cover border border-zinc-700 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="text-xs font-black text-white truncate">{model.title}</span>
                          <span className="px-2 py-0.5 bg-zinc-800 text-cyan-400 rounded-md text-[10px] font-semibold shrink-0">
                            {model.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                          {model.description}
                        </p>
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-zinc-800/80">
                          <a
                            href={model.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 truncate max-w-[160px]"
                          >
                            <ExternalLink size={11} />
                            <span className="truncate">{model.demoUrl}</span>
                          </a>

                          {/* Trigger Confirmation Modal */}
                          <button
                            type="button"
                            onClick={() => setModelToDelete(model)}
                            className="p-1 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                            title="Remover modelo da vitrine"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: HERO & TEXTOS (Otimizado e Compacto) */}
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Edit3 size={18} className="text-cyan-400" />
                    Textos Principais da Página (Hero & Contato)
                  </h3>
                  <p className="text-[11px] text-zinc-400">Edite os títulos, badge e número de WhatsApp da ID Criações.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-400">Texto do Badge Superior</label>
                    <input
                      type="text"
                      value={hero.badgeText}
                      onChange={(e) => setHero({...hero, badgeText: e.target.value})}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-zinc-400">Prefixo do Título Principal</label>
                      <input
                        type="text"
                        value={hero.headlinePrefix}
                        onChange={(e) => setHero({...hero, headlinePrefix: e.target.value})}
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-cyan-400">Texto em Destaque Neon</label>
                      <input
                        type="text"
                        value={hero.headlineHighlight}
                        onChange={(e) => setHero({...hero, headlineHighlight: e.target.value})}
                        className="w-full px-3 py-2 bg-zinc-950 border border-cyan-500/40 rounded-xl text-xs text-cyan-300 font-bold focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-400">Subtítulo da Hero</label>
                    <textarea
                      rows={2}
                      value={hero.subheadline}
                      onChange={(e) => setHero({...hero, subheadline: e.target.value})}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-cyan-500 outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-emerald-400">Número do WhatsApp Comercial (DDI + DDD + Número)</label>
                    <input
                      type="text"
                      value={hero.whatsappNumber}
                      onChange={(e) => setHero({...hero, whatsappNumber: e.target.value})}
                      className="w-full px-3 py-2 bg-zinc-950 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-mono focus:border-emerald-400 outline-none"
                      placeholder="5585996722994"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: HISTÓRICO DE BRIEFINGS (Com Status Tags e Filtros) */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <FileText size={18} className="text-cyan-400" />
                      Histórico Completo de Briefings ({config.leads.length})
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Gerencie os contatos recebidos e marque o status de atendimento.
                    </p>
                  </div>

                  {/* Status Filters */}
                  <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setLeadFilter('todos')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        leadFilter === 'todos'
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Todos ({config.leads.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeadFilter('novos')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        leadFilter === 'novos'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Novos ({countNewLeads})
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeadFilter('atendidos')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                        leadFilter === 'atendidos'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Check size={11} className="text-emerald-400" />
                      Atendidos ({countAttendedLeads})
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {filteredLeads.length === 0 ? (
                    <div className="p-8 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800/80 text-zinc-500 text-xs">
                      Nenhum lead encontrado para o filtro selecionado.
                    </div>
                  ) : (
                    filteredLeads.map((lead) => {
                      const isAttended = lead.status === 'atendido';
                      return (
                        <div 
                          key={lead.id} 
                          className={`p-3.5 rounded-2xl bg-zinc-900/80 border space-y-2 text-xs transition-all ${
                            isAttended ? 'border-zinc-800 opacity-90' : 'border-amber-500/30 shadow-xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-white text-sm">{lead.companyName}</span>
                              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-md text-[10px] font-semibold border border-cyan-500/20">
                                {lead.industry}
                              </span>

                              {/* Interactive Lead Status Tag */}
                              <button
                                type="button"
                                onClick={() => handleToggleLeadStatus(lead.id)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                                  isAttended
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                                }`}
                                title="Clique para alternar o status do atendimento"
                              >
                                {isAttended ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span>Atendido</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    <span>Novo</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-zinc-500 text-[10px]">{lead.createdAt}</span>
                              <a
                                href={`https://wa.me/5585996722994?text=${encodeURIComponent(`Olá ${lead.companyName}! Recebemos seu briefing na ID Criações.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1 text-[11px]"
                              >
                                <Phone size={11} />
                                <span>Responder no WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 text-[11px]">
                            {lead.phone && (
                              <div>
                                <strong className="text-zinc-400">Telefone/WhatsApp:</strong> {lead.phone}
                              </div>
                            )}
                            {lead.preferredModel && (
                              <div>
                                <strong className="text-zinc-400">Modelo de Interesse:</strong> {lead.preferredModel}
                              </div>
                            )}
                            {lead.goal && (
                              <div className="sm:col-span-2">
                                <strong className="text-zinc-400">Objetivo:</strong> {lead.goal}
                              </div>
                            )}
                            {lead.notes && (
                              <div className="sm:col-span-2 p-2 rounded-xl bg-zinc-950 text-zinc-400 text-[11px] border border-zinc-800/60">
                                <strong className="text-zinc-300">Observações:</strong> {lead.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Confirmation Modal for Model Deletion */}
      <AnimatePresence>
        {modelToDelete && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-zinc-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Confirmar Exclusão de Modelo</h3>
                  <p className="text-xs text-zinc-400">Esta ação não poderá ser desfeita.</p>
                </div>
              </div>

              {/* Model Preview Card */}
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-3">
                <img
                  src={modelToDelete.imageUrl}
                  alt={modelToDelete.title}
                  className="w-14 h-14 rounded-xl object-cover border border-zinc-700 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">{modelToDelete.title}</div>
                  <div className="text-[10px] text-cyan-400 font-semibold">{modelToDelete.category}</div>
                  <div className="text-[10px] text-zinc-500 truncate mt-0.5">{modelToDelete.demoUrl}</div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                Tem certeza que deseja excluir o modelo <strong className="text-white">"{modelToDelete.title}"</strong> da vitrine da ID Criações? Ele deixará de ser exibido imediatamente aos clientes na landing page.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setModelToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteModel}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Sim, Excluir Modelo</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
