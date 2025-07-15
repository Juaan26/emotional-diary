import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";

export function EntryPage({ entries, updateEntry }) {
    const params = useParams();
    const [entry, setEntry] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        content: "",
        goodThings: [],
        badThings: []
    });

    // Buscamos la entrada cuando entries o el id cambien
    useEffect(() => {
        if (!entries) return;
        const found = entries.find(e => String(e.id) === String(params.id));
        setEntry(found || null);
    }, [entries, params.id]);

    // Actualizamos el formData al cambiar entry
    useEffect(() => {
        if (entry) {
            setFormData({
                title: entry.title || "",
                date: entry.date || "",
                content: entry.content || "",
                goodThings: entry.goodThings || [],
                badThings: entry.badThings || []
            });
        }
    }, [entry]);

    // Ref para manejar el timeout del debounce
    const debounceTimeout = useRef(null);

    useEffect(() => {
        // Si no hay entrada, no hacemos nada
        if (!entry) return;

        // Limpiamos timeout anterior
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Ponemos un timeout para llamar a updateEntry tras 1 segundo sin cambios
        debounceTimeout.current = setTimeout(() => {
            updateEntry(params.id, formData);
        }, 1000); // 1000 ms = 1 segundo

        // Limpiar el timeout si el componente se desmonta o cambia formData
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [formData, entry, params.id, updateEntry]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "id") return;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!entry) return <h2>Entrada no encontrada</h2>;

    return (
        <div className="entry-page-container">
            <form className="entry-page">
                <input
                    type="text"
                    name="title"
                    value={ formData.title }
                    onChange={ handleChange }
                />
                <input
                    type="text"
                    name="date"
                    value={ formData.date }
                    disabled
                />
                <textarea
                    className="entry-page-content"
                    name="content"
                    value={ formData.content }
                    onChange={ handleChange }
                />
            </form>

            <form className="entry-page-good">
                <input
                    type="text"
                    name="goodThings"
                    value={ formData.goodThings }
                    onChange={ handleChange }
                />
            </form>

            <form className="entry-page-bad">
                <input
                    type="text"
                    name="badThings"
                    value={ formData.badThings }
                    onChange={ handleChange }
                />
            </form>
        </div>
    );
}
