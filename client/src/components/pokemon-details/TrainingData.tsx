import { type Pokemon, type Content, type PokemonSpecies } from "../../types";
import { formatStat, toTitleCase } from "../../helpers/formatters";
import DataCol from "./DataCol";

function EvStats({ pokemon }: { pokemon: Pokemon }) {
    return (
        <div className="grid grid-cols-1">
            {pokemon.stats.map((s) => (s.effort > 0 && 
            <span key={s.stat.name}>
                {`${s.effort} ${formatStat(s.stat.name)}`}
            </span>)
            )}
        </div>
    );
}
export default function TrainingData({ pokemon, pokedexEntry }: { pokemon: Pokemon, pokedexEntry: PokemonSpecies }) {
    const content: Content =
        [
            { label: "EV yield", value: <EvStats pokemon={pokemon} /> },
            { label: "Catch Rate", value: pokedexEntry.capture_rate },
            { label: "Base Happiness", value: pokedexEntry.base_happiness },
            { label: "Base Exp.", value: pokemon.base_experience },
            { label: "Growth Rate", value: toTitleCase(pokedexEntry.growth_rate.name) }
        ]
    return (
        <DataCol title="Training" content={content} />
    );
}