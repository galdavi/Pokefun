import { toTitleCase } from "../../helpers/formatters";
import { type Pokemon, type PokedexEntry, TYPE_COLORS } from "../../types";
import { dataRow, rowHead, dataCol } from "./styles";


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


export default function BasicData({ pokemon, pokedexEntry }: { pokemon: Pokemon, pokedexEntry: PokedexEntry }) {
    const category = pokedexEntry.genera.find((category) => category.language.name === "en");
    const dimensions = getPokemonDimensions(pokemon.weight, pokemon.height);

    return (
        <div className={dataCol}>
            <div className={dataRow}>
                <span className={rowHead}> № </span>
                <span>{pokemon.id.toString().padStart(4, "0")}</span>
            </div>

            <div className={dataRow}>
                <span className={rowHead}>Type</span>
                <div className="flex gap-2">
                    {
                        pokemon.types?.map(({ type }) => {
                            return (
                                <div key={type.name}
                                    className="flex items-center justify-center w-14 py-1 rounded-sm"
                                    style={{ background: TYPE_COLORS[type.name] }}
                                >
                                    <p className="text-xs text-white font-bold">
                                        {toTitleCase(type.name)}</p>
                                </div>
                            );
                        })}
                </div>
            </div>
            {category &&
                <div className={dataRow}>
                    <span className={rowHead}>Category</span>
                    <span>{category.genus}</span>
                </div>
            }
            <div className={dataRow}>
                <span className={rowHead}>Height</span>
                <span >{`${dimensions.height.metric} (${dimensions.height.USCustomary})`}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Weight</span>
                <span >{`${dimensions.weight.metric} (${dimensions.weight.USCustomary})`}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Abilities</span>
                <div className="grid grid-cols-1">
                    {pokemon.abilities.map((a) => <span key={a.ability.name} className="flex flex-wrap" >
                        {toTitleCase(a.ability.name)}
                        {a.is_hidden && (<span className="text-xs text-text-secondary"> ( Hidden )</span>)}
                    </span>)}
                </div>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Shape</span>
                <span>{toTitleCase(pokedexEntry.shape.name)}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Baby Pokemon</span>
                <span> {pokedexEntry.is_baby ? 'Yes' : 'No'}</span>
            </div>

            <div className={dataRow}>
                <span className={rowHead}>Legendary Pokemon</span>
                <span> {pokedexEntry.is_legendary ? 'Yes' : 'No'}</span>
            </div>
            <div className={dataRow}>
                <span className={rowHead}>Mythical Pokemon</span>
                <span> {pokedexEntry.is_mythical ? 'Yes' : 'No'}</span>
            </div>
        </div>

    );
}