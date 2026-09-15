import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { ThemeConfig } from '../theme';
import { WHATSAPP_BASE_URL } from '../data';

export function FAQSection({ activeTheme }: { activeTheme: ThemeConfig }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Quanto tempo leva para o meu site ficar pronto e publicado?',
      a: 'Nosso prazo padrão para modelos da vitrine ou landing pages personalizadas é de 48h a 72h úteis após o envio das informações básicas (textos, logo e fotos). Projetos complexos com catálogo e delivery levam em média de 4 a 7 dias úteis.'
    },
    {
      q: 'Como funciona o investimento único e os custos de manutenção?',
      a: 'O valor de desenvolvimento é pago apenas uma vez para a criação, design e programação do site. Nos planos Essencial e Landing Page, não há qualquer mensalidade fixa obrigatória. Nos planos com suporte contínuo (Catálogo & Delivery e Site Institucional), a manutenção cobre hospedagem em nuvem, certificado SSL grátis, backups e atualizações contínuas.'
    },
    {
      q: 'Eu preciso ter um domínio próprio (ex: www.minhaempresa.com.br)?',
      a: 'Sim, recomendamos ter seu domínio próprio para transmitir máxima credibilidade à sua marca. O registro do domínio é contratado à parte e nós realizamos 100% da configuração técnica de DNS e apontamento de servidores para você sem nenhum custo adicional.'
    },
    {
      q: 'O site funciona perfeitamente em celulares e no WhatsApp?',
      a: 'Com certeza! Mais de 85% dos acessos de clientes acontecem em smartphones. Todos os nossos sites são desenhados com metodologia Mobile-First, carregam em menos de 1 segundo e contam com botões inteligentes que direcionam o cliente para o seu WhatsApp com mensagem pré-formatada para fechar negócios.'
    }
  ];

  return (
    <section id="faq" className={`py-24 scroll-mt-28 ${activeTheme.sectionBg} relative overflow-hidden transition-colors`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
            Dúvidas Frequentes
          </span>
          <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-4`}>
            Perguntas Frequentes sobre Nossos Sites
          </h2>
          <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
            Tudo o que você precisa saber para dar o próximo passo rumo à presença digital profissional da sua empresa.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? `${activeTheme.cardBg} ${activeTheme.accentBorder} shadow-lg`
                    : `${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} hover:border-current`
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-base sm:text-lg font-bold ${isOpen ? activeTheme.accentText : activeTheme.textPrimary} transition-colors`}>
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${isOpen ? `${activeTheme.accentPill} rotate-180` : `${activeTheme.btnSecondaryBg} ${activeTheme.textMuted}`}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className={`px-6 pb-6 pt-2 text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed border-t ${activeTheme.cardBorder}`}>
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className={`mt-12 p-8 rounded-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left`}>
          <div>
            <h4 className={`text-lg font-bold ${activeTheme.textPrimary}`}>
              Ainda tem alguma dúvida específica?
            </h4>
            <p className={`text-xs sm:text-sm ${activeTheme.textMuted} mt-1`}>
              Nosso time está pronto para esclarecer qualquer detalhe técnico ou comercial pelo WhatsApp.
            </p>
          </div>
          <a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noreferrer"
            className={`px-6 py-3.5 ${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold rounded-xl text-xs sm:text-sm transition-all ${activeTheme.accentShadow} active:scale-95 flex items-center gap-2 shrink-0`}
          >
            <MessageCircle size={16} />
            <span>Tirar Dúvida no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
