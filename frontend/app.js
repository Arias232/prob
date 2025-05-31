const apiUrl = '/api/notes'; // Esta URL será manejada por Kubernetes Services/Ingress

async function fetchNotes() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = ''; // Limpiar lista actual
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note.content;
            notesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener notas:', error);
        alert('No se pudieron cargar las notas.');
    }
}

async function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteContent = noteInput.value.trim();

    if (!noteContent) {
        alert('Por favor, escribe algo en la nota.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContent }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        noteInput.value = ''; // Limpiar input
        fetchNotes(); // Recargar notas
    } catch (error) {
        console.error('Error al agregar nota:', error);
        alert('No se pudo agregar la nota.');
    }
}

// Cargar notas al iniciar
document.addEventListener('DOMContentLoaded', fetchNotes);