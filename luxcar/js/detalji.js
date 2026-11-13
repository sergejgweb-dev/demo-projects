// ==============================
// PRONALAŽENJE AUTOMOBILA
// ==============================

// Čitamo ID automobila iz URL-a
const parametri = new URLSearchParams(window.location.search);

const idParametra = parametri.get("id");

const idAutomobila = idParametra === null ? NaN : Number(idParametra);

// Pronalazimo automobil u nizu
const automobil = cars[idAutomobila];

// Provjeravamo postoji li automobil
if (!automobil) {
  document.querySelector(".detalji-main").innerHTML =
    "<h2>Automobil nije pronađen.</h2>";
} else {
  // ==============================
  // SEO ZA POJEDINAČNI AUTOMOBIL
  // ==============================

  document.title = `${automobil.name} | LUXCAR Gradiška`;

  let metaOpis = document.querySelector('meta[name="description"]');

  if (!metaOpis) {
    metaOpis = document.createElement("meta");
    metaOpis.name = "description";
    document.head.appendChild(metaOpis);
  }

  metaOpis.content = `LUXCAR Gradiška – ${automobil.name}, godište ${automobil.year || "nije navedeno"}, ${automobil.fuel || "gorivo nije navedeno"}, ${automobil.mileage?.toLocaleString("de-DE") || "kilometraža nije navedena"} km. Cijena: ${automobil.price.toLocaleString("de-DE")} KM. Kontaktirajte nas za više informacija.`;

  // ==============================
  // OPEN GRAPH ZA DIJELJENJE LINKA
  // ==============================

  function postaviMetaTag(property, content) {
    let metaTag = document.querySelector(`meta[property="${property}"]`);

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", property);
      document.head.appendChild(metaTag);
    }

    metaTag.content = content;
  }

  postaviMetaTag("og:type", "product");
  postaviMetaTag("og:title", document.title);
  postaviMetaTag("og:description", metaOpis.content);
  postaviMetaTag(
    "og:image",
    new URL(automobil.image, window.location.href).href,
  );
  postaviMetaTag("og:url", window.location.href);
  // ==============================
  // OSNOVNE INFORMACIJE
  // ==============================

  document.querySelector(".kategorija").textContent = automobil.category || "";

  document.querySelector(".zaglavlje-vozila h1").textContent = automobil.name;
  document.querySelector(".podnaslov-vozila").textContent =
    automobil.subtitle || "";

  document.querySelector(".cijena").textContent =
    automobil.price.toLocaleString("de-DE") + " KM";

  document.querySelector(".glavna-slika img").src = automobil.image;

  document.querySelector(".glavna-slika img").alt = automobil.name;

  const osnovneSpecifikacije = document.querySelector(".osnovne-specifikacije");

  osnovneSpecifikacije.innerHTML = `
    <div class="specifikacija">
      <span>Godište</span>
      <strong>${automobil.year || "Nije navedeno"}</strong>
    </div>

    <div class="specifikacija">
      <span>Kilometraža</span>
      <strong>${automobil.mileage?.toLocaleString("de-DE") || "Nije navedeno"} km</strong>
    </div>

    <div class="specifikacija">
      <span>Gorivo</span>
      <strong>${automobil.fuel || "Nije navedeno"}</strong>
    </div>

    <div class="specifikacija">
      <span>Mjenjač</span>
      <strong>${automobil.transmission || "Nije navedeno"}</strong>
    </div>

    <div class="specifikacija">
      <span>Snaga</span>
      <strong>${automobil.power || "Nije navedeno"}</strong>
    </div>

    <div class="specifikacija">
      <span>Pogon</span>
      <strong>${automobil.pogon || "Nije navedeno"}</strong>
    </div>
  `;

  // ==============================
  // TEHNIČKI PODACI
  // ==============================

  const podaciGrid = document.querySelector(".podaci-grid");

  const tehnickiPodaci = [
    ["Prva registracija", automobil.prvaRegistracija],
    ["Veličina felgi", automobil.velicinaFelgi],
    ["Broj stepeni prenosa", automobil.brojStepeniPrenosa],
    ["Emisioni standard", automobil.emisioniStandard],
    ["Boja", automobil.boja],
    ["Broj sjedećih mjesta", automobil.sjedecihMjesta],
    ["Pogon", automobil.pogon],
    ["Broj prethodnih vlasnika", automobil.brojPrethodnihVlasnika],
  ];

  tehnickiPodaci.forEach(function (podatak) {
    if (podatak[1] !== undefined && podatak[1] !== "") {
      podaciGrid.innerHTML += `
        <div class="podatak">
          <span>${podatak[0]}</span>
          <strong>${podatak[1]}</strong>
        </div>
      `;
    }
  });

  // ==============================
  // OPREMA I SIGURNOST
  // ==============================

  const opremaGrid = document.querySelector(".oprema-grid");

  const oprema = [
    ["Klima uređaj", automobil.klima],
    ["Parking senzori", automobil.senzori],
    ["Svjetla", automobil.svjetla],
    ["Komande na volanu", automobil.komandeNaVolanu],
    ["Touch screen", automobil.touchScreen],
    ["USB port", automobil.usbPort],
    ["Bluetooth", automobil.bluetooth],
    ["Senzor kiše", automobil.senzorKise],
    ["Start/Stop sistem", automobil.startStop],
    ["Masaža sjedišta", automobil.masazaSjedista],
    ["Hlađenje sjedišta", automobil.hladjenjeSjedista],
    ["Naslon za ruku", automobil.naslonZaRuku],
    ["Električni retrovizori", automobil.elektricniRetrovizor],
    ["Digitalna klima", automobil.digitalnaKlima],
    ["Navigacija", automobil.navigacija],
    ["Tempomat", automobil.tempomat],
    ["Apple CarPlay", automobil.carPlay],
    ["Automatska svjetla", automobil.senzorAutoSvjetla],
    ["Head-up display", automobil.headUpDisplay],
    ["Hill Assist", automobil.hillAssist],
    ["Grijanje sjedišta", automobil.grijanjeSjedista],
    ["Električni podizači stakala", automobil.elPodizacStakala],
    ["Maglenke", automobil.maglenke],
    ["ABS", automobil.abs],
    ["ESP", automobil.esp],
    ["Airbag", automobil.airBag],
    ["Alarm", automobil.alarm],
    ["Centralna brava", automobil.centralnaBrava],
    ["Servo volan", automobil.servoVolan],
    ["DPF", automobil.dpf],
    ["Turbo", automobil.turbo],
    ["Servisna knjiga", automobil.servisnaKnjiga],
  ];

  oprema.forEach(function (stavka) {
    if (stavka[1] !== undefined && stavka[1] !== "") {
      opremaGrid.innerHTML += `
        <div class="oprema-stavka">
          <span>✓</span>
          ${stavka[0]}: ${stavka[1]}
        </div>
      `;
    }
  });

  // PRIKAZIVANJE I SKRIVANJE OPREME

  const opremaSadrzaj = document.querySelector(".oprema-sadrzaj");
  const prikaziOpremu = document.querySelector("#prikaziOpremu");

  prikaziOpremu.addEventListener("click", function () {
    opremaSadrzaj.classList.toggle("prosireno");

    prikaziOpremu.classList.toggle("otvoreno");

    prikaziOpremu.setAttribute(
      "aria-expanded",
      opremaSadrzaj.classList.contains("prosireno"),
    );

    if (opremaSadrzaj.classList.contains("prosireno")) {
      prikaziOpremu.innerHTML = "Prikaži manje <span>↓</span>";
    } else {
      prikaziOpremu.innerHTML = "Prikaži svu opremu <span>↓</span>";
    }
  });

  // KONTAKT SA SALONOM

  const pozoviSalon = document.querySelector("#pozoviSalon");
  const whatsappSalon = document.querySelector("#whatsappSalon");

  const brojTelefona = "387XXXXXXXXX";

  pozoviSalon.href = `tel:+${brojTelefona}`;

  const poruka = `Pozdrav, zainteresovan sam za vozilo ${automobil.name}. Da li je još dostupno?`;

  whatsappSalon.href = `https://wa.me/${brojTelefona}?text=${encodeURIComponent(poruka)}`;

  whatsappSalon.target = "_blank";
  whatsappSalon.rel = "noopener noreferrer";
}

