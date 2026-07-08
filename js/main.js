/* ==========================================================================
   ACD COMMUNITY — main.js
   Não precisa de editar este ficheiro. Toda a informação vem de data.js.
   ========================================================================== */

const fmt = kz => kz > 0 ? kz.toLocaleString("pt-PT") + " Kz" : "Sob consulta";

const statusLabel = {
  aberta: "Inscrições abertas",
  processando: "A processar",
  brevemente: "Brevemente",
  encerrada: "Prazo encerrado"
};

function whatsappLink(text){
  const base = `https://wa.me/${CONTACTOS.whatsappNumero}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/* Calcula o estado real da bolsa: se houver prazo e já passou, força "encerrada" */
function estadoDaBolsa(b){
  if(b.prazo){
    const hoje = new Date();
    const limite = new Date(b.prazo + "T23:59:59");
    if(hoje > limite) return "encerrada";
  }
  return b.status || "processando";
}

function formatarPrazo(prazo){
  if(!prazo) return "";
  const d = new Date(prazo + "T00:00:00");
  return d.toLocaleDateString("pt-PT", { day:"2-digit", month:"long", year:"numeric" });
}

function listaHtml(itens){
  if(!itens || !itens.length) return "";
  return `<ul>${itens.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

/* ---------- Bolsas ---------- */
function renderBolsas(){
  const grid = document.getElementById("bolsas-grid");
  const hoje = new Date().toLocaleDateString("pt-PT", { day:"2-digit", month:"short" });

  grid.innerHTML = BOLSAS.filter(b => b.active).map((b, i) => {
    const estado = estadoDaBolsa(b);
    return `
    <article class="bolsa-card reveal">
      <div class="top">
        <h3>${b.pais}${b.programa ? `<small class="programa">${b.programa}</small>` : ""}</h3>
        <span class="status-pill status-${estado}">${statusLabel[estado] || estado}</span>
      </div>
      ${b.nivel ? `<div class="meta-row">${b.nivel}${b.vagas ? ` · ${b.vagas} vagas` : ""}</div>` : ""}
      ${b.prazo ? `<div class="meta-row prazo">Prazo: ${formatarPrazo(b.prazo)}</div>` : ""}
      <div class="preco">${fmt(b.priceMin)} — ${fmt(b.priceMax)}</div>
      <p class="nota">${b.nota || ""}</p>
      <div class="card-ctas">
        ${(b.beneficios || b.requisitos || b.documentos) ? `<button class="btn btn-outline btn-sm" data-open-bolsa="${i}">Ver detalhes</button>` : ""}
        <a class="btn btn-whats btn-sm" target="_blank" rel="noopener"
           href="${whatsappLink('Olá! Gostaria de mais informação sobre a bolsa de estudo para ' + b.pais + (b.programa ? ' (' + b.programa + ')' : '') + '.')}">
          Inscrever-me →
        </a>
      </div>
      <div class="updated"><span class="dot"></span> actualizado — ${hoje}</div>
    </article>
  `;}).join("");

  grid.querySelectorAll("[data-open-bolsa]").forEach(btn => {
    btn.addEventListener("click", () => abrirModalBolsa(BOLSAS.filter(b => b.active)[Number(btn.dataset.openBolsa)]));
  });
}

/* ---------- Modal de detalhes da bolsa ---------- */
function abrirModalBolsa(b){
  const overlay = document.getElementById("bolsa-modal");
  const estado = estadoDaBolsa(b);
  document.getElementById("bolsa-modal-body").innerHTML = `
    <span class="status-pill status-${estado}">${statusLabel[estado] || estado}</span>
    <h2>${b.pais}${b.programa ? ` — ${b.programa}` : ""}</h2>
    ${b.nivel ? `<p><strong>Nível:</strong> ${b.nivel}</p>` : ""}
    <div class="modal-meta">
      ${b.vagas ? `<div><strong>${b.vagas}</strong><span>vagas</span></div>` : ""}
      ${b.financiamento ? `<div><strong>${b.financiamento}</strong><span>financiamento</span></div>` : ""}
      ${b.prazo ? `<div><strong>${formatarPrazo(b.prazo)}</strong><span>prazo</span></div>` : ""}
    </div>
    ${b.nota ? `<p>${b.nota}</p>` : ""}
    ${b.beneficios ? `<h4>Benefícios</h4>${listaHtml(b.beneficios)}` : ""}
    ${b.areas ? `<h4>Áreas prioritárias</h4>${listaHtml(b.areas)}` : ""}
    ${b.requisitos ? `<h4>Requisitos</h4>${listaHtml(b.requisitos)}` : ""}
    ${b.documentos ? `<h4>Documentos necessários</h4>${listaHtml(b.documentos)}` : ""}
    ${b.observacao ? `<div class="modal-obs"><strong>Importante:</strong> ${b.observacao}</div>` : ""}
    <div class="modal-links">
      ${b.emailEnvio ? `<a href="mailto:${b.emailEnvio}">✉ ${b.emailEnvio}</a>` : ""}
      ${b.linkFormulario ? `<a href="${b.linkFormulario}" target="_blank" rel="noopener">Formulário de candidatura →</a>` : ""}
      ${b.linkInfo ? `<a href="${b.linkInfo}" target="_blank" rel="noopener">Edital / mais informações →</a>` : ""}
    </div>
    <a class="btn btn-whats" target="_blank" rel="noopener"
       href="${whatsappLink('Olá! Preciso de ajuda com a candidatura à bolsa de ' + b.pais + (b.programa ? ' (' + b.programa + ')' : '') + '.')}">
      Pedir ajuda no WhatsApp
    </a>
  `;
  overlay.classList.add("open");
}

function initModal(){
  const overlay = document.getElementById("bolsa-modal");
  overlay.addEventListener("click", e => {
    if(e.target === overlay || e.target.closest("[data-close-modal]")) overlay.classList.remove("open");
  });
  document.addEventListener("keydown", e => { if(e.key === "Escape") overlay.classList.remove("open"); });
}

/* ---------- Serviços ---------- */
function renderServicos(){
  const tabs = document.getElementById("servicos-tabs");
  const panel = document.getElementById("servicos-panel");

  tabs.innerHTML = SERVICOS.map((cat, i) => `
    <button class="tab-btn ${i === 0 ? "active" : ""}" data-index="${i}">${cat.categoria}</button>
  `).join("");

  function paint(index){
    const cat = SERVICOS[index];
    panel.innerHTML = `
      <div class="receipt reveal in">
        <div class="receipt-head">
          <h3>${cat.categoria}</h3>
          <span>ACD · Lista de Preços</span>
        </div>
        ${cat.itens.map(item => `
          <div class="item-row">
            <span class="name">${item.nome}</span>
            <div class="right">
              <span class="price">${fmt(item.preco)}</span>
              <a class="btn btn-outline btn-sm" target="_blank" rel="noopener"
                 href="${whatsappLink('Olá! Gostaria de obter o serviço: ' + item.nome + '.')}">
                Obter serviço
              </a>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    [...tabs.children].forEach((b,i2) => b.classList.toggle("active", i2 === index));
  }

  tabs.addEventListener("click", e => {
    const btn = e.target.closest(".tab-btn");
    if(!btn) return;
    paint(Number(btn.dataset.index));
  });

  paint(0);
}

/* ---------- Avisos ---------- */
function renderAvisos(){
  document.getElementById("aviso-desconto").textContent = AVISOS.desconto;
  document.getElementById("aviso-inscricao").textContent = AVISOS.inscricaoBolsa;
  document.getElementById("aviso-urgencia").textContent = AVISOS.urgencia;
}

/* ---------- Sobre ---------- */
function renderSobre(){
  document.getElementById("sobre-texto").textContent = SOBRE.descricao;
  document.getElementById("pilares-grid").innerHTML = SOBRE.pilares.map((p,i) => `
    <div class="pilar reveal">
      <span class="num">0${i+1}</span>
      <h4>${p.titulo}</h4>
      <p>${p.texto}</p>
    </div>
  `).join("");
}

/* ---------- Contactos / Redes ---------- */
function renderContactos(){
  document.querySelectorAll("[data-whats-link]").forEach(el => el.href = whatsappLink());
  document.querySelectorAll("[data-whats-direct]").forEach(el => el.href = CONTACTOS.linkWhatsappDireto);

  const tels = document.getElementById("contact-tels");
  tels.innerHTML = CONTACTOS.telefones.map(t =>
    `<a href="tel:${t.replace(/\s/g,"")}">${t}</a>`
  ).join(" &nbsp;/&nbsp; ");

  document.getElementById("contact-email").textContent = CONTACTOS.email;
  document.getElementById("contact-email").href = "mailto:" + CONTACTOS.email;

  const socialMap = [
    ["facebook","Facebook", CONTACTOS.facebook],
    ["instagram","Instagram", CONTACTOS.instagram],
    ["youtube","YouTube", CONTACTOS.youtube],
    ["tiktok","TikTok", CONTACTOS.tiktok],
    ["whatsapp","Canal de WhatsApp", CONTACTOS.canalWhatsapp],
    ["whatsapp","Grupo — Documentos & Bolsas", CONTACTOS.grupoWhatsappDocumentos],
    ["whatsapp","Grupo — Mundo Digital (Import/Export)", CONTACTOS.grupoMundoDigital],
    ["facebook","ACD Scholarship", CONTACTOS.facebookScholarship],
  ];
  const icons = {
    facebook: `<path d="M13 22v-9h3l1-4h-4V7c0-1.2.4-2 2.2-2H17V1.2C16.6 1.1 15.4 1 14 1c-3 0-5 1.8-5 5.2V9H6v4h3v9h4z"/>`,
    instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>`,
    youtube: `<path d="M22 12s0-3.4-.4-5A2.8 2.8 0 0 0 19.6 5C17.9 4.6 12 4.6 12 4.6s-5.9 0-7.6.4A2.8 2.8 0 0 0 2.4 7 29 29 0 0 0 2 12a29 29 0 0 0 .4 5A2.8 2.8 0 0 0 4.4 19c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-1.9c.4-1.7.4-5.1.4-5.1z"/><path fill="var(--ink)" d="M10 15.5v-7l6 3.5z"/>`,
    tiktok: `<path d="M14 3c.5 2.4 2 4 4.5 4.2V10c-1.6 0-3-.5-4.2-1.4v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1V12.4a2.4 2.4 0 1 0 1.7 2.3V3H14z"/>`,
    whatsapp: `<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm5.6 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.2.4.9 1.5 2 2.3 1.3 1 1.5 1 1.8.9.2 0 .4-.2.6-.5l.5-.7c.2-.3.4-.2.6-.1l1.7.9c.2.1.4.2.5.3.1.2.1.9-.1 1.6z"/>`
  };
  document.getElementById("social-list").innerHTML = socialMap.map(([icon,label,url]) => `
    <li><a href="${url}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor">${icons[icon]}</svg>
      ${label}
    </a></li>
  `).join("");
}

/* ---------- Mobile nav ---------- */
function initNav(){
  const toggle = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
}

/* ---------- reveal on scroll ---------- */
function initReveal(){
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: .15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
renderAvisos();
renderBolsas();
renderServicos();
renderSobre();
renderContactos();
initNav();
initReveal();
initModal();
