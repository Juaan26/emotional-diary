import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";

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
    const navigate = useNavigate();
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
    const arrow = `<=`
    return (
        <div className="entry-page-container">
            <button className="entry-page-return" onClick={ () => navigate("/") }>{ arrow }  </button>
            <form className="entry-page">
                <label>
                    Título:
                    <input
                        type="text"
                        name="title"
                        value={ formData.title }
                        onChange={ handleChange }
                    />
                    <div className="entrypage-underline"></div>
                </label>

                <label>
                    Fecha:
                    <input
                        type="text"
                        name="date"
                        value={ formData.date }
                        disabled
                    />
                    <div className="entrypage-underline2"></div>
                </label>

                <textarea
                    className="entry-page-content"
                    name="content"
                    spellCheck="false"
                    value={ formData.content }
                    onChange={ handleChange }
                />
            </form>

            {/* GOOD THINGS */ }
            <form className="entry-page-good">
                <label>Cosas buenas:</label>
                { formData.goodThings.map((item, index) => (
                    <input
                        key={ index }
                        type="text"
                        value={ item }
                        onChange={ (e) => {
                            const newGoodThings = [...formData.goodThings];
                            newGoodThings[index] = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                goodThings: newGoodThings
                            }));
                        } }
                    />
                )) }
                <button
                    type="button"
                    onClick={ () =>
                        setFormData(prev => ({
                            ...prev,
                            goodThings: [...prev.goodThings, ""]
                        }))
                    }
                >
                    +
                </button>
            </form>

            {/* BAD THINGS */ }
            <form className="entry-page-bad">
                <label>Cosas Malas:</label>
                { formData.badThings.map((item, index) => (
                    <input
                        key={ index }
                        type="text"
                        value={ item }
                        onChange={ (e) => {
                            const newBadThings = [...formData.badThings];
                            newBadThings[index] = e.target.value;
                            setFormData(prev => ({
                                ...prev,
                                badThings: newBadThings
                            }));
                        } }
                    />
                )) }
                <button
                    type="button"
                    onClick={ () =>
                        setFormData(prev => ({
                            ...prev,
                            badThings: [...prev.badThings, ""]
                        }))
                    }
                >
                    +
                </button>
            </form>

        </div>
    );
}
