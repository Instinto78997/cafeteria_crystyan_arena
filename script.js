const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }),
);
const dateInput = document.querySelector("input[name=fecha]");
const localToday = new Date();
dateInput.min = new Date(
  localToday.getTime() - localToday.getTimezoneOffset() * 60000,
)
  .toISOString()
  .slice(0, 10);
document.querySelector("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const phone = "34910290694";
  const lines = [
    "Hola, quiero solicitar una reserva en Crystyan Arena.",
    "",
    `Nombre: ${data.get("nombre")}`,
    `Teléfono: ${data.get("telefono")}`,
    `Fecha: ${data.get("fecha")}`,
    `Hora: ${data.get("hora")}`,
    `Personas: ${data.get("personas")}`,
    data.get("nota") ? `Nota: ${data.get("nota")}` : "",
  ];
  const message = encodeURIComponent(lines.filter(Boolean).join("\n"));
  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank",
    "noopener,noreferrer",
  );
  document.querySelector(".form-status").textContent =
    "Se abrió WhatsApp con tu solicitud. Envíala desde allí y espera la confirmación del local.";
});
