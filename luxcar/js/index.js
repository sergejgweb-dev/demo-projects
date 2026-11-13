const hamburger = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobile-nav");
hamburger.addEventListener("click", function () {
  const isOpen = mobileNav.classList.toggle("is-open");
  hamburger.classList.toggle("is-open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});
mobileNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileNav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

const listaVozila = document.querySelector(".lista-vozila");

/* ============================== */
/* SCROLL REVEAL ANIMACIJA */
/* ============================== */

const observer =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px",
        },
      )
    : null;

function pratiAnimaciju(element) {
  element.classList.add("reveal");

  if (observer) {
    observer.observe(element);
  } else {
    element.classList.add("visible");
  }
}

/* Statični elementi stranice */

document
  .querySelectorAll(
    ".section-top, .catalog-info, .aside, .advantages-heading, .oznake, .kontakt-inner, .dno > div",
  )
  .forEach(function (element) {
    pratiAnimaciju(element);
  });

cars.forEach(function (car, index) {
  const kartica = document.createElement("article");

  kartica.classList.add("car-card");
  kartica.dataset.index = index;

  // Podaci koje koriste filteri
  kartica.dataset.marka = car.brand || "";
  kartica.dataset.gorivo = car.fuel || "";
  kartica.dataset.cijena = car.price;
  kartica.dataset.godina = car.year || "";

  kartica.innerHTML = `
   <a
  href="./detalji.html?id=${index}"
  class="car-image"
>
      <img
  src="${car.image}"
  alt="${car.name} – polovni automobil u LUXCAR Gradiška"
  loading="lazy">

      ${car.featured ? '<span class="car-tag">ISTAKNUTO</span>' : ""}

      <span class="car-number">
        ${String(index + 1).padStart(2, "0")}
      </span>
    </a>

    <div class="car-details">
      <p class="car-category">
        ${car.category || ""}
      </p>

      <h3>${car.name}</h3>

      <p class="car-subtitle">
        ${car.subtitle || ""}
      </p>

      <div class="car-specs">
        <span>${car.year || ""}</span>
        <span>${car.power || ""}</span>
        <span>${car.transmission || ""}</span>
      </div>

      <div class="car-bottom">
        <div class="car-price">
          <strong>
            ${car.price.toLocaleString("de-DE")}
          </strong>
          <span>KM</span>
        </div>

        
<a
  href="./detalji.html?id=${index}"
  class="car-link"
>
  Detalji vozila ↗
</a>

      </div>
    </div>
  `;

  listaVozila.appendChild(kartica);
  pratiAnimaciju(kartica);
});

// =========================
// FILTERI ZA VOZILA
// =========================

const filterForm = document.querySelector("#filter-form");
const searchInput = document.querySelector("#pretraga");
const markaSelect = document.querySelector("#marka");
const gorivoSelect = document.querySelector("#gorivo");
const cijenaSelect = document.querySelector("#cijena");
const sortiranjeSelect = document.querySelector("#sortiranje");
const noResults = document.querySelector("#no-results");
const brojPrikazanihElement = document.querySelector(".broj-prikazanih");
const ukupnoVozilaElement = document.querySelector(".ukupno-vozila");
const btnUcitajJos = document.querySelector("#ucitaj-jos");

let brojPrikazanih = 8;

const vozila = [...document.querySelectorAll(".car-card")];

function filtrirajVozila(event) {
  if (event) {
    event.preventDefault();
  }

  const pretraga = searchInput.value.trim().toLowerCase();
  const marka = markaSelect.value;
  const gorivo = gorivoSelect.value;
  const maksimalnaCijena = Number(cijenaSelect.value) || Infinity;

  let pronadjenaVozila = vozila.filter(function (vozilo) {
    const naziv = vozilo.querySelector("h3").textContent.toLowerCase();

    const kategorija = vozilo
      .querySelector(".car-category")
      .textContent.toLowerCase();

    const markaVozila = vozilo.dataset.marka.toLowerCase();

    const odgovaraPretrazi =
      naziv.includes(pretraga) ||
      kategorija.includes(pretraga) ||
      markaVozila.includes(pretraga);

    const odgovaraMarki = marka === "" || vozilo.dataset.marka === marka;
    const odgovaraGorivu = gorivo === "" || vozilo.dataset.gorivo === gorivo;
    const odgovaraCijeni = Number(vozilo.dataset.cijena) <= maksimalnaCijena;

    return (
      odgovaraPretrazi && odgovaraMarki && odgovaraGorivu && odgovaraCijeni
    );
  });

  // SORTIRANJE VOZILA

  if (sortiranjeSelect.value === "jeftinije") {
    pronadjenaVozila.sort(function (a, b) {
      return Number(a.dataset.cijena) - Number(b.dataset.cijena);
    });
  }

  if (sortiranjeSelect.value === "skuplje") {
    pronadjenaVozila.sort(function (a, b) {
      return Number(b.dataset.cijena) - Number(a.dataset.cijena);
    });
  }

  if (sortiranjeSelect.value === "novo") {
    pronadjenaVozila.sort(function (a, b) {
      return Number(b.dataset.godina) - Number(a.dataset.godina);
    });
  }

  // PRIKAZ I SKRIVANJE KARTICA

  vozila.forEach(function (vozilo) {
    vozilo.hidden = true;
  });

  pronadjenaVozila.forEach(function (vozilo, index) {
    listaVozila.appendChild(vozilo);
    vozilo.hidden = index >= brojPrikazanih;
  });

  // AŽURIRANJE BROJAČA

  const ukupnoVozila = pronadjenaVozila.length;
  const trenutnoPrikazano = Math.min(brojPrikazanih, ukupnoVozila);

  brojPrikazanihElement.textContent = trenutnoPrikazano;
  ukupnoVozilaElement.textContent = ukupnoVozila;

  // DUGME UČITAJ JOŠ

  btnUcitajJos.hidden = trenutnoPrikazano >= ukupnoVozila;

  // AKO NEMA REZULTATA

  noResults.hidden = ukupnoVozila !== 0;
}

// =========================
// PRIMIJENI FILTERE
// =========================

filterForm.addEventListener("submit", function (event) {
  brojPrikazanih = 8;
  filtrirajVozila(event);
});

// =========================
// PRETRAGA DOK KORISNIK KUCKA
// =========================

searchInput.addEventListener("input", function () {
  brojPrikazanih = 8;
  filtrirajVozila();
});

// =========================
// PONIŠTI FILTERE
// =========================

filterForm.addEventListener("reset", function () {
  setTimeout(function () {
    brojPrikazanih = 8;
    filtrirajVozila();
  }, 0);
});

// PROMJENA OSTALIH FILTERA I SORTIRANJA

markaSelect.addEventListener("change", function () {
  brojPrikazanih = 8;
  filtrirajVozila();
});

gorivoSelect.addEventListener("change", function () {
  brojPrikazanih = 8;
  filtrirajVozila();
});

cijenaSelect.addEventListener("change", function () {
  brojPrikazanih = 8;
  filtrirajVozila();
});

sortiranjeSelect.addEventListener("change", function () {
  brojPrikazanih = 8;
  filtrirajVozila();
});

// =========================
// UČITAJ JOŠ VOZILA
// =========================

btnUcitajJos.addEventListener("click", function () {
  brojPrikazanih += 8;

  filtrirajVozila();
});

// =========================
// PRVO PRIKAZIVANJE
// =========================

filtrirajVozila();
