// estadisticas.js

// Obtener los datos de actividades del localStorage
const activitiesData = JSON.parse(localStorage.getItem('activitiesData')) || [];

// Crear contenedores para almacenar datos procesados por categorías
const exerciseData = [];
const mealData = [];
const sleepData = [];
const mentalActivityData = [];
const moodData = [];

// Función para obtener el comentario correcto basado en la actividad
function obtenerComentario(activity) {
    if (activity.mealComment) return activity.mealComment;
    if (activity.notes) return activity.notes;
    if (activity.sleepNotes) return activity.sleepNotes;
    if (activity.sleepQualityNotes) return activity.sleepQualityNotes;
    if (activity.mentalActivityNotes) return activity.mentalActivityNotes;
    if (activity.moodNotes) return activity.moodNotes;
    return 'Sin comentarios';
}

// Procesar los datos y clasificarlos
activitiesData.forEach(entry => {
    switch (entry.activityName) {
        case 'Caminar':
        case 'Correr':
        case 'Yoga':
        case 'Pesas':
            exerciseData.push({
                name: entry.activityName,
                duration: entry.duration || 0,
                calories: entry.calories || 0
            });
            break;

        case 'Desayuno':
        case 'Almuerzo':
        case 'Cena':
        case 'Snack':
            mealData.push({
                name: entry.activityName,
                option: entry.mealOption || 'N/A',
                calories: entry.calories || 0,
                comment: entry.mealComment || 'Sin comentarios'
            });
            break;

        case 'Horas Dormidas':
            sleepData.push({
                hours: entry.hoursSlept || 0,
                comments: entry.sleepNotes || 'Sin comentarios'
            });
            break;

        case 'Calidad del Sueño':
            sleepData.push({
                quality: entry.sleepQuality || 0,
                comments: entry.sleepQualityNotes || 'Sin comentarios'
            });
            break;

        case 'Leer':
        case 'Meditar':
        case 'Respiración':
        case 'Naturaleza':
            mentalActivityData.push({
                name: entry.activityName,
                duration: entry.duration || 0,
                comments: entry.mentalActivityNotes || 'Sin comentarios'
            });
            break;

        case 'Triste':
        case 'Infeliz':
        case 'Bien':
        case 'Feliz':
            moodData.push({
                mood: entry.activityName,
                comments: entry.moodNotes || 'Sin comentarios'
            });
            break;

        default:
            console.warn(`Actividad desconocida: ${entry.activityName}`);
            break;
    }
});

// **Gráfico de Ejercicio**
const exerciseLabels = exerciseData.map(item => item.name);
const exerciseDurations = exerciseData.map(item => item.duration);
const exerciseCalories = exerciseData.map(item => item.calories);

