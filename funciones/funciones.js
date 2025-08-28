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