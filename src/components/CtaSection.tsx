import { MessageCircle, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';

export function CtaSection({ activeTheme }: { activeTheme: ThemeConfig }) {
  return (
    <section className={`py-16 ${activeTheme.sectionBg} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-[36px] p-10 sm:p-14 md:p-16 text-center ${activeTheme.ctaBg} overflow-hidden shadow-2xl`}>
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-3xl rounded-full pointer-events-none -z-0" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              <Sparkles size={15} />
              Pronto para Conquistar Mais Clientes?
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Transforme a presença digital da sua empresa hoje mesmo
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto font-normal">
              Receba atendimento prioritário, escolha o modelo ideal para seu nicho e tenha um site profissional gerando orçamentos no seu WhatsApp em até 72 horas.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noreferrer"
                className={`w-full sm:w-auto px-8 py-4 ${activeTheme.isLight ? 'bg-slate-950 text-white hover:bg-slate-900' : 'bg-white text-zinc-950 hover:bg-zinc-100'} font-black rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer`}
              >
                <MessageCircle size={20} className="stroke-[2.5]" />
                <span>Solicitar Proposta no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
