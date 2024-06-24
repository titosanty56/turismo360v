"use strict";

const apiUrl = 'https://6676ddb9145714a1bd73064f.mockapi.io/turismo360/viajes';

document.addEventListener('DOMContentLoaded', () => {
    obtenerViajes(); // Cargar los viajes al cargar la página
    document.getElementById('formviaje').addEventListener('submit', agregarViaje);

    const btnCrearVarios = document.getElementById('crearVarios');
    btnCrearVarios.addEventListener('click', crearVariosItems);
});

function cargaVariables(event) {//funcion para las variables, asi no repito codigo y las paso como parametro en la funcion que necesito
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const destino = document.getElementById('destino').value;
    const calificacion = document.getElementById('calificacion').value;

    agregarViaje(nombre, destino, calificacion);
    editarViaje(nombre, destino, calificacion);
}


async function obtenerViajes() {
    const tableBody = document.getElementById('tablaviaje');
    tableBody.innerHTML = "";

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
            console.error(`Error al obtener los viajes: ${res.status} ${res.statusText}`);
            return;
        }
        const viajes = await res.json();
        viajes.forEach(viaje => {
            const fila = crearFilaTabla(viaje);
            tableBody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener los viajes:', error);
    }
}

function crearFilaTabla(viaje) {
    const tr = document.createElement('tr');

    const nombreTd = document.createElement('td');
    nombreTd.textContent = viaje.nombre;
    tr.appendChild(nombreTd);

    const destinoTd = document.createElement('td');
    destinoTd.textContent = viaje.destino;
    tr.appendChild(destinoTd);

    const calificacionTd = document.createElement('td');
    calificacionTd.textContent = viaje.calificacion;
    tr.appendChild(calificacionTd);

    const accionesTd = document.createElement('td');

    // Botón para borrar el viaje
    const borrarButton = document.createElement('button');
    borrarButton.textContent = 'Borrar';
    borrarButton.classList.add("btn-borrar");
    borrarButton.addEventListener('click', function() {
        borrarViaje(viaje.id);
    });
    accionesTd.appendChild(borrarButton);

    // Botón para editar el viaje
    const editarButton = document.createElement('button');
    editarButton.textContent = 'Editar';
    editarButton.classList.add("btn-editar");
    editarButton.addEventListener('click', function() {
        // Habilitar la edición en la fila
        nombreTd.innerHTML = `<input type="text" value="${viaje.nombre}">`;
        destinoTd.innerHTML = `<input type="text" value="${viaje.destino}">`;
        calificacionTd.innerHTML = `<input type="number" value="${viaje.calificacion}">`;

        // Mostrar el botón Subir y ocultar el botón Borrar
        accionesTd.removeChild(borrarButton);
        accionesTd.appendChild(subirButton);
        subirButton.style.display = "inline-block";
        borrarButton.style.display = "none";
    });

    // Botón para subir los cambios
    const subirButton = document.createElement('button');
    subirButton.textContent = 'Subir';
    subirButton.style.display = "none"; // Ocultar inicialmente
    subirButton.classList.add("btn-subir");
    subirButton.addEventListener('click', async function() {
        const nombreEditado = nombreTd.querySelector('input').value;
        const destinoEditado = destinoTd.querySelector('input').value;
        const calificacionEditada = calificacionTd.querySelector('input').value;

        try {
            await editarViaje(viaje.id, nombreEditado, destinoEditado, calificacionEditada);

            // Restaurar la vista de la fila con los nuevos valores editados
            nombreTd.textContent = nombreEditado;
            destinoTd.textContent = destinoEditado;
            calificacionTd.textContent = calificacionEditada;

            // Ocultar el botón Subir y mostrar nuevamente el botón Borrar
            accionesTd.removeChild(subirButton);
            accionesTd.appendChild(borrarButton);
            borrarButton.style.display = "inline-block";
        } catch (error) {
            console.error('Error al editar el viaje:', error);
        }
    });

    accionesTd.appendChild(editarButton);

    tr.appendChild(accionesTd);

    return tr;
}

async function agregarViaje(event, nombre, destino, calificacion) {
    event.preventDefault();
    const nuevoViaje = { nombre, destino, calificacion };

    try {
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoViaje)
        });
        if (!res.ok) {
            console.error(`Error al agregar el viaje: ${res.status} ${res.statusText}`);
            return;
        }
        obtenerViajes(); // Actualizar la tabla de viajes
        document.getElementById('formviaje').reset(); // Limpiar el formulario después de agregar
    } catch (error) {
        console.error('Error al agregar el viaje:', error);
    }
}

async function editarViaje(id, nombre, destino, calificacion) {
    const viajeEditado = { nombre, destino, calificacion };

    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(viajeEditado)
        });
        if (!res.ok) {
            console.error(`Error al editar el viaje: ${res.status} ${res.statusText}`);
            return;
        }
    } catch (error) {
        console.error('Error al editar el viaje:', error);
    }
}

async function borrarViaje(id) {
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            console.error(`Error al borrar el viaje: ${res.status} ${res.statusText}`);
            return;
        }
        obtenerViajes(); // Actualizar la tabla de viajes
    } catch (error) {
        console.error('Error al borrar el viaje:', error);
    }
}

async function crearVariosItems() {
    const nuevosViajes = [
        { nombre: 'Juan', destino: 'Las Vegas', calificacion: 8 },
        { nombre: 'Alberto', destino: 'Paris', calificacion: 9 },
        { nombre: 'Marcelo', destino: 'Rio de Janeiro', calificacion: 4 }
    ];

    try {
        const promises = nuevosViajes.map(viaje => {
            return fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(viaje)
            });
        });

        await Promise.all(promises);//todas las promesas
        obtenerViajes(); // Actualizar la tabla de viajes
    } catch (error) {
        console.error('Error al crear varios ítems:', error);
    }
}