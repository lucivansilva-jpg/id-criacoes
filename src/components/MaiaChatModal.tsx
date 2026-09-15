import React, { useState, useEffect, Dispatch, SetStateAction, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Building2, 
  Briefcase, 
  Target, 
  PenTool, 
  ArrowRight, 
  MessageCircle, 
  X,
  Volume2,
  VolumeX,
  FileText
} from 'lucide-react';
import { WHATSAPP_BASE_URL } from '../data';
import { recordLead, incrementMetric } from '../admin/adminState';
import { ThemeConfig } from '../theme';
import { getNicheConsultingInsight } from './BriefingSection';

interface MaiaChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: ThemeConfig;
  formData: {
    companyName: string;
    industry: string;
    preferredModel: string;
    goal: string;
    notes: string;
  };
  setFormData: Dispatch<SetStateAction<{
    companyName: string;
    industry: string;
    preferredModel: string;
    goal: string;
    notes: string;
  }>>;
  initialMode?: 'ai' | 'form';
}

export function MaiaChatModal({
  isOpen,
  onClose,
  activeTheme,
  formData,
  setFormData,
  initialMode = 'ai'
}: MaiaChatModalProps) {
  const [briefingMode, setBriefingMode] = useState<'ai' | 'form'>(initialMode);
  const [aiStep, setAiStep] = useState<number>(0);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [consultingInsight, setConsultingInsight] = useState<ReturnType<typeof getNicheConsultingInsight> | null>(null);

  const [projectLogoStatus, setProjectLogoStatus] = useState<string>('');
  const [projectColorPref, setProjectColorPref] = useState<string>('');

  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Olá! Sou a Maia, a Consultora de IA da ID Criações 🚀. Estou conectada via Google Gemini para planejar a estrutura ideal para o seu site.\n\nPara começarmos: qual é o **Nome da sua Empresa, Marca ou Projeto**?'
    }
  ]);

  // Reset mode when opened
  useEffect(() => {
    if (isOpen) {
      setBriefingMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const speakText = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*_#`•]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignored
    }
  };

  const fetchGeminiResponse = async (history: Array<{ sender: 'ai' | 'user'; text: string }>, latestUserMsg: string, currentStep: number) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: history,
          userMessage: latestUserMsg,
        })
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.text) return data.text;
      }
    } catch {
      // Fallback
    }

    const cleanAnswer = latestUserMsg.trim();
    const currentCompany = formData.companyName || cleanAnswer || 'sua empresa';
    const isGreetingOnly = /^(ol[aá]|oi|bom dia|boa tarde|boa noite|e ai|e a[ií]|opa|hello|hi)[!., ]*$/i.test(cleanAnswer);

    if (currentStep === 0 && isGreetingOnly) {
      return `Olá! Que alegria falar com você! 😊\n\nSou a **Maia**, consultora da **ID Criações**. Me conta: qual é o **Nome da sua Empresa, Marca ou Projeto** para iniciarmos o diagnóstico?`;
    }

    if (currentStep === 0) {
      return `Prazer em conhecer a **${cleanAnswer}**! 🎉\n\nMe conte: qual é o **ramo de atuação, segmento ou ideia do seu negócio**? (Atendemos qualquer nicho: delivery, clínica, energia solar, advocacia, comércio, estética, etc.)`;
    } else if (currentStep === 1) {
      const insight = getNicheConsultingInsight(cleanAnswer, currentCompany);
      return `${insight.consultingMsg}\n\n📐 **Estrutura recomendada pela IA para ${insight.nicheTitle}:**\n• ${insight.structure}\n\nAgora sobre a sua identidade visual: você **já possui uma Logomarca pronta** ou gostaria que a ID Criações criasse uma para você?`;
    } else if (currentStep === 2) {
      const insight = consultingInsight || getNicheConsultingInsight(formData.industry, currentCompany);
      return `Perfeito! Anotei a informação sobre sua logomarca (${cleanAnswer}). 🎨\n\nVocê tem alguma **preferência de cores** para o site ou referências visuais que admira? (Sugestão para seu segmento: *${insight.colorRecommendation}*)`;
    } else if (currentStep === 3) {
      return `Excelente escolha visual! 📸\n\nEm relação ao conteúdo: você **possui fotos reais dos seus produtos/serviços**, ou prefere que utilizemos imagens profissionais de banco de imagens de alta definição?`;
    } else {
      const insight = consultingInsight || getNicheConsultingInsight(formData.industry, currentCompany);
      return `✨ **Briefing Consultivo Concluído com Sucesso!**\n\nOrganizamos todo o diagnóstico estratégico da **${formData.companyName || 'sua empresa'}** (${formData.industry || 'Nicho informado'}):\n• **Estrutura Recomendada:** ${insight.structure}\n• **Logomarca:** ${projectLogoStatus || 'A combinar'}\n• **Cores / Estilo:** ${projectColorPref || 'Cores do nicho'}\n• **Fotos / Imagens:** ${cleanAnswer}\n\n📱 *Observação:* Você pode enviar seus arquivos diretamente no **WhatsApp** ao clicar no botão verde abaixo! 🚀`;
    }
  };

  const handleUserAnswer = async (answerText: string) => {
    if (!answerText.trim() || isAiTyping) return;
    const cleanAnswer = answerText.trim();

    const updatedHistory = [...chatHistory, { sender: 'user' as const, text: cleanAnswer }];
    setChatHistory(updatedHistory);
    setChatInput('');
    setIsAiTyping(true);

    const isGreeting = /^(ol[aá]|oi|bom dia|boa tarde|boa noite|e ai|e a[ií]|opa|hello|hi)[!., ]*$/i.test(cleanAnswer);
    let nextStep = aiStep;

    if (aiStep === 0) {
      if (!isGreeting) {
        setFormData(prev => ({ ...prev, companyName: cleanAnswer }));
        nextStep = 1;
      }
    } else if (aiStep === 1) {
      const insight = getNicheConsultingInsight(cleanAnswer, formData.companyName);
      setConsultingInsight(insight);
      setFormData(prev => ({
        ...prev,
        industry: cleanAnswer,
        notes: prev.notes ? `${prev.notes} | Nicho: ${cleanAnswer}` : `Nicho: ${cleanAnswer}`
      }));
      nextStep = 2;
    } else if (aiStep === 2) {
      setProjectLogoStatus(cleanAnswer);
      setFormData(prev => ({
        ...prev,
        notes: `${prev.notes || ''} | Logo: ${cleanAnswer}`.trim()
      }));
      nextStep = 3;
    } else if (aiStep === 3) {
      setProjectColorPref(cleanAnswer);
      setFormData(prev => ({
        ...prev,
        notes: `${prev.notes || ''} | Cores: ${cleanAnswer}`.trim()
      }));
      nextStep = 4;
    } else if (aiStep === 4) {
      setFormData(prev => ({
        ...prev,
        notes: `${prev.notes || ''} | Fotos: ${cleanAnswer}`.trim()
      }));
      nextStep = 5;
    }

    setAiStep(nextStep);

    try {
      const reply = await fetchGeminiResponse(updatedHistory, cleanAnswer, aiStep);
      setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
      speakText(reply);
    } catch {
      const fallback = 'Recebido! Vamos continuar estruturando seu projeto com excelência.';
      setChatHistory(prev => [...prev, { sender: 'ai', text: fallback }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const restartChat = () => {
    setAiStep(0);
    setChatInput('');
    setConsultingInsight(null);
    setProjectLogoStatus('');
    setProjectColorPref('');
    setChatHistory([
      {
        sender: 'ai',
        text: 'Vamos recomeçar! 🚀 Me informe o **Nome da sua Empresa ou Projeto** para iniciarmos um novo diagnóstico.'
      }
    ]);
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      `*Olá, equipe ID Criações! Acabei de planejar o briefing do meu site com a IA Maia.*`,
      ``,
      `*Empresa:* ${formData.companyName || 'Não informada'}`,
      `*Segmento:* ${formData.industry || 'Não informado'}`,
      formData.preferredModel ? `*Modelo/Plano:* ${formData.preferredModel}` : null,
      formData.goal ? `*Objetivo:* ${formData.goal}` : null,
      consultingInsight ? `*Estrutura Sugerida:* ${consultingInsight.structure}` : null,
      formData.notes ? `*Observações:* ${formData.notes}` : null,
      ``,
      `Gostaria de tirar dúvidas e dar continuidade à criação do meu site!`
    ].filter(Boolean);

    return encodeURIComponent(lines.join('\n'));
  };

  const handleSendWhatsApp = () => {
    recordLead({
      companyName: formData.companyName || 'Lead Maia IA',
      industry: formData.industry || 'Site',
      preferredModel: formData.preferredModel || 'Briefing IA',
      goal: formData.goal,
      notes: formData.notes,
      source: 'chat'
    });
    incrementMetric('whatsappClicks');
    const url = `${WHATSAPP_BASE_URL}?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendWhatsApp();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-3xl ${activeTheme.cardBg} border ${activeTheme.cardBorder} rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] z-10`}
        >
          {/* Top Bar */}
          <div className={`px-6 py-4 border-b ${activeTheme.cardBorder} flex items-center justify-between gap-4 shrink-0`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl ${activeTheme.accentBg} flex items-center justify-center ${activeTheme.accentShadow} shrink-0`}>
                <Bot size={22} className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-black text-sm sm:text-base ${activeTheme.textPrimary}`}>
                    Maia • Consultora de IA
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className={`text-[11px] ${activeTheme.textMuted}`}>
                  Powered by Google Gemini • ID Criações
                </p>
              </div>
            </div>

            {/* Actions: Sound, Restart, Close */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  soundEnabled
                    ? `${activeTheme.accentPill} border-current`
                    : `${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} ${activeTheme.textMuted} hover:${activeTheme.textPrimary}`
                }`}
                title={soundEnabled ? 'Desativar voz sintetizada' : 'Ativar voz sintetizada'}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                type="button"
                onClick={restartChat}
                className={`p-2 rounded-xl text-xs font-semibold border ${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} ${activeTheme.textMuted} hover:${activeTheme.textPrimary} transition-all cursor-pointer`}
                title="Reiniciar conversa"
              >
                <RefreshCw size={16} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-xl text-xs font-semibold border ${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} ${activeTheme.textMuted} hover:${activeTheme.textPrimary} transition-all cursor-pointer ml-1`}
                title="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className={`px-6 py-2.5 bg-black/10 border-b ${activeTheme.cardBorder} flex items-center justify-between gap-2 shrink-0`}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBriefingMode('ai')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  briefingMode === 'ai'
                    ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} shadow-sm`
                    : `${activeTheme.textMuted} hover:${activeTheme.textPrimary}`
                }`}
              >
                Chat com Maia (IA)
              </button>
              <button
                type="button"
                onClick={() => setBriefingMode('form')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  briefingMode === 'form'
                    ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} shadow-sm`
                    : `${activeTheme.textMuted} hover:${activeTheme.textPrimary}`
                }`}
              >
                Formulário Direto
              </button>
            </div>

            <span className={`text-[11px] ${activeTheme.textMuted} hidden sm:inline`}>
              Etapa {aiStep + 1} de 5
            </span>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {briefingMode === 'ai' ? (
              <>
                {chatHistory.map((msg, index) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div
                      key={index}
                      className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAi && (
                        <div className={`w-8 h-8 rounded-xl ${activeTheme.accentBg} flex items-center justify-center shrink-0 mt-1 shadow-xs`}>
                          <Sparkles size={14} className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                          isAi
                            ? `${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} ${activeTheme.textPrimary}`
                            : `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-medium`
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {isAiTyping && (
                  <div className="flex gap-3 items-center">
                    <div className={`w-8 h-8 rounded-xl ${activeTheme.accentBg} flex items-center justify-center shrink-0`}>
                      <Bot size={14} className={activeTheme.isLight ? 'text-white' : 'text-zinc-950'} />
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl ${activeTheme.cardBgSubtle} border ${activeTheme.cardBorder} text-xs ${activeTheme.textMuted} flex items-center gap-2`}>
                      <span className="animate-pulse">Maia está analisando seu nicho...</span>
                    </div>
                  </div>
                )}

                {/* Suggestions Pills during AI chat */}
                {aiStep === 1 && !isAiTyping && (
                  <div className="pt-2">
                    <span className={`text-[11px] font-bold ${activeTheme.textMuted} block mb-1.5`}>
                      Sugestões de Segmento:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Delivery & Gastronomia', 'Energia Solar', 'Clínica & Odontologia', 'Advocacia', 'Pet Shop', 'Artesanato', 'Comércio Local'].map((niche) => (
                        <button
                          key={niche}
                          type="button"
                          onClick={() => handleUserAnswer(niche)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold border ${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} transition-all cursor-pointer`}
                        >
                          {niche}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {aiStep === 2 && !isAiTyping && (
                  <div className="pt-2">
                    <span className={`text-[11px] font-bold ${activeTheme.textMuted} block mb-1.5`}>
                      Sobre seu logotipo:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Já possuo logotipo pronto em alta qualidade',
                        'Não tenho logo, quero que a ID Criações crie',
                        'Tenho apenas uma ideia / rascunho'
                      ].map((ans) => (
                        <button
                          key={ans}
                          type="button"
                          onClick={() => handleUserAnswer(ans)}
                          className={`px-3 py-1 rounded-xl text-xs font-semibold border ${activeTheme.cardBgSubtle} ${activeTheme.cardBorder} ${activeTheme.textSecondary} hover:${activeTheme.textPrimary} transition-all cursor-pointer`}
                        >
                          {ans}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Final step WhatsApp button */}
                {aiStep >= 5 && !isAiTyping && (
                  <div className="pt-4 border-t border-emerald-500/20">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={20} />
                      <span>Enviar Briefing Completo para o WhatsApp da Equipe</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* FORM MODE */
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <Building2 size={14} className={activeTheme.accentText} />
                    <span>Nome da Empresa / Marca *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lumina Odontologia"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.inputText} text-xs sm:text-sm outline-none`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <Briefcase size={14} className={activeTheme.accentText} />
                    <span>Ramo de Atuação / Segmento *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Energia Solar, Delivery, Advocacia, Clínica..."
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.inputText} text-xs sm:text-sm outline-none`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <Target size={14} className={activeTheme.accentText} />
                    <span>Objetivo Principal</span>
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.inputText} text-xs sm:text-sm outline-none`}
                  >
                    <option value="Receber Orçamentos no WhatsApp">Receber Orçamentos no WhatsApp</option>
                    <option value="Agendar Consultas / Atendimentos">Agendar Consultas / Atendimentos</option>
                    <option value="Vender Produtos / Encomendas">Vender Produtos / Encomendas</option>
                    <option value="Apresentar Catálogo / Portfólio">Apresentar Catálogo / Portfólio</option>
                    <option value="Fortalecer Autoridade e Marca">Fortalecer Autoridade e Marca</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-bold ${activeTheme.textPrimary} flex items-center gap-1.5`}>
                    <PenTool size={14} className={activeTheme.accentText} />
                    <span>Observações / Cores / Detalhes</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Quero tons de azul e dourado; já possuo logotipo; fotos de trabalhos reais..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.inputText} text-xs sm:text-sm outline-none resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!formData.companyName.trim() || !formData.industry.trim()}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                    formData.companyName.trim() && formData.industry.trim()
                      ? `${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} cursor-pointer`
                      : 'bg-zinc-800 text-zinc-500 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} />
                  <span>Enviar Briefing via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

          {/* Footer Input Bar (only in AI mode) */}
          {briefingMode === 'ai' && (
            <div className={`p-4 border-t ${activeTheme.cardBorder} bg-black/10 shrink-0`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserAnswer(chatInput);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={
                    aiStep === 0
                      ? 'Digite o nome da sua empresa...'
                      : aiStep === 1
                      ? 'Qual o ramo ou segmento?'
                      : 'Digite sua resposta para a Maia...'
                  }
                  className={`flex-1 px-4 py-3 rounded-xl ${activeTheme.inputBg} border ${activeTheme.inputBorder} ${activeTheme.inputText} ${activeTheme.inputPlaceholder} text-xs sm:text-sm outline-none`}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isAiTyping}
                  className={`p-3 rounded-xl ${activeTheme.accentBg} ${activeTheme.isLight ? 'text-white' : 'text-zinc-950'} font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md`}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
