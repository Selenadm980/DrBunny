let map; // Variable global para el mapa
let userLocation; // Variable para almacenar la ubicación del usuario
let markers = []; // Arreglo para almacenar los marcadores de lugares

// Cargar los iconos de marcador predeterminados de Leaflet
const userIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],  // Tamaño del icono
    iconAnchor: [12, 41], // Punto de anclaje del icono
    popupAnchor: [1, -34], // Donde se abre el popup
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    shadowSize: [41, 41]  // Tamaño de la sombra
});

const placeIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// Función para inicializar el mapa
function initMap(lat, lon) {
    if (!map) {
        // Crear el mapa si no está inicializado
        map = L.map('map').setView([lat, lon], 15);

        // Cargar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);
    } else {
        // Si el mapa ya está inicializado, centramos la vista en la nueva ubicación
        map.setView([lat, lon], 15);
    }

    // Añadir marcador para la ubicación del usuario
    L.marker([lat, lon], { icon: userIcon }).addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();

    // Solucionar posibles problemas con el tamaño del mapa
    setTimeout(() => {
        map.invalidateSize();
    }, 500);
}

// Función para obtener la ubicación del usuario
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                userLocation = { lat, lon }; // Guardar la ubicación del usuario
                initMap(lat, lon); // Inicializar el mapa con la ubicación
                fetchNearbyPlaces(lat, lon); // Buscar lugares cercanos
            },
            function () {
                document.getElementById("error-message").style.display = "block";
            }
        );
    } else {
        document.getElementById("error-message").textContent = "Geolocalización no soportada por tu navegador.";
        document.getElementById("error-message").style.display = "block";
    }
}

// Función para buscar lugares cercanos usando Overpass API
function fetchNearbyPlaces(lat, lon) {
    const placeType = document.getElementById("placeType").value;
    const radius = parseInt(document.getElementById("radius").value);

    // Construir la consulta Overpass
    const query = `
        [out:json];
        (
            node["leisure"="${placeType}"](around:${radius},${lat},${lon});
            node["amenity"="${placeType}"](around:${radius},${lat},${lon});
            node["sport"="${placeType}"](around:${radius},${lat},${lon});
        );
        out body;
    `;

    const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

    // Eliminar marcadores anteriores
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.elements.length === 0) {
                alert("No se encontraron lugares cercanos.");
                return;
            }

            data.elements.forEach(element => {
                const marker = L.marker([element.lat, element.lon], { icon: placeIcon })
                    .addTo(map)
                    .bindPopup(element.tags.name || "Lugar sin nombre");
                markers.push(marker);
            });
        })
        .catch(error => {
            console.error("Error al obtener lugares:", error);
        });
}

// Event listener para el botón de obtener ubicación
document.getElementById("getLocationBtn").addEventListener("click", function () {
    getLocation();
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado. Listo para inicializar.");
});
