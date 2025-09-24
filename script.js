const intro = document.getElementById('intro');
const contenido = document.getElementById('contenido');
const nubeIzq = document.querySelector('.nube.izquierda');
const nubeDer = document.querySelector('.nube.derecha');
const logo = document.getElementById('logo');
const navbar = document.getElementById('navbar');

let progreso = 0; 
const velocidad = 0.002; 
let completado = false;

contenido.style.display = 'none';

function actualizarIntro() {
  progreso = Math.max(0, Math.min(1, progreso));

  nubeIzq.style.transform = `translateX(-${progreso * 50}%)`;
  nubeDer.style.transform = `translateX(${progreso * 50}%)`;
  logo.style.opacity = progreso;

  if (completado) {
    const rect = logo.getBoundingClientRect();
    if (rect.top <= 10) {
      logo.style.transform = 'translate(-50%, -50%) scale(0.4)';
      navbar.style.opacity = 1;
      navbar.style.transform = 'translateY(0)';
    } else {
      logo.style.transform = 'translate(-50%, -50%) scale(1)';
      navbar.style.opacity = 0;
      navbar.style.transform = 'translateY(-100%)';
    }
  }

  if (progreso >= 1 && !completado) {
    completarIntro();
  }

  if (progreso < 1 && completado) {
    completado = false;
    contenido.style.display = 'none';
    intro.style.display = 'block';
    navbar.style.opacity = 0;
    navbar.style.transform = 'translateY(-100%)';
    logo.style.transform = 'translate(-50%, -50%) scale(1)';
  }
}

function completarIntro() {
  completado = true;
  contenido.style.display = 'block';
}

window.addEventListener('wheel', (e) => {
  progreso += e.deltaY * velocidad;
  actualizarIntro();
});



let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;
  progreso += deltaY * velocidad;
  touchStartY = touchY;
  actualizarIntro();
}, { passive: true });


const carrusel = document.querySelector('.carrusel');
const flechaIzquierda = document.querySelector('.flecha.izquierda');
const flechaDerecha = document.querySelector('.flecha.derecha');

flechaIzquierda.addEventListener('click', () => {
  carrusel.scrollBy({
    left: -window.innerWidth * 0.8,
    behavior: 'smooth'
  });
});

flechaDerecha.addEventListener('click', () => {
  carrusel.scrollBy({
    left: window.innerWidth * 0.8,
    behavior: 'smooth'
  });
});


document.querySelectorAll('.acordeon-titulo').forEach((btn) => {
  btn.addEventListener('click', () => {
    const contenido = btn.nextElementSibling;
    const abierto = contenido.style.maxHeight && contenido.style.maxHeight !== '0px';

    document.querySelectorAll('.acordeon-contenido').forEach((c) => {
      c.style.maxHeight = null;
    });

    if (!abierto) {
      contenido.style.maxHeight = contenido.scrollHeight + "px";
    }
  });
});


document.querySelectorAll('.ver-mas').forEach((boton) => {
  boton.addEventListener('click', () => {
    const lista = boton.previousElementSibling;
    const extras = [
      "6. Moaning Lisa",
      "7. The Call of the Simpsons",
      "8. The Telltale Head",
      "9. Life on the Fast Lane",
      "10. Homer's Night Out"
    ];

    extras.forEach(ep => {
      const li = document.createElement('li');
      li.textContent = ep;
      lista.appendChild(li);
    });

    boton.remove();
  });
});


document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Mensaje enviado correctamente. ¡Gracias!");
  this.reset(); // Limpia el formulario
});
