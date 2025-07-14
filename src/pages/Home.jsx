import { EntryList } from "../components/EntryList";

import { entries } from "../assets/entries.json"

console.log(entries)
export default function Home() {

    return (
        <EntryList entries={ entries } />
    )



}