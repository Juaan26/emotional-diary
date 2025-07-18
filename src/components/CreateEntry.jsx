import React, { useState } from 'react';

export function CreateEntry({ entrieList }) {
    const [entries, setEntries] = useState(entrieList);

    const createNewEntry = () => {
        const nextId = entries.length > 0
            ? entries[entries.length - 1].id + 1
            : 1;

        const newEntry = createEmptyEntry(nextId);
        console.log("Nueva entrada creada:", newEntry);
        setEntries(prev => [...prev, newEntry]);
    };

    return (
        <div>
            <button className='create-entry-btn' onClick={ createNewEntry }>+</button>
            <h3>Entradas:</h3>
            <pre>{ JSON.stringify(entries, null, 2) }</pre>
        </div>
    );
};


function createEmptyEntry(nextId) {
    const date = new Date();

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(date);

    return {
        id: nextId,
        title: '',
        content: '',
        date: capitalizarPrimeraLetra(formattedDate),
        goodThings: [],
        badThings: []
    };
}

function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

