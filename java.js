// script.js - funciona con el HTML de "mi primer proyecto"
document.addEventListener("DOMContentLoaded", () => {
  /* 1. MENÚ HAMBURGUESA */
  const hamburguesa = document.querySelector(".hamburguesa");
  const enlaces = document.querySelector(".enlaces-header");

  if (hamburguesa && enlaces) {
    hamburguesa.addEventListener("click", () => {
      enlaces.classList.toggle("activo");
    });

    // Cierra el menú al hacer clic en un enlace
    enlaces.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", () => enlaces.classList.remove("activo"));
    });
  }

  /* 2. ENLACE ACTIVO EN EL MENÚ */
  const linksMenu = document.querySelectorAll(".enlaces-header a");
  linksMenu.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // evita saltar arriba por el href="#"
      linksMenu.forEach((l) => l.classList.remove("seleccionado"));
      link.classList.add("seleccionado");
    });
  });

  /* 3. NAV CAMBIA AL HACER SCROLL */
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* 4. ANIMACIÓN DE APARICIÓN AL HACER SCROLL */
  const elementos = document.querySelectorAll(
    ".servicios, .servicio, .Texto-pregunta, .number, .box-skills h4"
  );

  elementos.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  const observadorAparicion = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.style.opacity = "1";
          entrada.target.style.transform = "translateY(0)";
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elementos.forEach((el) => observadorAparicion.observe(el));

  /* 5. CONTADOR ANIMADO (+8873, +8874...) */
  const numeros = document.querySelectorAll(".number h4");

  const animarContador = (el) => {
    const textoOriginal = el.textContent.trim(); // ej: "+8873"
    const prefijo = textoOriginal.startsWith("+") ? "+" : "";
    const meta = parseInt(textoOriginal.replace(/\D/g, ""), 10);
    if (isNaN(meta)) return;

    const duracion = 2000; // ms
    const inicio = performance.now();

    const actualizar = (ahora) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = prefijo + Math.floor(progreso * meta);
      if (progreso < 1) requestAnimationFrame(actualizar);
    };
    requestAnimationFrame(actualizar);
  };

  const observadorNumeros = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          animarContador(entrada.target);
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  numeros.forEach((n) => observadorNumeros.observe(n));

  /* 6. BOTONES "Leer mas", "learn more", etc. */
  document.querySelectorAll('a[href="#"], a[href=""]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
});