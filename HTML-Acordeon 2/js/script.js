// ===== Carrusel 3D con GSAP 3 (reparado) =====
let w, container, carousel, items, radius, itemLength, rY;
let mouseX = 0, mouseY = 0, mouseZ = 0, addX = 0;

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", () => {
  w = window;
  container = document.getElementById("contentContainer");
  carousel  = document.getElementById("carouselContainer");
  items = Array.from(document.querySelectorAll(".carouselItem"));
  itemLength = items.length;

  // Grados por elemento y radio del círculo
  rY = 360 / itemLength;
  // Radio con una base de 250px similar al original
  radius = Math.round(250 / Math.tan(Math.PI / itemLength));

  // Asegurar el contexto 3D
  gsap.set(container, { perspective: 800 });
  gsap.set(carousel,  { transformStyle: "preserve-3d", z: -radius });

  // Posicionar cada ítem en la circunferencia
  items.forEach((el, i) => {
    const inner = el.querySelector(".carouselItemInner");

    gsap.set(el, {
      rotationY: rY * i,
      z: radius,
      transformOrigin: `50% 50% ${-radius}px`,
      autoAlpha: 1
    });

    animateIn(el, inner);
  });

  // Eventos
  window.addEventListener("mousemove", onMouseMove);

  // Ticker GSAP: 60 FPS aprox
  gsap.ticker.add(loop);
});

function animateIn(item, block) {
  const nrX = gsap.utils.random(0, 360, true);
  const nrY = gsap.utils.random(0, 360, true);
  const nx  = gsap.utils.random(-2000, 2000, true);
  const ny  = gsap.utils.random(-2000, 2000, true);
  const nz  = gsap.utils.random(-4000, 0, true);
  const s   = gsap.utils.random(1.5, 2.5, true);
  const d   = gsap.utils.random(0.2, 1.0, true);

  gsap.set(block, { z: nz, rotationY: nrY, rotationX: nrX, x: nx, y: ny, autoAlpha: 0 });

  gsap.to(block, { delay: d, duration: s, rotationY: 0, rotationX: 0, z: 0, ease: "expo.inOut" });
  gsap.to(block, { delay: d, duration: s - 0.5, x: 0, y: 0, autoAlpha: 1, ease: "expo.inOut" });
}

function onMouseMove(e) {
  mouseX = -(-(window.innerWidth * 0.5) + e.pageX) * 0.0025;
  mouseY = -(-(window.innerHeight * 0.5) + e.pageY) * 0.01;
  mouseZ = -radius - (Math.abs(-(window.innerHeight * 0.5) + e.pageY) - 200);
}

function loop() {
  // Rotación vinculada al mouse; agrega un leve auto-rotate
  addX += mouseX + 0.02;
  gsap.to(carousel, { duration: 1, rotationY: addX, rotationX: mouseY, z: mouseZ, ease: "expo.out" });
}

// ===== Carrusel automático para testimonios (sin cambios) =====
document.addEventListener("DOMContentLoaded", function () {
  const row = document.querySelector(".testimonial-carousel .row");
  if (!row) return;
  setInterval(() => {
    row.classList.add("move-left");
    setTimeout(() => {
      row.appendChild(row.firstElementChild);
      row.classList.remove("move-left");
    }, 1000);
  }, 5000);
});
