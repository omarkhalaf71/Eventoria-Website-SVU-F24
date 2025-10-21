document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.getElementById("langToggle")
  const langFlag = document.getElementById("langFlag")
  const langLabel = document.getElementById("langLabel")

  let currentLang = "en"

  function updateLanguage() {
    const html = document.documentElement
    const isEnglish = currentLang === "en"
    html.lang = currentLang
    html.dir = isEnglish ? "ltr" : "rtl"

    document.querySelectorAll("[data-en]").forEach((el) => {
      el.textContent = isEnglish ? el.dataset.en : el.dataset.ar
    })

    document.querySelectorAll("input, textarea").forEach((el) => {
      if (el.dataset.en)
        el.placeholder = isEnglish ? el.dataset.en : el.dataset.ar
    })

    langFlag.src = isEnglish
      ? "https://flagcdn.com/24x18/us.png"
      : "https://flagcdn.com/24x18/sy.png"
    langFlag.alt = isEnglish ? "US Flag" : "علم سوريا"
    langLabel.textContent = isEnglish ? "EN" : "AR"
  }

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en"
    updateLanguage()
  })

  updateLanguage()
})
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide")
  const prevBtn = document.querySelector(".nav-btn.prev")
  const nextBtn = document.querySelector(".nav-btn.next")
  const dotsContainer = document.querySelector(".dots")

  let currentIndex = 0

  slides.forEach((_, i) => {
    const dot = document.createElement("button")
    dot.addEventListener("click", () => goToSlide(i))
    dotsContainer.appendChild(dot)
  })

  const dots = dotsContainer.querySelectorAll("button")
  dots[0].classList.add("active")

  function showSlide(index) {
    slides.forEach((s) => s.classList.remove("active"))
    dots.forEach((d) => d.classList.remove("active"))
    slides[index].classList.add("active")
    dots[index].classList.add("active")
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length
    showSlide(currentIndex)
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    showSlide(currentIndex)
  }

  function goToSlide(index) {
    currentIndex = index
    showSlide(index)
  }

  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  setInterval(nextSlide, 6000)
})
// ===== FILTER =====
const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const dateFilter = document.getElementById("dateFilter")
const locationFilter = document.getElementById("locationFilter")
const eventsContainer = document.getElementById("eventsContainer")
const cards = eventsContainer.querySelectorAll(".event-card")

function filterEvents() {
  const search = searchInput.value.toLowerCase()
  const category = categoryFilter.value
  const date = dateFilter.value
  const location = locationFilter.value

  cards.forEach((card) => {
    const title = card.querySelector(".event-title").textContent.toLowerCase()
    const cardCategory = card.dataset.category
    const cardLocation = card.dataset.location
    const cardDate = card.dataset.date

    const matchesSearch = title.includes(search)
    const matchesCategory = !category || cardCategory === category
    const matchesLocation = !location || cardLocation === location
    const matchesDate = !date || cardDate === date

    card.style.display =
      matchesSearch && matchesCategory && matchesLocation && matchesDate
        ? "block"
        : "none"
  })
}

;[searchInput, categoryFilter, dateFilter, locationFilter].forEach((el) =>
  el.addEventListener("input", filterEvents)
)

// ===== LANGUAGE SWITCH =====
const langToggle = document.getElementById("langToggle")
langToggle.addEventListener("click", () => {
  const html = document.documentElement
  const isEnglish = html.lang === "en"
  html.lang = isEnglish ? "ar" : "en"
  html.dir = isEnglish ? "rtl" : "ltr"

  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = html.lang === "en" ? el.dataset.en : el.dataset.ar
  })
})
