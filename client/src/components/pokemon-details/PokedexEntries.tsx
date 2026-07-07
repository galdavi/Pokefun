import { useState } from "react";
import { type PokemonSpecies } from "../../types";
import { toTitleCase } from "../../helpers/formatters";


function getCleanEntries(data: PokemonSpecies['flavor_text_entries']) {
    const entries = new Map<string, string>();

    for (const e of data) {
        if (e.language.name === "en") {
            let version = e.version.name;
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
                    version = toTitleCase(version);
                    break;
            }

            entries.set(version, entry)
        }
    }

    return entries;
}

export default function PokedexEntries({ pokedexEntry }: { pokedexEntry: PokemonSpecies }) {
    const entries = getCleanEntries(pokedexEntry.flavor_text_entries);
    const [currentEntry, setCurrentEntry] = useState(entries.keys().next().value ?? " ");

    const list = Array.from(entries.keys(), (version) => <option key={version}>{version}</option>);

    return (

        <div className="flex flex-col w-full h-36 px-2 py-4 bg-card-background border border-gray-200">
            <div className="flex items-center justify-between py-2">
                <h2 className="text-lg font-semibold">Pokedex Entries</h2>
                <div className="flex  gap-2">
                    <label className="text-xs">Version:</label>
                    <select value={currentEntry} className="text-xs w-32 px-1 border rounded-sm"
                        onChange={(e) => { setCurrentEntry(e.target.value) }}>
                        {list}
                    </select>
                </div>
            </div>

            <div className="flex items-center">
                <p className="text-xs text-text-secondary"> {entries.get(currentEntry)}</p>
            </div>
        </div>

    );
}