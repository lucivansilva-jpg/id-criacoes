import { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Edit3, 
  LogOut, 
  DollarSign, 
  Layers, 
  BarChart3, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { AdminUser, AUTHORIZED_ADMIN_EMAIL } from './adminTypes';

interface AdminBarProps {
  user: AdminUser;
  onOpenDashboard: (tab?: 'metrics' | 'plans' | 'models' | 'hero' | 'leads') => void;
  onOpenTab?: (tab: 'metrics' | 'plans' | 'models' | 'hero' | 'leads') => void;
  inlineEditMode: boolean;
  onToggleInlineEdit: () => void;
  onLogout: () => void;
}

export function AdminBar({
  user,
  onOpenDashboard,
  onOpenTab,
  inlineEditMode,
  onToggleInlineEdit,
  onLogout
}: AdminBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = (tab?: 'metrics' | 'plans' | 'models' | 'hero' | 'leads') => {
    if (tab && onOpenTab) {
      onOpenTab(tab);
    } else {
      onOpenDashboard(tab);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 border-b border-cyan-500/40 backdrop-blur-md px-3 sm:px-6 py-2 shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-zinc-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
        {/* Left: Admin Identifier */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline font-bold text-zinc-300">Modo Administrador:</span>
          <span className="font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 text-[11px] truncate max-w-[180px] sm:max-w-none">
            {AUTHORIZED_ADMIN_EMAIL}
          </span>
        </div>

        {/* Center / Right: Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Inline Edit Toggle */}
          <button
            type="button"
            onClick={onToggleInlineEdit}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer text-[11px] ${
              inlineEditMode
                ? 'bg-cyan-500 text-zinc-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white'
            }`}
            title="Ativar/Desativar botões de edição rápida na página"
          >
            <Edit3 size={13} />
            <span className="hidden md:inline">Edição Inline:</span>
            <span>{inlineEditMode ? 'Ativa' : 'Desativada'}</span>
          </button>

          {/* Open Main Panel */}
          <button
            type="button"
            onClick={() => onOpenDashboard('plans')}
            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
          >
            <DollarSign size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">Preços</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDashboard('models')}
            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-[11px]"
          >
            <Layers size={13} className="text-cyan-400" />
            <span className="hidden sm:inline">Vitrine</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenDashboard('metrics')}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-[11px]"
          >
            <Settings size={13} />
            <span>Painel SaaS</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            className="p-1.5 bg-zinc-900 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg border border-zinc-800 hover:border-red-500/30 transition-colors cursor-pointer"
            title="Encerrar Sessão de Administrador"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
