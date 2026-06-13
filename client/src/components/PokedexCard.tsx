
import { TYPE_COLORS, type Pokemon } from "../types";

export default function PokedexCard({ pokemon }: { pokemon: Pokemon }) {
    const cardBackground = "flex flex-col items-center justify-center w-48 h-56  lg:w-56 lg:h-64 gap-2 py-2 bg-card-background border border-gray-200 rounded-sm shadow-sm";
    const typeBackground = "flex gap-2";
    const spriteBackground = "flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 bg-card-secondary-background rounded-md ";
    const spriteSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    
    return (
        <div className="flex items-center justify-center">

            <div className={cardBackground}>
                <div className="flex justify-between w-full px-8 ">
                    <h3 className="text-xs font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                    <h3 className=" text-xs"># {pokemon.id}</h3>
                </div>

                <div className={spriteBackground}>
                    <img src={spriteSrc} alt="pokemon" className="w-32 h-32 lg:w-40 lg:h-40 " />
                </div>

                <div className={typeBackground}>
                    {
                        pokemon.types?.map(({ type }) => {
                            return (
                                <div key={type.name}
                                    className="flex items-center justify-center w-14 py-1 rounded-sm"
                                    style={{ background: TYPE_COLORS[type.name] }}
                                >
                                    <h4 className="text-xs text-white font-bold">
                                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}</h4>
                                </div>
                            );
                        })}
                </div>
            </div>

        </div>
    );
}