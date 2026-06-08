
import { TYPE_COLORS, type Pokemon } from "../types";

export default function PokedexCard({ pokemon }: { pokemon: Pokemon }) {
    const cardBackground = "flex flex-col items-center justify-center w-64 h-72 gap-2 py-2 bg-card-background";
    const typeBackground = "flex gap-2";
    const spriteBackground = "flex items-center justify-center w-48 h-48 bg-card-secondary-background rounded-md ";
    return (
        <div className="flex items-center justify-center">

            <div className={cardBackground}>
                <div className="flex justify-between w-full px-8 ">
                    <h3 className="text-md font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
                    <h3>{pokemon.id}</h3>
                </div>

                <div className={spriteBackground}>
                    <img src={`${pokemon.sprites.front_default}`} alt="pokemon" className="w-48 h-48" />
                </div>

                <div className={typeBackground}>
                    {
                        pokemon.types.map(({ type }) => {
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