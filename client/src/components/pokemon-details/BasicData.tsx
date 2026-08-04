import { formatPokemonID, toTitleCase } from "../../helpers/formatters";
import { type Pokemon, type PokemonSpecies, type Content } from "../../types";
import PokemonTypeBadges from "../PokemonTypeBadges";
import DataCol from "./DataCol";


function getPokemonDimensions(w: number, h: number) {
    const weight = {
        metric: (w / 10).toFixed(1).toString() + " kg",
        USCustomary: (w / 4.536).toFixed(1) + " lbs"
    };
    const height = {
        metric: (h / 10).toFixed(1).toString() + " m",
        USCustomary: (Math.floor((h * 3.937) / 12).toString() + "' " +
            Math.round((h * 3.937) % 12).toString().padStart(2, "0") + "\"")
    };

    return { weight, height };
}

function Abilities({ pokemon }: { pokemon: Pokemon }) {
    return (pokemon.abilities.map((a) =>
        <div key={a.ability.name} className="flex gap-2 items-center flex-wrap" >
            <span>{toTitleCase(a.ability.name)}</span>
            {a.is_hidden && (<span className="text-xs text-wrap text-secondary"> ( Hidden )</span>)}
        </div>)
    );
}

export default function BasicData({ pokemon, pokedexEntry }: { pokemon: Pokemon, pokedexEntry: PokemonSpecies }) {
    const category = pokedexEntry.genera.find((category) => category.language.name === "en");
    const dimensions = getPokemonDimensions(pokemon.weight, pokemon.height);

    const content: Content =
        [
            { label: "№", value: formatPokemonID(pokedexEntry.id) },
            { label: "Type", value: (<PokemonTypeBadges types={pokemon.types} />) },
            { label: "Category", value: (category ? category.genus : '') },
            { label: "Height", value: (`${dimensions.height.metric} (${dimensions.height.USCustomary})`) },
            { label: "Weight", value: (`${dimensions.weight.metric} (${dimensions.weight.USCustomary})`) },
            { label: "Abilities", value: <Abilities pokemon={pokemon} /> },
            { label: "Shape", value: toTitleCase(pokedexEntry.shape.name) },
            { label: "Baby", value: (pokedexEntry.is_baby ? 'Yes' : 'No') },
            { label: "Legendary", value: (pokedexEntry.is_legendary ? 'Yes' : 'No') },
            { label: "Mythical", value: (pokedexEntry.is_mythical ? 'Yes' : 'No') }

        ]
    return (
        <DataCol title={"Pokemon"} content={content} />
    );
}