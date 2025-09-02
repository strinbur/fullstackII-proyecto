//funcion validar el formulario para contacto
function valformulario() {
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    document.getElementById('modalEmail').textContent = email;
    document.getElementById('modalSubject').textContent = subject;
    document.getElementById('modalMessage').textContent = message;

    document.getElementById('contactForm').reset();

    alert("Solicitud enviada con exito");
}

// funcion del formateo del precio para el carrito
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

    // Vaciar carrito
    if (vaciarBtn) {
        vaciarBtn.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            actualizarCarrito();
        });
    }

    // Boton pagar
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



//Validacion del registro de usuario

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
