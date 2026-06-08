import { useEffect, useState } from "react";
import { type Pokemon } from "../types";
import { POKEDEX_API_URL } from "../constants";

interface PokedexEntries {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
}


function cleanEntries(data: Array<PokedexEntries>) {
    const entries: { text: string, version: string }[] = [];

    for (const e of data) {
        if (e.language.name === "en") {
            let v: string = e.version.name.replace(/-/g, " ");
            switch (v) {
                case "firered":
                    v = "fire red";
                    break;
                case "leafgreen":
                    v = "leaf green"
                    break;
                case "heartgold":
                    v = "heartgold";
                    break;
                case "soulsilver":
                default:
                    break;
            }
            entries.push({
                text: e.flavor_text.replace(/[\t\r\n\f]+/g, " "),
                version: v
            }
            )
        }
    }

    return entries;
}

export default function PokedexEntries({ pokemon }: { pokemon: Pokemon }) {
    const [entries, setEntries] = useState<Array<{ text: string, version: string }>>([]);
    const [currentEntry, setCurrentEntry] = useState(0);
    const entriesLength = entries.length;

    useEffect(() => {
        fetch(`${POKEDEX_API_URL}/${pokemon.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} `);
                }
                return response.json();
            })
            .then((data) => {
                console.log(cleanEntries(data.flavor_text_entries));
                setEntries(cleanEntries(data.flavor_text_entries));
            })
            .catch((error) => { console.error(error); })
    }, [pokemon.id]);

    return (
        <div className="flex w-64 h-32 px-3 bg-card-background">
            {entriesLength > 0 &&
                <div className="flex flex-col items-center">
                    <h4>{entries[currentEntry].version.charAt(0).toUpperCase() + entries[currentEntry].version.slice(1)}
                    </h4>
                    <p className="text-xs text-text-secondary"> {entries[currentEntry].text}</p>
                </div>}

            <button></button>
        </div>
    );
}