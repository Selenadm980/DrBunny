// Función para guardar los datos en el localStorage
function saveFormData() {
    // Obtener los valores de los campos del formulario
    const firstName = document.getElementById('firstName')?.value.trim();
    const lastName = document.getElementById('lastName')?.value.trim();
    const birthdayDate = document.getElementById('birthdayDate')?.value;
    const gender = document.querySelector('input[name="genderOptions"]:checked')?.value;
    const height = parseFloat(document.getElementById('height')?.value);
    const weight = parseFloat(document.getElementById('weight')?.value);
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value;

    // Validar que todos los campos estén completos
    if (!firstName || !lastName || !birthdayDate || !gender || !height || !weight || !username || !password) {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }

    // Crear un objeto con los datos
    const formData = {
        firstName,
        lastName,
        birthdayDate,
        gender,
        height,
        weight,
        username,
        password
    };

    // Guardar el objeto en el localStorage como JSON
    localStorage.setItem('userData', JSON.stringify(formData));

    // Mensaje de confirmación
    alert('¡Datos guardados exitosamente!');

    // Redireccionar a la página "inicioSesion.html" después de guardar los datos
    window.location.href = 'inicioSesion.html';
}

// Función para calcular el IMC
function calculateBMI(weight, height) {
    // Convertir altura de centímetros a metros
    height = height / 100;
    const bmi = weight / (height * height);
    return bmi.toFixed(2); // Redondear a 2 decimales
}

// Función para actualizar la información del usuario en la interfaz
function updateUserInfo() {
    const savedData = localStorage.getItem('userData');

    if (savedData) {
        const formData = JSON.parse(savedData);

        // Actualizar nombre completo
        const characterNameElement = document.querySelector('.character-name');
        if (characterNameElement) {
            characterNameElement.textContent = `${formData.firstName} ${formData.lastName}`;
        }

        // Calcular y mostrar IMC
        const bmiValue = calculateBMI(formData.weight, formData.height);
        const bmiElement = document.querySelector('.character-bmi span');
        if (bmiElement) {
            bmiElement.textContent = bmiValue;
        }

        // Cambiar imagen según el género
        const characterImageElement = document.querySelector('.character-image');
        if (characterImageElement) {
            if (formData.gender === 'Femenino') {
                characterImageElement.src = '../src/img/ConejitoHembra.png';
                characterImageElement.alt = 'Conejita';
            } else if (formData.gender === 'Masculino') {
                characterImageElement.src = '../src/img/ConejitoMacho.png';
                characterImageElement.alt = 'Conejito';
            } else {
                // Imagen por defecto si no se ha seleccionado género
                characterImageElement.src = '../src/img/Singenero.png';
                characterImageElement.alt = 'Personaje';
            }
        }
    } else {
        console.log('No hay datos guardados en el localStorage.');
    }
}

// Variable global para almacenar las actividades realizadas
let activitiesData = JSON.parse(localStorage.getItem('activitiesData')) || [];

