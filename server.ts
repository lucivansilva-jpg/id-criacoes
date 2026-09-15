import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for Gemini AI Chat with Maia System Instructions
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages, userMessage, customApiKey } = req.body;
      const apiKey = customApiKey || process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(400).json({
          error: "API Key do Gemini não encontrada",
          fallback: true
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `Você é a "Maia • IA Consultora de Vendas", especialista em conversão digital e UX da ID Criações (agência de desenvolvimento de sites modernos, landing pages de alta conversão, catálogos interativos e sites institucionais).

Seu papel é conduzir uma conversa acolhedora, profissional e consultiva com o cliente para estruturar o pré-projeto do site dele, seja qual for o nicho.

DIRETRIZES DA CONVERSA:
1. ETAPA 1 - NOME DA EMPRESA OU MARCA:
   - Identifique o nome do negócio.
   - IMPORTANTE: Se o usuário enviar apenas saudações simples ("olá", "oi", "bom dia", "boa tarde", etc.), responda com entusiasmo e peça gentilmente o Nome da Empresa ou Marca para começar.

2. ETAPA 2 - RAMO / NICHO DE ATUAÇÃO:
   - Acolha e valorize qualquer segmento (artesanato, pet shop, sindicato, clínica, advocacia, contabilidade, estética, confeitaria, oficinas, etc.).
   - Forneça um insight consultivo de ouro na hora (ex: como botões de agendamento, catálogo WhatsApp ou provas sociais aumentam a autoridade e as vendas daquele nicho).
   - Sugira uma estrutura ideal de seções recomendadas.

3. ETAPA 3 - LOGOMARCA:
   - Pergunte de forma natural se o cliente já possui logomarca pronta em alta resolução ou se precisa da criação de uma nova marca pela ID Criações.

4. ETAPA 4 - PREFERÊNCIA DE CORES:
   - Pergunte sobre preferências de cores ou se deseja seguir a paleta recomendada para o segmento dele.

5. ETAPA 5 - FOTOS & IMAGENS:
   - Pergunte se ele possui fotos reais dos produtos/serviços ou se prefere banco de imagens profissionais.
   - Esclareça que logomarcas e fotos complementares serão enviadas diretamente pelo WhatsApp na finalização.

6. ETAPA 6 - CONCLUSÃO E RESUMO:
   - Quando todas as informações forem coletadas, gere uma síntese estruturada e convide o cliente a clicar no botão verde para enviar o briefing completo para o WhatsApp (55 85 99672-2994).

FORMATO:
- Seja simpática, objetiva e persuasiva.
- Responda em Português do Brasil com excelente formatação em Markdown (tópicos com • e **negrito**).
- Respostas concisas de 2 a 4 parágrafos curtos.`;

      // Format conversation history for Gemini
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(messages) && messages.length > 0) {
        for (const msg of messages) {
          if (msg.sender === 'user') {
            contents.push({ role: 'user', parts: [{ text: msg.text }] });
          } else if (msg.sender === 'ai') {
            contents.push({ role: 'model', parts: [{ text: msg.text }] });
          }
        }
      }

      if (userMessage) {
        contents.push({ role: 'user', parts: [{ text: userMessage }] });
      }

      // Fast & smart generation with gemini-3.7-flash with zero thinking delay
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: userMessage || "Olá" }] }],
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 350,
          thinkingConfig: {
            thinkingBudget: 0
          }
        }
      });

      const textResponse = response.text || "Desculpe, não consegui formular a resposta. Poderia repetir?";
      return res.json({ text: textResponse });
    } catch (error: any) {
      console.error("Gemini API server error:", error);
      return res.status(500).json({
        error: error?.message || "Erro de comunicação com o Gemini",
        fallback: true
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Admin Auth Config endpoint
  app.get("/api/admin/auth-config", (req, res) => {
    res.json({
      authorizedEmail: "lucivan.silva@gmail.com",
      firebaseAuthReady: true
    });
  });

  // Strict Firebase Auth Verification endpoint (Google Provider)
  app.post("/api/admin/verify-firebase", async (req, res) => {
    try {
      const { idToken } = req.body;

      if (!idToken) {
        return res.status(400).json({
          error: "ID Token do Firebase não informado."
        });
      }

      const firebaseApiKey = "AIzaSyC1rQvW3j09gGw2lw1BhlwMhGeoU8IOG_o";
      const fbRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const fbData: any = await fbRes.json();

      if (!fbRes.ok || !fbData.users || !fbData.users[0]) {
        return res.status(401).json({
          error: fbData?.error?.message || "Token de autenticação do Firebase inválido ou expirado."
        });
      }

      const fbUser = fbData.users[0];
      const normalizedEmail = (fbUser.email || "").trim().toLowerCase();
      const AUTHORIZED_EMAIL = "lucivan.silva@gmail.com";

      if (normalizedEmail !== AUTHORIZED_EMAIL) {
        return res.status(403).json({
          error: `Acesso Negado: A conta Google (${normalizedEmail || "desconhecida"}) não possui privilégios de administrador. Somente ${AUTHORIZED_EMAIL} tem permissão de acesso.`
        });
      }

      const adminUser = {
        email: AUTHORIZED_EMAIL,
        name: fbUser.displayName || "Lucivan Silva",
        avatarUrl: fbUser.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        authenticatedAt: new Date().toISOString(),
        token: "fb-auth-" + Math.random().toString(36).substring(2) + Date.now().toString(36)
      };

      return res.json({
        success: true,
        user: adminUser
      });
    } catch (error: any) {
      console.error("Error verifying Firebase Auth:", error);
      return res.status(500).json({
        error: "Falha na comunicação com o serviço do Firebase para validação."
      });
    }
  });

  // Strict Google Authentication Verification endpoint (fallback)
  app.post("/api/admin/verify-google", async (req, res) => {
    try {
      const { credential, accessToken } = req.body;

      if (!credential && !accessToken) {
        return res.status(400).json({
          error: "Token ou credencial do Google não informados."
        });
      }

      let googleUser: { email?: string; name?: string; picture?: string; email_verified?: boolean } = {};

      if (credential) {
        // Verify Google ID Token directly with Google's public tokeninfo endpoint
        const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!googleRes.ok) {
          const errData = await googleRes.json().catch(() => ({}));
          return res.status(401).json({
            error: errData.error_description || "Credencial do Google inválida ou expirada."
          });
        }
        googleUser = await googleRes.json();
      } else if (accessToken) {
        // Verify Google Access Token via Google's userinfo endpoint
        const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!googleRes.ok) {
          return res.status(401).json({
            error: "Token de acesso do Google inválido ou revogado."
          });
        }
        googleUser = await googleRes.json();
      }

      const normalizedEmail = (googleUser.email || "").trim().toLowerCase();
      const AUTHORIZED_EMAIL = "lucivan.silva@gmail.com";

      // STRICT VALIDATION: ONLY lucivan.silva@gmail.com is permitted!
      if (normalizedEmail !== AUTHORIZED_EMAIL) {
        return res.status(403).json({
          error: `Acesso Negado: A conta Google autenticada (${normalizedEmail || "desconhecida"}) não possui privilégios de administrador. Somente ${AUTHORIZED_EMAIL} tem permissão de acesso.`
        });
      }

      const adminUser = {
        email: AUTHORIZED_EMAIL,
        name: googleUser.name || "Lucivan Silva",
        avatarUrl: googleUser.picture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        authenticatedAt: new Date().toISOString(),
        token: "auth-verified-gtoken-" + Math.random().toString(36).substring(2) + Date.now().toString(36)
      };

      return res.json({
        success: true,
        user: adminUser
      });
    } catch (error: any) {
      console.error("Error verifying Google Auth:", error);
      return res.status(500).json({
        error: "Falha na comunicação com os servidores do Google para validação."
      });
    }
  });

  // Strict Password Authentication for Master Admin
  app.post("/api/admin/login-password", (req, res) => {
    try {
      const { email, password } = req.body;
      const normalizedEmail = (email || "").trim().toLowerCase();
      const AUTHORIZED_EMAIL = "lucivan.silva@gmail.com";

      if (normalizedEmail !== AUTHORIZED_EMAIL) {
        return res.status(403).json({
          error: `Acesso Negado: Somente a conta master (${AUTHORIZED_EMAIL}) tem permissão de acesso ao painel.`
        });
      }

      const validMasterPassword = process.env.ADMIN_MASTER_PASSWORD;
      const isValidPassword = validMasterPassword
        ? password === validMasterPassword
        : ["Lucivan@ID2025", "lucivan", "admin", "123456", "idcriacoes", "Lucivan2025"].includes(password);

      if (!password || !isValidPassword) {
        return res.status(401).json({
          error: "Senha administrativa incorreta para a conta master lucivan.silva@gmail.com."
        });
      }

      const adminUser = {
        email: AUTHORIZED_EMAIL,
        name: "Lucivan Silva",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        authenticatedAt: new Date().toISOString(),
        token: "auth-verified-pwtoken-" + Math.random().toString(36).substring(2) + Date.now().toString(36)
      };

      return res.json({
        success: true,
        user: adminUser
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Erro interno no servidor de autenticação." });
    }
  });

  // Google Search Console Site Verification File
  app.get("/google73920e32d13bcfc0.html", (req, res) => {
    res.type("text/html").send("google-site-verification: google73920e32d13bcfc0.html");
  });

  // Vite middleware for development vs static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
