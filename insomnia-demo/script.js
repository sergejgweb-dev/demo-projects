"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Otvori meni" : "Zatvori meni");
  mainNav.classList.toggle("is-open", !open);
});

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Otvori meni");
  mainNav.classList.remove("is-open");
}));

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".gallery-card").forEach((card) => card.addEventListener("click", () => {
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = card.querySelector("img").alt;
  lightbox.showModal();
  document.body.classList.add("no-scroll");
}));

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener("close", () => {
  document.body.classList.remove("no-scroll");
  lightboxImage.removeAttribute("src");
});

