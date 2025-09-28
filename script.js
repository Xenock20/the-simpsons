const intro = document.getElementById('intro');
const contenido = document.getElementById('contenido');
const nubeIzq = document.querySelector('.nube.izquierda');
const nubeDer = document.querySelector('.nube.derecha');
const logo = document.getElementById('logo');
const navbar = document.getElementById('navbar');

let progreso = 0; 
const velocidad = 0.002; 
let completado = false;

// Solo ejecutar animación de intro si estamos en la página index
if (contenido) {
  contenido.style.display = 'none';
}

function actualizarIntro() {
  // Solo ejecutar si estamos en la página index
  if (!intro || !contenido || !nubeIzq || !nubeDer || !logo || !navbar) {
    return;
  }

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
  if (contenido) {
    completado = true;
    contenido.style.display = 'block';
  }
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

// Solo agregar event listeners si los elementos existen
if (flechaIzquierda && carrusel) {
  flechaIzquierda.addEventListener('click', () => {
    carrusel.scrollBy({
      left: -window.innerWidth * 0.8,
      behavior: 'smooth'
    });
  });
}

if (flechaDerecha && carrusel) {
  flechaDerecha.addEventListener('click', () => {
    carrusel.scrollBy({
      left: window.innerWidth * 0.8,
      behavior: 'smooth'
    });
  });
}


// Solo ejecutar si hay acordeones en la página
const acordeonTitulos = document.querySelectorAll('.acordeon-titulo');
if (acordeonTitulos.length > 0) {
  acordeonTitulos.forEach((btn) => {
    btn.addEventListener('click', () => {
      const contenido = btn.nextElementSibling;
      const abierto = contenido.classList.contains('activo');

      // Cerrar todos los acordeones
      document.querySelectorAll('.acordeon-contenido').forEach((c) => {
        c.classList.remove('activo');
        c.style.maxHeight = '0';
      });
      
      document.querySelectorAll('.acordeon-titulo').forEach((b) => {
        b.classList.remove('activo');
      });

      // Abrir el acordeón clickeado si no estaba abierto
      if (!abierto) {
        contenido.classList.add('activo');
        btn.classList.add('activo');
        contenido.style.maxHeight = contenido.scrollHeight + "px";
      }
    });
  });
}


// Solo ejecutar si hay botones "ver más" en la página
const botonesVerMas = document.querySelectorAll('.ver-mas');
if (botonesVerMas.length > 0) {
  botonesVerMas.forEach((boton) => {
    boton.addEventListener('click', () => {
      const lista = boton.previousElementSibling;
      const temporada = boton.closest('.temporada');
      const titulo = temporada.querySelector('.acordeon-titulo').textContent;
      
      let extras = [];
      
      // Episodios adicionales según la temporada
      if (titulo.includes('Temporada 1')) {
        extras = ["14. Homer's Odyssey (Part 2)", "15. Bart the Genius (Part 2)", "16. There's No Disgrace Like Home (Part 2)"];
      } else if (titulo.includes('Temporada 2')) {
        extras = ["23. Homer vs. Lisa and the 8th Commandment (Part 2)", "24. Principal Charming (Part 2)", "25. Oh Brother, Where Art Thou? (Part 2)"];
      } else if (titulo.includes('Temporada 3')) {
        extras = ["25. Bart's Friend Falls in Love (Part 2)", "26. Brother, Can You Spare Two Dimes? (Part 2)", "27. Lisa's Pony (Part 2)"];
      } else if (titulo.includes('Temporada 4')) {
        extras = ["23. Krusty Gets Kancelled (Part 2)", "24. Marge in Chains (Part 2)", "25. Whacking Day (Part 2)"];
      } else if (titulo.includes('Temporada 5')) {
        extras = ["23. Secrets of a Successful Marriage (Part 2)", "24. Lady Bouvier's Lover (Part 2)", "25. The Boy Who Knew Too Much (Part 2)"];
      } else if (titulo.includes('Temporada 6')) {
        extras = ["25. Who Shot Mr. Burns? (Part 3)", "26. Treehouse of Horror VI (Part 2)", "27. Summer of 4 Ft. 2 (Part 2)"];
      } else if (titulo.includes('Temporada 7')) {
        extras = ["26. Natural Born Kissers (Part 2)", "27. Lost Our Lisa (Part 2)", "28. King of the Hill (Part 2)"];
      } else if (titulo.includes('Temporada 8')) {
        extras = ["26. The Secret War of Lisa Simpson (Part 2)", "27. Homer's Enemy (Part 2)", "28. In Marge We Trust (Part 2)"];
      } else if (titulo.includes('Temporada 9')) {
        extras = ["26. Natural Born Kissers (Part 2)", "27. Lost Our Lisa (Part 2)", "28. King of the Hill (Part 2)"];
      } else if (titulo.includes('Temporada 10')) {
        extras = ["24. Thirty Minutes over Tokyo (Part 2)", "25. They Saved Lisa's Brain (Part 2)", "26. Monty Can't Buy Me Love (Part 2)"];
      } else if (titulo.includes('Temporada 11')) {
        extras = ["23. Behind the Laughter (Part 2)", "24. It's a Mad, Mad, Mad, Mad Marge (Part 2)", "25. Last Tap Dance in Springfield (Part 2)"];
      } else if (titulo.includes('Temporada 12')) {
        extras = ["22. Simpsons Safari (Part 2)", "23. Children of a Lesser Clod (Part 2)", "24. I'm Goin' to Praiseland (Part 2)"];
      } else if (titulo.includes('Temporada 13')) {
        extras = ["23. Poppa's Got a Brand New Badge (Part 2)", "24. The Frying Game (Part 2)", "25. Little Girl in the Big Ten (Part 2)"];
      } else if (titulo.includes('Temporada 14')) {
        extras = ["23. Moe Baby Blues (Part 2)", "24. The Bart of War (Part 2)", "25. Brake My Wife, Please (Part 2)"];
      } else if (titulo.includes('Temporada 15')) {
        extras = ["23. Future-Drama (Part 2)", "24. Fraudcast News (Part 2)", "25. The Way We Weren't (Part 2)"];
      }

      extras.forEach(ep => {
        const li = document.createElement('li');
        li.textContent = ep;
        li.style.opacity = '0';
        li.style.transform = 'translateY(-10px)';
        lista.appendChild(li);
        
        // Animación de entrada
        setTimeout(() => {
          li.style.transition = 'all 0.3s ease';
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, 100);
      });

      boton.textContent = '¡Episodios cargados!';
      boton.style.background = '#4caf50';
      boton.disabled = true;
      
      setTimeout(() => {
        boton.remove();
      }, 2000);
    });
  });
}


// Funcionalidad del formulario de contacto
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Validar campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    
    // Validaciones
    if (!nombre) {
      mostrarError("Por favor, ingresa tu nombre.");
      return;
    }
    
    if (!email) {
      mostrarError("Por favor, ingresa tu email.");
      return;
    }
    
    if (!validarEmail(email)) {
      mostrarError("Por favor, ingresa un email válido.");
      return;
    }
    
    if (!mensaje) {
      mostrarError("Por favor, escribe un mensaje.");
      return;
    }
    
    // Simular envío
    mostrarCarga();
    
    setTimeout(() => {
      ocultarCarga();
      mostrarExito("¡Mensaje enviado correctamente! Te responderemos pronto.");
      contactForm.reset();
    }, 2000);
  });
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarError(mensaje) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'mensaje-error';
  errorDiv.style.cssText = `
    background: #ffebee;
    color: #c62828;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    border-left: 4px solid #c62828;
  `;
  errorDiv.textContent = mensaje;
  
  const form = document.getElementById("contact-form");
  form.insertBefore(errorDiv, form.firstChild);
  
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 5000);
}

