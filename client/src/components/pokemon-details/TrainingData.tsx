import { dataRow, rowHead, dataCol } from "./styles";
import { type Pokemon, type PokedexEntry } from "../../types";
import { formatStat, toTitleCase } from "../../helpers/formatters";

export default function TrainingData({ pokemon, pokedexEntry }: { pokemon: Pokemon, pokedexEntry: PokedexEntry }) {
    return (
        <div className={dataCol}>
            <div className={dataRow}>
                <span className={rowHead}>EV yield</span>
                <div className="grid grid-cols-1">
                    {pokemon.stats.map((s) => (s.effort > 0 && <span key={s.stat.name}>
                        {`${s.effort} ${formatStat(s.stat.name)}`}
                    </span>)
                    )}
                </div>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Catch Rate</span>
                <span>{pokedexEntry.capture_rate}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Base Happiness</span>
                <span>{pokedexEntry.base_happiness}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Base Exp.</span>
                <span>{pokemon.base_experience}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Growth Rate</span>
                <span>{toTitleCase(pokedexEntry.growth_rate.name)}</span>
            </div>
        </div>

    );
}