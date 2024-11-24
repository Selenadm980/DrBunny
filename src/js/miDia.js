// src/js/miDia.js

(() => {
    // Variable para almacenar actividades realizadas
    let activitiesData = JSON.parse(localStorage.getItem('activitiesData')) || [];

    // Matriz de calorías quemadas por ejercicio
    const exerciseCaloriesPer10Min = {
        'Caminar': 50,
        'Correr': 100,
        'Yoga': 30,
        'Pesas': 80
    };

    // Matriz de calorías por opciones predeterminadas de comida
    const mealOptionCalories = {
        'Pequeño': 300,
        'Mediano': 500,
        'Grande': 700
    };

    // Función para abrir el modal con contenido dinámico
    function openActivityModal(activityName) {
        const modalTitle = document.getElementById('activityModalLabel');
        const modalBody = document.getElementById('activityFormContent');

        if (!modalTitle || !modalBody) {
            console.error('El modal no está presente en la página.');
            return;
        }

        modalTitle.textContent = `Registrar ${activityName}`;
        modalBody.innerHTML = ''; // Limpia el contenido anterior del modal

        let formContent = '';

        switch (activityName) {
            case 'Desayuno':
            case 'Almuerzo':
            case 'Cena':
            case 'Snack':
                formContent = `
                    <div class="mb-3">
                        <label class="form-label">Selecciona el tamaño de la comida:</label>
                        <div class="btn-group d-flex" role="group" aria-label="Opciones de comida">
                            <input type="radio" class="btn-check" name="mealOption" id="smallOption" value="Pequeño" autocomplete="off" required>
                            <label class="btn btn-outline-primary flex-fill" for="smallOption">Pequeño</label>

                            <input type="radio" class="btn-check" name="mealOption" id="mediumOption" value="Mediano" autocomplete="off">
                            <label class="btn btn-outline-primary flex-fill" for="mediumOption">Mediano</label>

                            <input type="radio" class="btn-check" name="mealOption" id="largeOption" value="Grande" autocomplete="off">
                            <label class="btn btn-outline-primary flex-fill" for="largeOption">Grande</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="mealComment" class="form-label">Comentarios sobre la comida:</label>
                        <textarea class="form-control" id="mealComment" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            case 'Caminar':
            case 'Correr':
            case 'Yoga':
            case 'Pesas':
                formContent = `
                    <div class="mb-3">
                        <label for="duration" class="form-label">Duración (minutos):</label>
                        <input type="number" class="form-control" id="duration" min="1" required>
                    </div>
                    <div class="mb-3">
                        <label for="notes" class="form-label">Comentarios:</label>
                        <textarea class="form-control" id="notes" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            case 'Horas Dormidas':
                formContent = `
                    <div class="mb-3">
                        <label for="hoursSlept" class="form-label">Horas Dormidas:</label>
                        <input type="number" class="form-control" id="hoursSlept" min="0" step="0.1" required>
                    </div>
                    <div class="mb-3">
                        <label for="sleepNotes" class="form-label">Comentarios:</label>
                        <textarea class="form-control" id="sleepNotes" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            case 'Calidad del Sueño':
                formContent = `
                    <div class="mb-3">
                        <label for="sleepQuality" class="form-label">Calidad del Sueño (1-10):</label>
                        <input type="number" class="form-control" id="sleepQuality" min="1" max="10" required>
                    </div>
                    <div class="mb-3">
                        <label for="sleepQualityNotes" class="form-label">Comentarios:</label>
                        <textarea class="form-control" id="sleepQualityNotes" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            case 'Leer':
            case 'Meditar':
            case 'Respiración':
            case 'Naturaleza':
                formContent = `
                    <div class="mb-3">
                        <label for="mentalActivityDuration" class="form-label">Duración (minutos):</label>
                        <input type="number" class="form-control" id="mentalActivityDuration" min="1" required>
                    </div>
                    <div class="mb-3">
                        <label for="mentalActivityNotes" class="form-label">Comentarios:</label>
                        <textarea class="form-control" id="mentalActivityNotes" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            case 'Triste':
            case 'Infeliz':
            case 'Bien':
            case 'Feliz':
                formContent = `
                    <div class="mb-3">
                        <label for="moodNotes" class="form-label">Comentarios sobre tu estado de ánimo:</label>
                        <textarea class="form-control" id="moodNotes" rows="3" placeholder="Opcional"></textarea>
                    </div>
                `;
                break;

            default:
                formContent = `<p>No hay campos configurados para esta actividad.</p>`;
                break;
        }

        modalBody.innerHTML = formContent;
        document.getElementById('activityForm').setAttribute('data-current-activity', activityName);
    }

    // Manejar el envío del formulario dentro del modal
    function handleActivityFormSubmit(e) {
        e.preventDefault();
        const activityForm = e.target;
        const activityName = activityForm.getAttribute('data-current-activity');
        let activityData = { activityName, date: new Date().toLocaleDateString() };

        console.log(`Registrando actividad: ${activityName}`); // Log de depuración

        switch (activityName) {
            case 'Desayuno':
            case 'Almuerzo':
            case 'Cena':
            case 'Snack':
                const selectedOption = document.querySelector('input[name="mealOption"]:checked');
                if (selectedOption) {
                    activityData.mealOption = selectedOption.value;
                    activityData.calories = mealOptionCalories[selectedOption.value] || 0;
                    console.log(`Opción de comida seleccionada: ${selectedOption.value}`); // Log de depuración
                } else {
                    alert('Por favor, selecciona una opción de comida.');
                    return;
                }
                activityData.mealComment = document.getElementById('mealComment').value.trim();
                console.log(`Comentario de comida: ${activityData.mealComment}`); // Log de depuración
                break;

            case 'Caminar':
            case 'Correr':
            case 'Yoga':
            case 'Pesas':
                const duration = parseFloat(document.getElementById('duration').value);
                if (isNaN(duration) || duration <= 0) {
                    alert('Por favor, ingresa una duración válida en minutos.');
                    return;
                }
                activityData.duration = duration;
                const caloriesPer10Min = exerciseCaloriesPer10Min[activityName] || 0;
                activityData.calories = (activityData.duration / 10) * caloriesPer10Min;
                activityData.notes = document.getElementById('notes').value.trim();
                console.log(`Duración: ${activityData.duration} minutos, Calorías: ${activityData.calories}, Notas: ${activityData.notes}`); // Log de depuración
                break;

            case 'Horas Dormidas':
                const hoursSlept = parseFloat(document.getElementById('hoursSlept').value);
                if (isNaN(hoursSlept) || hoursSlept < 0) {
                    alert('Por favor, ingresa un número válido de horas dormidas.');
                    return;
                }
                activityData.hoursSlept = hoursSlept;
                activityData.sleepNotes = document.getElementById('sleepNotes').value.trim();
                console.log(`Horas dormidas: ${activityData.hoursSlept}, Notas de sueño: ${activityData.sleepNotes}`); // Log de depuración
                break;

            case 'Calidad del Sueño':
                const sleepQuality = parseInt(document.getElementById('sleepQuality').value);
                if (isNaN(sleepQuality) || sleepQuality < 1 || sleepQuality > 10) {
                    alert('Por favor, ingresa una calidad de sueño entre 1 y 10.');
                    return;
                }
                activityData.sleepQuality = sleepQuality;
                activityData.sleepQualityNotes = document.getElementById('sleepQualityNotes').value.trim();
                console.log(`Calidad del sueño: ${activityData.sleepQuality}, Notas de calidad: ${activityData.sleepQualityNotes}`); // Log de depuración
                break;

            case 'Leer':
            case 'Meditar':
            case 'Respiración':
            case 'Naturaleza':
                const mentalDuration = parseFloat(document.getElementById('mentalActivityDuration').value);
                if (isNaN(mentalDuration) || mentalDuration <= 0) {
                    alert('Por favor, ingresa una duración válida en minutos.');
                    return;
                }
                activityData.duration = mentalDuration;
                activityData.mentalActivityNotes = document.getElementById('mentalActivityNotes').value.trim();
                console.log(`Duración actividad mental: ${activityData.duration} minutos, Notas: ${activityData.mentalActivityNotes}`); // Log de depuración
                break;

            case 'Triste':
            case 'Infeliz':
            case 'Bien':
            case 'Feliz':
                activityData.moodNotes = document.getElementById('moodNotes').value.trim();
                console.log(`Notas de estado de ánimo: ${activityData.moodNotes}`); // Log de depuración
                break;

            default:
                alert('Actividad no configurada.');
                return;
        }

        activitiesData.push(activityData);
        localStorage.setItem('activitiesData', JSON.stringify(activitiesData));
        console.log('Datos almacenados en localStorage:', activitiesData); // Log de depuración

        const modalElement = document.getElementById('activityModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }

        alert('¡Actividad registrada exitosamente!');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const activityButtons = document.querySelectorAll('.activity-option, .mood-option');
        if (activityButtons.length > 0) {
            activityButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const activityName = button.getAttribute('data-activity');
                    openActivityModal(activityName);
                });
            });
        }

        const activityForm = document.getElementById('activityForm');
        if (activityForm) {
            activityForm.addEventListener('submit', handleActivityFormSubmit);
        }

        // Opcional: Mostrar las actividades registradas en la consola al cargar la página
        console.log('Actividades registradas:', activitiesData);
    });
})();