function mostrarCarga() {
  const boton = document.querySelector('#contact-form button[type="submit"]');
  boton.disabled = true;
  boton.textContent = 'Enviando...';
  boton.style.opacity = '0.7';
}

function ocultarCarga() {
  const boton = document.querySelector('#contact-form button[type="submit"]');
  boton.disabled = false;
  boton.textContent = 'Enviar';
  boton.style.opacity = '1';
}

function mostrarExito(mensaje) {
  const exitoDiv = document.createElement('div');
  exitoDiv.className = 'mensaje-exito';
  exitoDiv.style.cssText = `
    background: #e8f5e8;
    color: #2e7d32;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
    border-left: 4px solid #4caf50;
    text-align: center;
    font-weight: bold;
  `;
  exitoDiv.textContent = mensaje;
  
  const form = document.getElementById("contact-form");
  form.insertBefore(exitoDiv, form.firstChild);
  
  setTimeout(() => {
    if (exitoDiv.parentNode) {
      exitoDiv.parentNode.removeChild(exitoDiv);
    }
  }, 5000);
}

// Funcionalidad de la galería
document.addEventListener('DOMContentLoaded', function() {
  // Crear lightbox para la galería
  const galeriaImagenes = document.querySelectorAll('.imagen-card img');
  
  galeriaImagenes.forEach(imagen => {
    imagen.addEventListener('click', function() {
      abrirLightbox(this.src, this.alt);
    });
  });
});

function abrirLightbox(src, alt) {
  // Crear overlay del lightbox
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `;

  // Crear imagen del lightbox
  const imagen = document.createElement('img');
  imagen.src = src;
  imagen.alt = alt;
  imagen.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  `;

  // Crear botón de cerrar
  const cerrarBtn = document.createElement('button');
  cerrarBtn.innerHTML = '×';
  cerrarBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 30px;
    background: none;
    border: none;
    color: white;
    font-size: 3rem;
    cursor: pointer;
    z-index: 10001;
  `;

  // Crear contenedor para la imagen
  const contenedor = document.createElement('div');
  contenedor.style.cssText = `
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `;

  contenedor.appendChild(imagen);
  contenedor.appendChild(cerrarBtn);
  overlay.appendChild(contenedor);
  document.body.appendChild(overlay);

  // Eventos para cerrar
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay || e.target === cerrarBtn) {
      document.body.removeChild(overlay);
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }
  });
}