import { toTitleCase } from "../../helpers/formatters";
import { type PokedexEntry, type Content } from "../../types";
import DataCol from "./DataCol";

function Steps({ cycles }: { cycles: number }) {
    const steps = {
        earlyGens: (255 * (cycles + 1)).toString() + "-"
            + (257 * (cycles + 1)).toString(),
        newGens: (128 * (cycles + 1)).toString()
    }
    return (
        <div className="grid grid-cols-2 justify-center items-center">
            <span>{cycles}</span>
            <div className="grid grid-cols-1 text-xs text-text-secondary">
                <span >Gens II-VII: ({steps.earlyGens}) steps</span>
                <span> Gens VII-IX: {steps.newGens} steps</span>
            </div>
        </div>
    );
}
function GenderRatio({ rate }: { rate: number }) {
    const ratio = {
        male: (((8 - rate) / 8) * 100).toFixed(2).toString() + "%",
        female: ((rate / 8) * 100).toFixed(2).toString() + "%"
    }
    return (
        <>
            {(rate === -1) ? <span> Genderless </span> : <div className="grid grid-cols-1">
                <span className="text-blue-500">{`${ratio.male} male`}</span>
                <span className="text-pink-400">{`${ratio.female} female`}</span>
            </div>
            }
        </>

    );
}

function EggGroups({ pokedexEntry }: { pokedexEntry: PokedexEntry }) {
    return (
        <div className="grid grid-cols-1">
            {pokedexEntry.egg_groups.map((e) => <span key={e.name}>{toTitleCase(e.name)}</span>)}
        </div>);
}
export default function BreedingData({ pokedexEntry }: { pokedexEntry: PokedexEntry }) {



    const content: Content =
        [
            { label: "Egg Groups", value: <EggGroups pokedexEntry={pokedexEntry} /> },
            { label: "Egg Cycles", value: <Steps cycles={pokedexEntry.hatch_counter} /> },
            { label: "Gender", value: <GenderRatio rate={pokedexEntry.gender_rate} /> },
            { label: "Gender Difference", value: (pokedexEntry.has_gender_differences ? 'Yes' : 'No') }

        ]
    return (
        <DataCol title="Breeding" content={content} />
    );
}