import { EntryList } from "../components/EntryList"
import { CreateEntry } from "../components/CreateEntry"




export default function Home({ entries }) {

    return (
        <>
            <h1 className="home-title">Aquí están todas tus ideas</h1>
            <EntryList entries={ entries } />
            <CreateEntry entrieList={ entries } />
        </>
    )



}