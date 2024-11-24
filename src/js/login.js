document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('button[type="button"]');

    loginButton.addEventListener('click', () => {
        // Obtener el usuario y la contraseña del formulario
        const enteredUsername = document.getElementById('typeEmailX').value;
        const enteredPassword = document.getElementById('typePasswordX').value;

        // Obtener los datos almacenados en localStorage
        const savedData = JSON.parse(localStorage.getItem('userData'));

        // Validar los datos ingresados contra los datos guardados
        if (savedData && enteredUsername === savedData.username && enteredPassword === savedData.password) {
            // Si los datos coinciden, redirigir a la página miDia.html
            window.location.href = "../view/miDia.html";
        } else {
            // Si no coinciden, mostrar un mensaje de error y no redirigir
            alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
        }
    });
});
