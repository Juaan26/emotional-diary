import { useNavigate } from 'react-router';
export function EntryList({ entries }) {

    const navigate = useNavigate();

    return (
        <div className="entrylist" >
            { entries.map(entry => (
                <div className="entrylist-container"
                    key={ entry.id }
                    onClick={ () => navigate(`/entry/${entry.id}`) }>
                    <h3 className="entrylist-title">{ entry.title }</h3>
                    <hr className="entrylist-hr" />
                    <p>{ entry.content.slice(0, 100) }...</p>
                    <p className="entrylist-date">{ entry.date }</p>
                </div>
            )) }
        </div>
    )




}