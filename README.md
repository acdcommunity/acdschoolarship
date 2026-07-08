# ACD Community — Site Oficial

Site institucional da ACD Community: bolsas de estudo, serviços de tradução e
tratamento de documentos, agendamentos, vistos e contactos — com integração
directa para WhatsApp.

## Estrutura do projeto

```
.
├── index.html          → página principal (não precisa de editar para o dia-a-dia)
├── css/style.css        → estilos visuais do site
├── js/
│   ├── data.js          → ⭐ FICHEIRO A EDITAR — bolsas, preços, contactos, redes sociais
│   └── main.js           → lê data.js e monta a página (não precisa de editar)
├── assets/logo.png       → logótipo
├── robots.txt             → indicações para motores de busca (Google, etc.)
└── .github/workflows/deploy.yml → publica o site automaticamente no GitHub Pages
```

## Como actualizar o conteúdo do dia-a-dia

Abra **`js/data.js`** num editor de texto simples (Bloco de Notas, VS Code, etc.):

- **Bolsas de estudo** → lista `BOLSAS`. Mude `status`, `priceMin`/`priceMax`,
  ou `active: false` para esconder uma bolsa sem a apagar.
- **Serviços e preços** → lista `SERVICOS`.
- **Contactos e redes sociais** → objecto `CONTACTOS`.
- **Avisos gerais** (desconto, urgência) → objecto `AVISOS`.

Depois de editar, guarde o ficheiro, faça `commit` + `push` para o GitHub
(ver abaixo) e o site actualiza-se sozinho em 1–2 minutos.

## Publicar no GitHub Pages (gratuito)

1. Crie um repositório novo no GitHub, por exemplo `acd-community-site`.
2. Envie todos estes ficheiros para o repositório:
   ```bash
   git init
   git add .
   git commit -m "Site ACD Community"
   git branch -M main
   git remote add origin https://github.com/SEU-UTILIZADOR/acd-community-site.git
   git push -u origin main
   ```
3. No GitHub, vá a **Settings → Pages → Build and deployment → Source** e
   escolha **GitHub Actions** (o workflow em `.github/workflows/deploy.yml`
   já está pronto e publica automaticamente a cada `push` na branch `main`).
4. Ao fim de alguns minutos o site fica disponível em:
   `https://SEU-UTILIZADOR.github.io/acd-community-site/`

### Domínio próprio (opcional)

Se tiver um domínio (ex: `acdcommunity.com`), crie um ficheiro `CNAME` na
raiz do repositório com o domínio dentro, e configure o DNS do domínio a
apontar para o GitHub Pages, conforme a documentação oficial:
https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Publicar noutros serviços (alternativa ao GitHub Pages)

O site é **estático** (HTML/CSS/JS puro), por isso funciona em qualquer
serviço de hospedagem sem configuração adicional:

- **Netlify** → arraste a pasta do projeto para app.netlify.com/drop, ou
  ligue o repositório do GitHub para publicação automática.
- **Vercel** → `vercel.com/new`, importe o repositório do GitHub.
- **Hospedagem tradicional (cPanel, etc.)** → copie todos os ficheiros para
  a pasta `public_html` (ou equivalente) via FTP.

Em qualquer um destes casos, não é preciso "build" nem instalar nada —
basta copiar os ficheiros tal como estão.

## Antes de publicar em produção — checklist

- [ ] Confirmar todos os preços e bolsas em `js/data.js`
- [ ] Confirmar número de WhatsApp em `CONTACTOS.whatsappNumero`
- [ ] Substituir `SEU-DOMINIO-AQUI` em `robots.txt` pelo domínio final do site
- [ ] Testar os botões "Obter serviço" no telemóvel (abrem o WhatsApp correctamente)
- [ ] Testar o site em ecrã de telemóvel (o menu deve abrir/fechar correctamente)
