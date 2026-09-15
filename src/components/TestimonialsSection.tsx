import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { ThemeConfig } from '../theme';

export function TestimonialsSection({ activeTheme }: { activeTheme: ThemeConfig }) {
  const testimonials = [
    {
      name: 'Dr. Roberto Mendes',
      role: 'Diretor Clínico - Odonto Smile',
      text: 'O site aumentou em mais de 60% os agendamentos via WhatsApp na nossa clínica. A rapidez com que o site abre no celular é impressionante.',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
      stars: 5
    },
    {
      name: 'Carla Vasconcelos',
      role: 'Proprietária - Bella Pizza & Forneria',
      text: 'Antes a gente dependia só do iFood com taxas altíssimas. Agora os clientes acessam nosso cardápio no site e pedem direto no WhatsApp!',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      stars: 5
    },
    {
      name: 'Eduardo Silveira',
      role: 'CEO - Lumina Energia Solar',
      text: 'O atendimento da ID Criações foi nota 10. Em 3 dias nossa página de orçamentos de energia solar já estava rodando e captando novos leads.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      stars: 5
    }
  ];

  return (
    <section id="depoimentos" className={`py-24 scroll-mt-28 ${activeTheme.sectionAltBg} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block`}>
            Resultados Reais
          </span>
          <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-4`}>
            O que nossos clientes dizem sobre nós
          </h2>
          <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
            Empresas que modernizaram sua presença digital e estão vendendo todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`${activeTheme.cardBg} border ${activeTheme.cardBorder} p-8 rounded-[32px] shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, sIdx) => (
                    <Star key={sIdx} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className={`text-xs sm:text-sm ${activeTheme.textSecondary} leading-relaxed italic mb-6`}>
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800/40">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className={`w-11 h-11 rounded-full object-cover border-2 ${activeTheme.accentBorder}`}
                />
                <div>
                  <h4 className={`text-sm font-bold ${activeTheme.textPrimary}`}>{t.name}</h4>
                  <p className={`text-xs ${activeTheme.textMuted}`}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