// Función para abrir el modal con el contenido adecuado
function openActivityModal(activityName) {
    const modalTitle = document.getElementById('activityModalLabel');
    const modalBody = document.getElementById('activityFormContent');

    if (!modalTitle || !modalBody) {
        console.error('El modal no está presente en la página.');
        return;
    }

    modalTitle.textContent = `Registrar ${activityName}`;

    // Limpia el contenido anterior
    modalBody.innerHTML = '';

    // Dependiendo de la actividad, mostramos diferentes campos
    let formContent = '';

    switch (activityName) {
        case 'Caminar':
        case 'Correr':
        case 'Yoga':
        case 'Pesas':
            formContent = `
                <div class="mb-3">
                    <label for="duration" class="form-label">Duración (minutos):</label>
                    <input type="number" class="form-control" id="duration" required>
                </div>
                <div class="mb-3">
                    <label for="calories" class="form-label">Calorías quemadas:</label>
                    <input type="number" class="form-control" id="calories" required>
                </div>
            `;
            break;
        case 'Desayuno':
        case 'Almuerzo':
        case 'Cena':
        case 'Snack':
            formContent = `
                <div class="mb-3">
                    <label for="description" class="form-label">Descripción de la comida:</label>
                    <textarea class="form-control" id="description" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="calories" class="form-label">Calorías consumidas:</label>
                    <input type="number" class="form-control" id="calories" required>
                </div>
            `;
            break;
        case 'Horas Dormidas':
            formContent = `
                <div class="mb-3">
                    <label for="hoursSlept" class="form-label">Horas dormidas:</label>
                    <input type="number" class="form-control" id="hoursSlept" required>
                </div>
            `;
            break;
        case 'Calidad del Sueño':
            formContent = `
                <div class="mb-3">
                    <label for="sleepQuality" class="form-label">Calidad del sueño (1-10):</label>
                    <input type="number" class="form-control" id="sleepQuality" min="1" max="10" required>
                </div>
            `;
            break;
        case 'Leer':
        case 'Meditar':
        case 'Respiración':
        case 'Naturaleza':
            formContent = `
                <div class="mb-3">
                    <label for="duration" class="form-label">Duración (minutos):</label>
                    <input type="number" class="form-control" id="duration" required>
                </div>
                <div class="mb-3">
                    <label for="notes" class="form-label">Notas:</label>
                    <textarea class="form-control" id="notes" rows="3"></textarea>
                </div>
            `;
            break;
        case 'Triste':
        case 'Infeliz':
        case 'Bien':
        case 'Feliz':
            formContent = `
                <div class="mb-3">
                    <label for="moodNotes" class="form-label">Comentarios:</label>
                    <textarea class="form-control" id="moodNotes" rows="3"></textarea>
                </div>
            `;
            break;
        default:
            formContent = `<p>No hay campos para esta actividad.</p>`;
            break;
    }

    modalBody.innerHTML = formContent;

    // Guardamos la actividad actual en un atributo del formulario
    const activityForm = document.getElementById('activityForm');
    if (activityForm) {
        activityForm.setAttribute('data-current-activity', activityName);
    }
}

// Función para manejar el envío del formulario del modal
function handleActivityFormSubmit(e) {
    const activityForm = e.target;
    const activityName = activityForm.getAttribute('data-current-activity');
    let activityData = { activityName, date: new Date().toLocaleDateString() };

    // Recopilar datos del formulario según la actividad
    switch (activityName) {
        case 'Caminar':
        case 'Correr':
        case 'Yoga':
        case 'Pesas':
            activityData.duration = parseFloat(document.getElementById('duration').value);
            activityData.calories = parseFloat(document.getElementById('calories').value);
            break;
        case 'Desayuno':
        case 'Almuerzo':
        case 'Cena':
        case 'Snack':
            activityData.description = document.getElementById('description').value.trim();
            activityData.calories = parseFloat(document.getElementById('calories').value);
            break;
        case 'Horas Dormidas':
            activityData.hoursSlept = parseFloat(document.getElementById('hoursSlept').value);
            break;
        case 'Calidad del Sueño':
            activityData.sleepQuality = parseInt(document.getElementById('sleepQuality').value);
            break;
        case 'Leer':
        case 'Meditar':
        case 'Respiración':
        case 'Naturaleza':
            activityData.duration = parseFloat(document.getElementById('duration').value);
            activityData.notes = document.getElementById('notes').value.trim();
            break;
        case 'Triste':
        case 'Infeliz':
        case 'Bien':
        case 'Feliz':
            activityData.moodNotes = document.getElementById('moodNotes').value.trim();
            break;
        default:
            break;
    }

    // Guardar la actividad en el array
    activitiesData.push(activityData);
    localStorage.setItem('activitiesData', JSON.stringify(activitiesData));

    // Cerrar el modal
    const modalElement = document.getElementById('activityModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
        modal.hide();
    }

    alert('¡Actividad registrada exitosamente!');
}

// Añadir listeners al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Si hay un formulario y no es el del modal, agregar listener para guardar datos
    const form = document.querySelector('form');
    if (form && form.id !== 'activityForm') {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar que el formulario se envíe
            saveFormData();     // Llamar a la función para guardar datos
        });
    }

    // Si estamos en la página donde se muestra la información del usuario, actualizarla
    if (document.querySelector('.character-name')) {
        updateUserInfo();
    }

    // Evento al hacer clic en los botones de actividad
    const activityButtons = document.querySelectorAll('.activity-option, .mood-option');
    if (activityButtons.length > 0) {
        activityButtons.forEach(button => {
            button.addEventListener('click', () => {
                const activityName = button.getAttribute('data-activity');
                openActivityModal(activityName);
            });
        });
    }

    // Manejar el envío del formulario dentro del modal
    const activityForm = document.getElementById('activityForm');
    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleActivityFormSubmit(e);
        });
    }
});
