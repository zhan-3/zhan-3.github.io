/* ========== 站点逻辑:数据加载、筛选、搜索、双语、主题 ========== */

const I18N = {
  zh: {
    searchPlaceholder: "搜索…",
    all: "全部",
    resultCount: "共 {n} 条推荐",
    empty: "没有找到匹配的条目,换个关键词试试",
    themeToggle: "切换主题",
    langLabel: "EN",
    langTitle: "Switch to English",
    footerAbout: "个人收藏的软件与资源导航,推荐仅供参考,请以官网信息为准。",
    footerGitHub: "GitHub",
    externalTitle: "站外资源",
    externalHint: "(自行判断 · 与本站无关)",
    externalWarn: "以下为开源工具或社区渠道,仅供个人研究使用,请遵守当地法律法规,谨慎使用。",
    notesTitle: "经验笔记"
  },
  en: {
    searchPlaceholder: "Search…",
    all: "All",
    resultCount: "{n} items",
    empty: "No matches found. Try another keyword.",
    themeToggle: "Toggle theme",
    langLabel: "中文",
    langTitle: "切换到中文",
    footerAbout: "A personal collection of useful software & resources. For reference only — always check official sites.",
    footerGitHub: "GitHub",
    externalTitle: "External Resources",
    externalHint: "(use at your own discretion)",
    externalWarn: "Open-source tools or community channels below — for personal research only. Use at your own discretion.",
    notesTitle: "Notes"
  }
};

const state = {
  data: null,
  lang: localStorage.getItem("lang") || (navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"),
  theme: localStorage.getItem("theme") || "dark",
  cat: "all",
  query: ""
};

const $ = (id) => document.getElementById(id);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 主题 ---------- */
function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  $("theme-toggle").textContent = state.theme === "dark" ? "🌙" : "☀️";
}

/* ---------- 语言 ---------- */
function t(key) { return I18N[state.lang][key] || key; }

function applyLang() {
  const s = state.lang;
  document.documentElement.lang = s === "zh" ? "zh-CN" : "en";
  const meta = document.querySelector('meta[name="description"]');
  meta.content = s === "zh" ? "个人收藏的好用软件与资源导航" : "A personal collection of useful software & resources";
  document.title = state.data ? (s === "zh" ? state.data.site.title : state.data.site.titleEn) : document.title;
  $("site-title").textContent = state.data ? (s === "zh" ? state.data.site.title : state.data.site.titleEn) : $("site-title").textContent;
  $("search").placeholder = t("searchPlaceholder");
  $("lang-toggle").textContent = t("langLabel");
  $("lang-toggle").setAttribute("aria-label", t("langTitle"));
  $("theme-toggle").setAttribute("aria-label", t("themeToggle"));
  $("footer-about").textContent = t("footerAbout");
  $("ext-title").textContent = t("externalTitle");
  $("ext-hint").textContent = t("externalHint");
  $("ext-warn").textContent = t("externalWarn");
  $("notes-title").textContent = t("notesTitle");
  renderCats();
  render();
}

/* ---------- 分类 ---------- */
function renderCats() {
  const s = state.lang;
  const chips = [{ id: "all", label: t("all") }].concat(
    state.data.categories.map((c) => ({ id: c.id, label: c[s] || c.zh }))
  );
  $("cats").innerHTML = chips
    .map((c) => `<button class="chip${state.cat === c.id ? " active" : ""}" data-cat="${c.id}" type="button">${esc(c.label)}</button>`)
    .join("");
}

/* ---------- 卡片 ---------- */
const CAT_COLORS = ["#6ea8fe", "#5ec49f", "#e3a24f", "#c77df0", "#5ab0e0", "#e0759a", "#9aa1ae"];

function catColor(catId) {
  const idx = state.data.categories.findIndex((c) => c.id === catId);
  return CAT_COLORS[Math.max(idx, 0) % CAT_COLORS.length];
}

function render() {
  if (!state.data) return;
  const s = state.lang;
  const q = state.query.trim().toLowerCase();
  const items = state.data.items.filter((it) => {
    if (state.cat !== "all" && it.cat !== state.cat) return false;
    if (!q) return true;
    return [it.name, it.desc, ...(it.tags || [])].join(" ").toLowerCase().includes(q);
  });

  $("result-count").hidden = false;
  $("result-count").textContent = t("resultCount").replace("{n}", items.length);

  if (items.length === 0) {
    $("cards").innerHTML = "";
    $("empty").hidden = false;
    $("empty").textContent = t("empty");
  } else {
    $("empty").hidden = true;

    const catName = (id) => {
      const c = state.data.categories.find((x) => x.id === id);
      return c ? (c[s] || c.zh) : id;
    };

    $("cards").innerHTML = items.map((it) => `
      <a class="card" href="${esc(it.url)}" target="_blank" rel="noopener noreferrer">
        <span class="card-arrow" aria-hidden="true">↗</span>
        <span class="card-top">
          <span class="card-avatar" style="background:${catColor(it.cat)}">${esc(it.name.charAt(0).toUpperCase())}</span>
          <span class="card-name">${esc(it.name)}</span>
          <span class="card-cat">${esc(catName(it.cat))}</span>
        </span>
        <span class="card-desc">${esc(it.desc)}</span>
        ${it.tags && it.tags.length ? `<span class="card-tags">${it.tags.map((x) => `<span class="card-tag">${esc(x)}</span>`).join("")}</span>` : ""}
      </a>`).join("");
  }

  renderExt();
  renderNotes();
}

function renderExt() {
  const el = $("external-list");
  if (!el || !state.data.external) return;
  el.innerHTML = state.data.external.map((x) => `
    <li class="ext-item">
      <a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.name)}</a>
      <span class="ext-desc">${esc(x.desc)}</span>
    </li>`).join("");
}

function renderNotes() {
  const el = $("notes-list");
  if (!el || !state.data.notes) return;
  el.innerHTML = state.data.notes.map((n) => `<li>${esc(n)}</li>`).join("");
}

/* ---------- 事件 ---------- */
$("theme-toggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", state.theme);
  applyTheme();
});

$("lang-toggle").addEventListener("click", () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", state.lang);
  applyLang();
});

$("search").addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});

$("cats").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  state.cat = chip.dataset.cat;
  renderCats();
  render();
});

/* ---------- 启动 ---------- */
async function init() {
  $("year").textContent = new Date().getFullYear();
  applyTheme();
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.data = await res.json();
  } catch (err) {
    $("cards").innerHTML = `<p class="empty">数据加载失败,请通过 HTTP 服务器访问本站点。</p>`;
    return;
  }
  applyLang();
}

init();
