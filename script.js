const API_URL = "https://api.thecatapi.com/v1";

function obtenerApiKey() {
    const apiKey = document.getElementById("apiKey").value.trim();

    if (!apiKey) {
        alert("La API Key es obligatoria.");
        return null;
    }

    return apiKey;
}

async function consumirAPI(endpoint) {
    const apiKey = obtenerApiKey();

    if (!apiKey) return null;

    try {
        const respuesta = await fetch(`${API_URL}${endpoint}`, {
            method: "GET",
            headers: {
                "x-api-key": apiKey
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API.");
        }

        return await respuesta.json();

    } catch (error) {
        alert(error.message);
        return null;
    }
}

async function obtenerRazas() {
    return await consumirAPI("/breeds");
}

async function FiltradoNombre() {

    const nombre = document.getElementById("name").value.trim().toLowerCase();

    if (!nombre) {
        alert("Ingrese una raza.");
        return;
    }

    const datos = await obtenerRazas();

    if (!datos) return;

    const resultadoFiltro = datos.filter(gato =>
        gato.name.toLowerCase().includes(nombre)
    );

    mostrarResultados(resultadoFiltro);
}

async function Temperamento() {

    const temperamento = document.getElementById("temperament").value.trim().toLowerCase();

    if (!temperamento) {
        alert("Ingrese un temperamento.");
        return;
    }

    const datos = await obtenerRazas();

    if (!datos) return;

    const resultadoFiltro = datos.filter(gato =>
        gato.temperament.toLowerCase().includes(temperamento)
    );

    mostrarResultados(resultadoFiltro);
}

async function Origen() {

    const origen = document.getElementById("origin").value.trim().toLowerCase();

    if (!origen) {
        alert("Ingrese un origen.");
        return;
    }

    const datos = await obtenerRazas();

    if (!datos) return;

    const resultadoFiltro = datos.filter(gato =>
        gato.origin.toLowerCase().includes(origen)
    );

    mostrarResultados(resultadoFiltro);
}

function mostrarResultados(datos) {

    const resultado = document.getElementById("resultado");

    if (!datos || datos.length === 0) {
        resultado.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    resultado.innerHTML = datos.map(gato => `
        <div class="gato">
            <h3>${gato.name}</h3>
            <p><strong>Origen:</strong> ${gato.origin}</p>
            <p><strong>Temperamento:</strong> ${gato.temperament}</p>
            <p><strong>Esperanza de vida:</strong> ${gato.life_span} años</p>
        </div>
    `).join("");
}