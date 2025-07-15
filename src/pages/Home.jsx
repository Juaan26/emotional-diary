import { EntryList } from "../components/EntryList"




export default function Home({ entries }) {

    return (
        <>
            <h1 className="home-title">Aquí están todas tus ideas</h1>
            <EntryList entries={ entries } />

        </>
    )



}