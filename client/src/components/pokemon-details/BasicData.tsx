import { toTitleCase } from "../../helpers/formatters";
import { type Pokemon, type PokedexEntry, type Content } from "../../types";
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
        <span key={a.ability.name} className="flex items-center flex-wrap" >
            {toTitleCase(a.ability.name)}
            {a.is_hidden && (<span className="text-xs text-text-secondary"> ( Hidden )</span>)}
        </span>));
}

export default function BasicData({ pokemon, pokedexEntry }: { pokemon: Pokemon, pokedexEntry: PokedexEntry }) {
    const category = pokedexEntry.genera.find((category) => category.language.name === "en");
    const dimensions = getPokemonDimensions(pokemon.weight, pokemon.height);

    const content: Content =
        [
            { label: "№", value: pokemon.id.toString().padStart(4, "0") },
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
        <DataCol title={"Pokemon Data"} content={content} />
    );
}