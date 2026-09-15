import { Globe, Lock, MessageCircle, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';
import { AdminUser } from '../admin/adminTypes';

export function FooterSection({
  activeTheme,
  adminUser,
  onOpenAdminModal,
  onOpenDashboard,
  scrollToSection,
  onOpenInstitutionalModal,
  onNavigate
}: {
  activeTheme: ThemeConfig;
  adminUser: AdminUser | null;
  onOpenAdminModal: () => void;
  onOpenDashboard: () => void;
  scrollToSection: (id: string) => void;
  onOpenInstitutionalModal?: () => void;
  onNavigate?: (view: 'home' | 'servicos' | 'modelos') => void;
}) {
  const handleGoToServices = () => {
    if (onNavigate) {
      onNavigate('servicos');
    } else {
      window.location.href = '/servicos.html';
    }
  };

  const handleGoToModels = () => {
    if (onNavigate) {
      onNavigate('modelos');
    } else {
      window.location.href = '/modelos.html';
    }
  };

  const handleGoHome = () => {
    if (onNavigate) {
      onNavigate('home');
      setTimeout(() => scrollToSection('hero'), 100);
    } else {
      scrollToSection('hero');
    }
  };

  return (
    <footer id="contato" className={`scroll-mt-28 ${activeTheme.footerBg} ${activeTheme.footerText} border-t ${activeTheme.footerBorder} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleGoHome}>
              <div className={`w-9 h-9 ${activeTheme.accentBg} rounded-xl flex items-center justify-center ${activeTheme.accentShadow}`}>
                <Globe className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                ID Criações
              </span>
            </div>
            <p className={`text-xs sm:text-sm ${activeTheme.footerMuted} leading-relaxed`}>
              Desenvolvimento de sites profissionais, landing pages de alta conversão e catálogos digitais com entrega expressa e manutenção contínua.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navegação Rápida
            </h4>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${activeTheme.footerMuted}`}>
              {onOpenInstitutionalModal && (
                <li><button onClick={onOpenInstitutionalModal} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Quem Somos</button></li>
              )}
              <li><button onClick={handleGoToModels} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Modelos Prontos</button></li>
              <li><button onClick={() => scrollToSection('processo')} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Como Funciona</button></li>
              <li><button onClick={() => scrollToSection('beneficios')} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Diferenciais</button></li>
              <li><button onClick={handleGoToServices} className={`hover:${activeTheme.accentText} transition-colors font-semibold text-cyan-400 cursor-pointer`}>Serviços & Planos</button></li>
              <li><button onClick={() => scrollToSection('briefing')} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Iniciar Projeto</button></li>
              <li><button onClick={() => scrollToSection('depoimentos')} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Depoimentos</button></li>
              <li><button onClick={() => scrollToSection('faq')} className={`hover:${activeTheme.accentText} transition-colors cursor-pointer`}>Dúvidas Frequentes</button></li>
            </ul>
          </div>

          {/* Col 3: Contact Channels */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Canais de Atendimento
            </h4>
            <ul className={`space-y-3 text-xs sm:text-sm ${activeTheme.footerMuted}`}>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className={activeTheme.accentText} />
                <span>+55 (85) 99672-2994</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className={activeTheme.accentText} />
                <span>contato@idcriações.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={15} className={activeTheme.accentText} />
                <span>Fortaleza - CE | Atendimento Nacional</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrative & Direct WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Área Restrita
            </h4>
            <p className={`text-xs ${activeTheme.footerMuted}`}>
              Acesso exclusivo para administradores da ID Criações gerenciarem planos, vitrines e leads.
            </p>
            
            {adminUser ? (
              <button
                type="button"
                onClick={onOpenDashboard}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${activeTheme.accentPill} text-xs font-bold transition-all cursor-pointer`}
              >
                <Lock size={14} />
                <span>Abrir Dashboard Admin</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAdminModal}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl ${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryBorder} ${activeTheme.btnSecondaryText} border text-xs font-semibold hover:border-current transition-all cursor-pointer`}
              >
                <Lock size={13} />
                <span>Login do Administrador</span>
              </button>
            )}

            <div className="pt-2">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noreferrer"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold text-xs ${activeTheme.accentShadow} transition-all`}
              >
                <MessageCircle size={15} />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className={`pt-8 border-t ${activeTheme.footerBorder} flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${activeTheme.footerMuted}`}>
          <p>© {new Date().getFullYear()} ID Criações. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1.5">
            <span>Desenvolvido com tecnologia de ponta & alta performance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
