import { useParams } from "react-router"


export function EntryPage({ entries }) {
    const params = useParams()
    const entry = entries.find(entry => entry.id == params.id)
    if (!entry) {
        return <h2>Ha habido un problema con tu página</h2>
    }
    return (
        <div className="entry-page-container">
            <form className="entry-page">
                <input type="text" name="title" placeholder={ entry.title } />
                <input type="text" name="date" disabled placeholder={ entry.date } />
                <input className="entry-page-content" type="text" name="content" placeholder={ entry.content } />
            </form>
            <form className="entry-page-good">
                <input type="text" name="title" placeholder={ entry.goodThings } />
            </form>
            <form className="entry-page-bad">
                <input type="text" name="title" placeholder={ entry.badThings } />
            </form>
        </div>
    )









}