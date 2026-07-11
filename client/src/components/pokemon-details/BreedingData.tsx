import { toTitleCase } from "../../helpers/formatters";
import { type PokemonSpecies, type Content } from "../../types";
import DataCol from "./DataCol";

function Steps({ cycles }: { cycles: number }) {
    const steps = {
        earlyGens: (255 * (cycles + 1)).toString() + "-"
            + (257 * (cycles + 1)).toString(),
        newGens: (128 * (cycles + 1)).toString()
    }
    return (
        <div className="flex justify-center items-center gap-4">
            <span>{cycles}</span>
            <div className="flex flex-col text-xs text-secondary">
                <span>Gens II-VII: ({steps.earlyGens}) steps</span>
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
            {(rate === -1) ? <span> Genderless </span> : <div className="flex flex-col">
                <span className="text-blue-500">{`${ratio.male} male`}</span>
                <span className="text-pink-400">{`${ratio.female} female`}</span>
            </div>
            }
        </>

    );
}

function EggGroups({ pokedexEntry }: { pokedexEntry: PokemonSpecies }) {
    return (
        <div className="flex flex-col">
            {pokedexEntry.egg_groups.map((e) => <span key={e.name}>{toTitleCase(e.name)}</span>)}
        </div>);
}
export default function BreedingData({ pokedexEntry }: { pokedexEntry: PokemonSpecies }) {



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