// GALERIJA SLIKA

const glavnaSlika = document.querySelector(".glavna-slika img");
const ostaleSlike = document.querySelector(".ostale-slike");

const prethodnaSlika = document.querySelector("#prethodnaSlika");
const sljedecaSlika = document.querySelector("#sljedecaSlika");

let trenutnaSlika = 0;

// Sve slike automobila
const slikeAutomobila = [automobil.image, ...(automobil.images || [])];

// Funkcija za prikaz slike
function prikaziSliku(index) {
  trenutnaSlika = index;

  glavnaSlika.src = slikeAutomobila[trenutnaSlika];

  const sveSlike = ostaleSlike.querySelectorAll("img");

  sveSlike.forEach(function (slika, index) {
    slika.classList.remove("aktivna-slika");

    if (index === trenutnaSlika) {
      slika.classList.add("aktivna-slika");
    }
  });
}

// Dodavanje malih slika
slikeAutomobila.forEach(function (slika, index) {
  const novaSlika = document.createElement("img");

  novaSlika.src = slika;
  novaSlika.alt = automobil.name;

  novaSlika.addEventListener("click", function () {
    prikaziSliku(index);
  });

  ostaleSlike.appendChild(novaSlika);
});

// Prethodna slika
prethodnaSlika.addEventListener("click", function () {
  let noviIndex = trenutnaSlika - 1;

  if (noviIndex < 0) {
    noviIndex = slikeAutomobila.length - 1;
  }

  prikaziSliku(noviIndex);
});

// Sljedeća slika
sljedecaSlika.addEventListener("click", function () {
  let noviIndex = trenutnaSlika + 1;

  if (noviIndex >= slikeAutomobila.length) {
    noviIndex = 0;
  }

  prikaziSliku(noviIndex);
});

// Prikaz prve slike
prikaziSliku(0);
