export function EntryList({ entries, onSelect }) {

    return (
        <div className="entrylist" >
            { entries.map(entry => (
                <div className="entrylist-container"
                    key={ entry.id }
                    onClick={ () => onSelect(entry.id) }>
                    <h3>{ entry.title }</h3>
                    <p>{ entry.content.slice(0, 50) }...</p>
                </div>
            )) }
        </div>
    )




}