const exerciseCtx = document.getElementById('exerciseChart').getContext('2d');
new Chart(exerciseCtx, {
    type: 'bar',
    data: {
        labels: exerciseLabels,
        datasets: [
            {
                label: 'Duración (min)',
                data: exerciseDurations,
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            },
            {
                label: 'Calorías Quemadas',
                data: exerciseCalories,
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// **Gráfico de Alimentación**
const mealLabels = mealData.map(item => `${item.name} (${item.option})`);
const mealCalories = mealData.map(item => item.calories);

const mealCtx = document.getElementById('mealChart').getContext('2d');
new Chart(mealCtx, {
    type: 'bar',
    data: {
        labels: mealLabels,
        datasets: [{
            label: 'Calorías Consumidas',
            data: mealCalories,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// **Gráfico de Sueño**
const sleepLabels = sleepData.map((item, index) => {
    if (item.hours !== undefined) {
        return `Horas Dormidas ${index + 1}`;
    } else {
        return `Calidad del Sueño ${index + 1}`;
    }
});
const sleepHours = sleepData.map(item => item.hours || 0);
const sleepQuality = sleepData.map(item => item.quality || 0);

const sleepCtx = document.getElementById('sleepChart').getContext('2d');
new Chart(sleepCtx, {
    type: 'line',
    data: {
        labels: sleepLabels,
        datasets: [
            {
                label: 'Horas Dormidas',
                data: sleepHours,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4
            },
            {
                label: 'Calidad del Sueño',
                data: sleepQuality,
                borderColor: 'rgba(255, 159, 64, 1)',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// **Gráfico de Salud Mental**
const mentalLabels = mentalActivityData.map(item => item.name);
const mentalDurations = mentalActivityData.map(item => item.duration);

const mentalCtx = document.getElementById('mentalChart').getContext('2d');
new Chart(mentalCtx, {
    type: 'bar',
    data: {
        labels: mentalLabels,
        datasets: [{
            label: 'Duración (min)',
            data: mentalDurations,
            backgroundColor: 'rgba(153, 102, 255, 0.6)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// **Gráfico de Estado de Ánimo**
const moodLabels = ['Triste', 'Infeliz', 'Bien', 'Feliz'];
const moodCounts = moodLabels.map(label => moodData.filter(item => item.mood === label).length);

const moodCtx = document.getElementById('moodChart').getContext('2d');
new Chart(moodCtx, {
    type: 'pie',
    data: {
        labels: moodLabels,
        datasets: [{
            label: 'Frecuencia de Estado de Ánimo',
            data: moodCounts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }
});

// **Consejo Personalizado**
const userData = JSON.parse(localStorage.getItem('userData')) || {};
const weight = parseFloat(userData.weight) || 0; // kg
const height = parseFloat(userData.height) / 100 || 0; // m
const birthday = userData.birthdayDate ? new Date(userData.birthdayDate) : null;

let advice = '';
if (birthday) {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    if (today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
        age--;
    }
    let idealWeight = userData.gender === 'Masculino' ? 50 + 2.3 * ((height * 100 / 2.54) - 60) : 45.5 + 2.3 * ((height * 100 / 2.54) - 60);
    idealWeight *= 0.453592; // Convertir a kg
    const weightDifference = weight - idealWeight;
    const percentageDifference = (weightDifference / idealWeight) * 100;

    if (Math.abs(percentageDifference) <= 5) {
        advice = '¡Estás en tu peso ideal!';
    } else if (percentageDifference > 5) {
        advice = 'Considera ajustar tu peso.';
    } else {
        advice = 'Podrías ganar algo de peso.';
    }
} else {
    advice = 'No se puede calcular el peso ideal.';
}
document.getElementById('adviceText').textContent = advice;

// **Comentarios con paginación**
const commentsPerPage = 4;
let currentPage = 1;

// Crear las páginas de comentarios
function paginateComments(page) {
    const startIndex = (page - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;

    // Filtrar comentarios para la página actual
    const paginatedComments = activitiesData.slice(startIndex, endIndex);

    // Limpiar contenedor y renderizar los comentarios
    commentsContainer.innerHTML = paginatedComments
        .map(activity => {
            const comment = obtenerComentario(activity);
            return `
                <div class="card custom-card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${activity.activityName}</h5>
                        <p class="card-text">${comment}</p>
                    </div>
                </div>`;
        })
        .join('');

    // Actualizar controles de paginación
    renderPaginationControls(page);
}

// Renderizar los controles de paginación
function renderPaginationControls(page) {
    const totalPages = Math.ceil(activitiesData.length / commentsPerPage);
    const paginationContainer = document.getElementById('paginationControls');

    paginationContainer.innerHTML = `
        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item ${page === 1 ? 'disabled' : ''}">
                    <button class="page-link" onclick="changePage(${page - 1})">Anterior</button>
                </li>
                ${Array.from({ length: totalPages }, (_, i) => i + 1)
                    .map(p => `
                        <li class="page-item ${p === page ? 'active' : ''}">
                            <button class="page-link" onclick="changePage(${p})">${p}</button>
                        </li>`)
                    .join('')}
                <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                    <button class="page-link" onclick="changePage(${page + 1})">Siguiente</button>
                </li>
            </ul>
        </nav>`;
}

// Cambiar a una página específica
function changePage(page) {
    currentPage = page;
    paginateComments(page);
}

// Inicializar la primera página
paginateComments(currentPage);
