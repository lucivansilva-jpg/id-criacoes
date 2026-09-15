import React, { useState, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  X, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { AUTHORIZED_ADMIN_EMAIL, AdminUser } from './adminTypes';
import { saveAdminSession } from './adminState';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export function AdminAuthModal({ isOpen, onClose, onLoginSuccess }: AdminAuthModalProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const passwordInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Firebase Authentication with Google Provider
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const normalizedEmail = (fbUser.email || '').trim().toLowerCase();

      // Client-side whitelist validation
      if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth);
        setIsLoading(false);
        setErrorMsg(`Acesso Negado: A conta Google (${normalizedEmail}) não possui privilégios de administrador. Somente ${AUTHORIZED_ADMIN_EMAIL} tem acesso.`);
        return;
      }

      // Retrieve verified Firebase ID Token
      const idToken = await fbUser.getIdToken();

      // Validate with server
      const res = await fetch('/api/admin/verify-firebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        await signOut(auth);
        setIsLoading(false);
        setErrorMsg(data.error || 'Acesso negado pelo servidor.');
        return;
      }

      saveAdminSession(data.user);
      setSuccessMsg(`Bem-vindo, ${data.user.name}!`);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(data.user);
      }, 500);
    } catch (err: any) {
      setIsLoading(false);
      // Ignore user-cancelled popup
      if (
        err?.code === 'auth/popup-closed-by-user' ||
        err?.code === 'auth/cancelled-popup-request'
      ) {
        return;
      }
      console.error('Firebase Google Sign-In error:', err);
      setErrorMsg(err?.message || 'Falha na autenticação com o Google via Firebase.');
    }
  };

  // Handle password login
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/login-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: AUTHORIZED_ADMIN_EMAIL,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsLoading(false);
        setErrorMsg(data.error || 'Senha incorreta.');
        return;
      }

      saveAdminSession(data.user);
      setSuccessMsg('Acesso autorizado!');
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(data.user);
      }, 500);
    } catch {
      setIsLoading(false);
      setErrorMsg('Falha ao conectar ao servidor.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X size={16} />
        </button>

        {/* Minimal Header */}
        <div className="flex flex-col items-center text-center mb-6 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <Lock size={22} />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">Login do Administrador</h3>
          <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 font-mono">
            <span>{AUTHORIZED_ADMIN_EMAIL}</span>
          </div>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-start gap-2"
            >
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed text-[11px]">{errorMsg}</div>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2"
            >
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              <span className="text-[11px] font-medium">{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Provider Button via Firebase Auth */}
        <button
          type="button"
          disabled={isLoading}
          onClick={handleGoogleLogin}
          className="w-full py-3 px-4 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-zinc-950" />
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Entrar com Google</span>
            </>
          )}
        </button>

        {/* Minimal Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-[11px] text-zinc-500 uppercase">
            <span className="bg-zinc-950 px-2 font-medium">ou com senha</span>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-3">
          <input
            ref={passwordInputRef}
            type="password"
            placeholder="Senha de acesso..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 outline-none transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin text-zinc-950" />
            ) : (
              <>
                <span>Entrar no Painel</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Discreet Footer */}
        <p className="mt-4 text-center text-[10px] text-zinc-600">
          Acesso restrito e protegido • ID Criações
        </p>
      </motion.div>
    </div>
  );
}
