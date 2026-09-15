import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, MessageCircle, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { EditablePricingPlan } from '../admin/adminTypes';
import { ThemeConfig } from '../theme';

export function PricingSection({
  plans,
  onSelectPlan,
  activeTheme,
  isAdmin = false,
  inlineEditMode = false,
  onEditPlans
}: {
  plans: EditablePricingPlan[];
  onSelectPlan: (planName: string, setupPrice: string) => void;
  activeTheme: ThemeConfig;
  isAdmin?: boolean;
  inlineEditMode?: boolean;
  onEditPlans?: () => void;
}) {
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({});

  const toggleExpand = (planId: string) => {
    setExpandedPlans(prev => ({ ...prev, [planId]: !prev[planId] }));
  };

  return (
    <section id="planos" className={`py-24 ${activeTheme.sectionBg} relative overflow-hidden transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className={`px-3.5 py-1 ${activeTheme.accentPill} rounded-full text-xs font-bold uppercase tracking-wider`}>
              Investimento Transparente & Sem Surpresas
            </span>
            {isAdmin && inlineEditMode && onEditPlans && (
              <button
                type="button"
                onClick={onEditPlans}
                className={`inline-flex items-center gap-1.5 px-3 py-1 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} text-xs font-bold rounded-full ${activeTheme.accentShadow} transition-all cursor-pointer`}
              >
                <Edit size={13} />
                <span>Editar Planos (Admin)</span>
              </button>
            )}
          </div>
          <h2 className={`text-3xl md:text-5xl font-black ${activeTheme.textPrimary} tracking-tight mb-4`}>
            Planos com Desenvolvimento & Manutenção Inclusa
          </h2>
          <p className={`text-sm sm:text-base ${activeTheme.textSecondary}`}>
            Sem taxas escondidas. Criação sob medida, manutenção flexível, hospedagem inclusa e domínio à parte.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan, idx) => {
            const isPopular = plan.popular;
            const planKey = plan.id || String(idx);
            const isExpanded = !!expandedPlans[planKey];
            const displayedFeatures = isExpanded ? plan.features : plan.features.slice(0, 3);
            const hasMoreFeatures = plan.features.length > 3;

            return (
              <motion.div
                key={planKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between rounded-[32px] p-6 sm:p-7 transition-all duration-300 ${
                  isPopular
                    ? `${activeTheme.cardBg} border-2 ${activeTheme.accentBorder} ${activeTheme.accentShadow} lg:-translate-y-2`
                    : `${activeTheme.cardBg} border ${activeTheme.cardBorder} ${activeTheme.cardHoverBorder} ${activeTheme.cardHoverShadow}`
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1.5 ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5`}>
                      <Sparkles size={14} />
                      {plan.badge || 'Mais Escolhido'}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="mb-5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${activeTheme.accentText} block mb-1`}>
                      {plan.targetAudience}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs ${activeTheme.textMuted} mt-1.5 leading-relaxed`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Pricing Values Box */}
                  <div className={`p-4 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} mb-5 space-y-2.5`}>
                    {/* Criação */}
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${activeTheme.textMuted}`}>
                        Criação:
                      </span>
                      <div className="text-right">
                        <span className={`text-lg sm:text-xl font-black ${activeTheme.textPrimary} tracking-tight`}>
                          {plan.setupPrice}
                        </span>
                        {plan.setupPeriod && (
                          <span className={`block text-[11px] font-medium ${activeTheme.textMuted}`}>
                            ({plan.setupPeriod})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Divisor */}
                    <div className="border-t border-zinc-200/20 dark:border-zinc-800/50" />

                    {/* Manutenção */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold ${activeTheme.textMuted}`}>Manutenção:</span>
                      <span className={`font-bold ${activeTheme.accentText} text-right`}>
                        {plan.maintenancePrice}
                      </span>
                    </div>

                    {/* Domínio */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold ${activeTheme.textMuted}`}>Domínio:</span>
                      <span className={`font-medium ${activeTheme.textSecondary} text-right`}>
                        {plan.domainInfo || 'À parte'}
                      </span>
                    </div>

                    {/* Hospedagem */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-semibold ${activeTheme.textMuted}`}>Hospedagem:</span>
                      <span className="font-bold text-emerald-500 dark:text-emerald-400 text-right flex items-center gap-1">
                        <Check size={13} className="stroke-[3]" />
                        {plan.hostingInfo || 'Inclusa'}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <span className={`text-xs font-bold uppercase tracking-wider ${activeTheme.textPrimary} block mb-1.5`}>
                      O que está incluso:
                    </span>
                    {displayedFeatures.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check size={15} className={`${activeTheme.accentText} shrink-0 mt-0.5`} />
                        <span className={activeTheme.textSecondary}>{feature}</span>
                      </div>
                    ))}

                    {/* Expand/Collapse Toggle Button */}
                    {hasMoreFeatures && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(planKey)}
                        className={`mt-2 flex items-center gap-1 text-xs font-bold ${activeTheme.accentText} hover:underline cursor-pointer`}
                      >
                        {isExpanded ? (
                          <>
                            <span>Mostrar menos</span>
                            <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            <span>Ver todos os benefícios ({plan.features.length})</span>
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Button */}
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.name, plan.setupPrice)}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? `${activeTheme.accentBg} ${activeTheme.accentHoverBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} ${activeTheme.accentShadow} active:scale-98`
                      : `${activeTheme.btnSecondaryBg} ${activeTheme.btnSecondaryText} border ${activeTheme.btnSecondaryBorder} hover:border-current`
                  }`}
                >
                  <MessageCircle size={16} />
                  <span>{plan.ctaText || 'Contratar Este Plano'}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
