import { useEffect, useState } from "react";
import { type Pokemon } from "../types";
import { POKEDEX_API_URL } from "../constants";

interface PokedexEntries {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
}


function cleanEntries(data: Array<PokedexEntries>) {
    const entries = new Map<string, string>;

    for (const e of data) {
        if (e.language.name === "en") {
            let version = e.version.name.replace(/-/g, " ");
            const entry = e.flavor_text.replace(/[\t\r\n\f]+/g, " ");
            switch (version) {
                case "firered":
                    version = "FireRed";
                    break;
                case "leafgreen":
                    version = "LeafGreen"
                    break;
                case "heartgold":
                    version = "HeartGold";
                    break;
                case "SoulSilver":
                default:
                    version = version.replace(/(^|\s)[a-z]/g, match => match.toUpperCase())
                    break;
            }

            entries.set(version, entry)
        }
    }

    return entries;
}

export default function PokedexEntries({ pokemon }: { pokemon: Pokemon }) {
    const [entries, setEntries] = useState<Map<string, string>>(new Map<string, string>());
    const [currentEntry, setCurrentEntry] = useState("Red");
    const entriesSize = entries.size;

    const list = Array.from(entries.keys(), (version) => <option key={version}>{version}</option>);




    useEffect(() => {
        fetch(`${POKEDEX_API_URL}/${pokemon.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} `);
                }
                return response.json();
            })
            .then((data) => {
                setEntries(cleanEntries(data.flavor_text_entries));
            })
            .catch((error) => { console.error(error); })
    }, [pokemon.id]);

    return (
        <>
            {entriesSize > 0 &&
                <div className="flex flex-col w-64 h-32  px-2 pt-4 gap-2 bg-card-background border border-gray-200 shadow-sm rounded-sm">

                    <h2>Pokedex Entries</h2>
                    <div className="flex gap-2">

                        <label className="text-xs">Select Version:</label>
                        <select value={currentEntry} className="text-xs border rounded-sm"
                            onChange={(e) => { setCurrentEntry(e.target.value) }}>
                            {list}
                        </select>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-text-secondary"> {entries.get(currentEntry)}</p>
                    </div>
                </div>
            }
        </>

    );
}