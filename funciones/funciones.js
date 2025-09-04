//funcion validar el formulario para contacto
function valformulario() {
  const email = document.getElementById('user_email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!email || !subject || !message) {
    alert("Por favor, completa todos los campos.");
    return false;
  }
  return true;
}


// funcion del formateo del precio para el carrito para que se vea con los puntos y el clp
function formatearPrecio(valor) {
    return valor.toLocaleString("es-CL") + " CLP";
}


// FUNCION AGREGAR AL CARRITO
document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".agregar-carrito");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.preventDefault();

            const nombre = boton.getAttribute("data-nombre");
            const precio = parseFloat(boton.getAttribute("data-precio"));
            const imagen = boton.getAttribute("data-imagen");

            let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

            const index = carrito.findIndex(item => item.nombre === nombre);
            if (index !== -1) {
                carrito[index].cantidad += 1;
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            const mensaje = document.getElementById("mensaje-flotante");
            mensaje.classList.add("visible");
            setTimeout(() => mensaje.classList.remove("visible"), 1500);
        });
    });
});


// FUNCION MOSTRAR EL CARRITO
document.addEventListener("DOMContentLoaded", () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const vaciarBtn = document.getElementById("vaciar-carrito");
    const pagarBtn = document.getElementById("pagar-carrito");

    if (listaCarrito) {
        actualizarCarrito();
    }

    // VACIAR CARRITO
    if (vaciarBtn) {
        vaciarBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            actualizarCarrito();
        });
    }

    // PAGAR
    if (pagarBtn) {
        pagarBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            actualizarCarrito();
            alert("¡Pago realizado con éxito!");
        });
    }


// FUNCION ACTUALIZAR CARRITO
    function actualizarCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        listaCarrito.innerHTML = "";
        let total = 0;

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
            if (totalCarrito) totalCarrito.innerHTML = "";
            return;
        }

        carrito.forEach((producto, index) => {
            const item = document.createElement("div");
            item.classList.add("item-carrito");
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            item.innerHTML = `
                <div class="producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                    <span>${producto.nombre}</span>
                </div>
                <div class="cantidad">
                    <button class="menos" data-index="${index}">-</button>
                    <span>${producto.cantidad}</span>
                    <button class="mas" data-index="${index}">+</button>
                </div>
                <div class="subtotal">${formatearPrecio(subtotal)}</div>
                <div class="acciones">
                    <button class="eliminar" data-index="${index}">Eliminar</button>
                </div>
            `;
            listaCarrito.appendChild(item);
        });

        if (totalCarrito) totalCarrito.innerHTML = `<h3>Total: ${formatearPrecio(total)}</h3>`;

        const botonesMas = document.querySelectorAll(".mas");
        botonesMas.forEach(boton => {
            boton.addEventListener("click", () => {
                const i = parseInt(boton.getAttribute("data-index"));
                carrito[i].cantidad += 1;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });

        const botonesMenos = document.querySelectorAll(".menos");
        botonesMenos.forEach(boton => {
            boton.addEventListener("click", () => {
                const i = parseInt(boton.getAttribute("data-index"));
                if (carrito[i].cantidad > 1) {
                    carrito[i].cantidad -= 1;
                } else {
                    carrito.splice(i, 1);
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });

        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", () => {
                const i = parseInt(boton.getAttribute("data-index"));
                carrito.splice(i, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
            });
        });
    }
});



//VALIDAR EL REGISTRO DEL USUARIO

    function validarRegistro() {
        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const errores = [];

        if (!correo.includes('@')) {
            errores.push("El correo debe contener '@'.");
        }

        if (password.length < 5 || password.length > 20) {
            errores.push("La contraseña debe tener entre 5 y 20 caracteres.");
        }

        if (!/[A-Z]/.test(password)) {
            errores.push("La contraseña debe tener al menos una letra mayúscula.");
        }

        if (!/[0-9]/.test(password)) {
            errores.push("La contraseña debe tener al menos un número.");
        }

        if (password !== confirmPassword) {
            errores.push("Las contraseñas no coinciden.");
        }

        const errorContainer = document.getElementById('errores');
        if (errores.length > 0) {
            errorContainer.innerHTML = errores.join('<br>');
        } else {
            errorContainer.innerHTML = "";
            alert("Registro exitoso");
            document.getElementById('registerForm').reset();
        }
    }


// FUNCION DEL CARRUSEL


    function moverCarrusel(direccion) {
        const carrusel = document.getElementById('carousel-productos');
        const anchoItem = carrusel.querySelector('.juego').offsetWidth + 240;
        carrusel.scrollBy({ left: direccion * anchoItem, behavior: 'smooth' });
    }

//FUNCION PARA ENVIAR CORREO DE NOTIFICACION



// Inicializar EmailJS
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("lWDqvGY4Fj9noKYtz");

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!valformulario()) return;

            const userEmail = contactForm.user_email.value;
            const subject = contactForm.subject.value;

            const templateParams = {
                userEmail: userEmail,
                subject: subject,
                message: `Hemos recibido su solicitud correctamente.
Nuestro equipo está revisando su caso y nos pondremos en contacto con usted a la brevedad.

Agradecemos su paciencia y quedamos atentos para asistirle en lo que necesite.

Saludos cordiales,
Microplai.`
            };

            emailjs.send("service_2wpcqd9", "template_nsebgim", templateParams)
                .then(() => {
                    alert("Correo enviado con éxito al usuario");
                    contactForm.reset();
                })
                .catch((error) => {
                    alert("Error al enviar: " + JSON.stringify(error));
                });
        });
    }
});