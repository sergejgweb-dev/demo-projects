const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#nav");

menuButton.addEventListener("click", function () {
  const menuOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!menuOpen));
  menuButton.setAttribute("aria-label", menuOpen ? "Otvori meni" : "Zatvori meni");
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Otvori meni");
  });
});

const reservationForm = document.querySelector("#reservation-form");
const dateField = document.querySelector("#visit-date");
const formMessage = document.querySelector("#form-message");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];
dateField.min = localToday;

reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#guest-name").value.trim();
  const guests = document.querySelector("#guest-count").value;
  const date = dateField.value;
  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("bs-BA");

  formMessage.textContent = "Hvala, " + name + "! Upit za " + guests + " za " + formattedDate + " je zabilježen u ovom demo prikazu.";
  formMessage.classList.add("success");
  reservationForm.reset();
  dateField.min = localToday;
});

