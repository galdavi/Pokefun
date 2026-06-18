import { dataCol, dataRow, rowHead } from "./styles";
import { toTitleCase } from "../../helpers/formatters";
import { type PokedexEntry } from "../../types";

function getSteps(eggCycles: number) {
    return {
        earlyGens: (255 * (eggCycles + 1)).toString() + "-"
            + (257 * (eggCycles + 1)).toString(),
        newGens: (128 * (eggCycles + 1)).toString()
    }
}
function getGenderRatio(rate: number) {
    if (rate === -1) {
        return null;
    }
    return {
        male: (((8 - rate) / 8) * 100).toFixed(2).toString() + "%",
        female: ((rate / 8) * 100).toFixed(2).toString() + "%"
    }
}

export default function BreedingData({ pokedexEntry }: { pokedexEntry: PokedexEntry }) {

    const steps = getSteps(pokedexEntry.hatch_counter);
    const genderRatio = getGenderRatio(pokedexEntry.gender_rate);

    return (
        <div className={dataCol}>
            <div className={dataRow}>
                <span className={rowHead}>Egg Groups</span>
                <div className="grid grid-cols-1">
                    {pokedexEntry.egg_groups.map((e) => <span key={e.name}>{toTitleCase(e.name)}</span>)}
                </div>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Egg Cycles</span>
                <div className="grid grid-cols-2 justify-center items-center">
                    <span>{pokedexEntry.hatch_counter}</span>
                    <div className="grid grid-cols-1 text-xs text-text-secondary">
                        <span >Gens II-VII: ({steps.earlyGens}) steps</span>
                        <span> Gens VII-IX: {steps.newGens} steps</span>
                    </div>
                </div>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Gender</span>
                <div>
                    {!genderRatio ? 'Genderless' :
                        <div className="grid grid-cols-1">
                            <span className="text-blue-500">{`${genderRatio.male} male`}</span>
                            <span className="text-pink-400">{`${genderRatio.female} female`}</span>
                        </div>}
                </div>
            </div>
            {genderRatio &&
                <div className={dataRow}>
                    <span className={rowHead}>Gender Difference</span>
                    <span>{pokedexEntry.has_gender_differences ? 'Yes': 'No'}</span>
                </div>}

        </div>
    );
}