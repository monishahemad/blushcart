const searchInput = document.querySelector("#searchInput");
const cards = [...document.querySelectorAll(".poetry-card")];
const filters = [...document.querySelectorAll(".filter")];
const toast = document.querySelector("#toast");
const dialog = document.querySelector("#writeDialog");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function applySearch() {
  const query = searchInput.value.trim().toLocaleLowerCase("hi");
  const activeCategory = document.querySelector(".filter.active").dataset.filter;
  let visible = 0;
  cards.forEach((card) => {
    const matchesText = card.dataset.searchable.toLocaleLowerCase("hi").includes(query) || card.textContent.toLocaleLowerCase("hi").includes(query);
    const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
    card.hidden = !(matchesText && matchesCategory);
    if (!card.hidden) visible += 1;
  });
  document.querySelector("#emptyState").style.display = visible ? "none" : "block";
}

searchInput.addEventListener("input", applySearch);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

document.querySelectorAll("[data-search]").forEach((button) => button.addEventListener("click", () => {
  searchInput.value = button.dataset.search;
  applySearch();
  document.querySelector("#shayari").scrollIntoView();
}));

filters.forEach((filter) => filter.addEventListener("click", () => {
  filters.forEach((item) => item.classList.remove("active"));
  filter.classList.add("active");
  applySearch();
}));

document.querySelectorAll(".bookmark").forEach((button) => button.addEventListener("click", () => {
  const isSaved = button.classList.toggle("saved");
  button.setAttribute("aria-pressed", String(isSaved));
  if (button.classList.contains("mini-bookmark")) button.textContent = isSaved ? "♥" : "♡";
  showToast(isSaved ? "शायरी सहेज ली गई ♡" : "सहेजी गई सूची से हटा दिया");
}));

document.querySelectorAll(".share-button").forEach((button) => button.addEventListener("click", async () => {
  const container = button.closest("article, .featured-card");
  const quote = container.querySelector("blockquote").innerText;
  if (navigator.share) await navigator.share({ title: "अल्फ़ाज़", text: quote });
  else {
    await navigator.clipboard?.writeText(quote);
    showToast("शायरी कॉपी हो गई");
  }
}));

document.querySelector("#themeButton").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  showToast(document.body.classList.contains("dark") ? "रात का अंदाज़" : "दिन का अंदाज़");
});

document.querySelector("#randomButton").addEventListener("click", () => {
  filters[0].click();
  searchInput.value = "";
  applySearch();
  const card = cards[Math.floor(Math.random() * cards.length)];
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.animate([{ transform: "scale(1)" }, { transform: "scale(1.025)" }, { transform: "scale(1)" }], { duration: 500 });
});

function openWriter() { dialog.showModal(); }
document.querySelector("#writeButton").addEventListener("click", openWriter);
document.querySelector("#mobileWrite").addEventListener("click", openWriter);
document.querySelector(".mobileSaved").addEventListener("click", () => showToast("आपकी सहेजी हुई शायरी जल्द यहाँ होगी"));

document.querySelector("#writeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#poemTitle").value;
  dialog.close();
  event.target.reset();
  showToast(`“${title}” महफ़िल में जोड़ दी गई`);
});
