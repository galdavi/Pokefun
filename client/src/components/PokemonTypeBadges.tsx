import {  TYPE_COLORS, type PokemonTypeName } from "../constants";
import { toTitleCase } from "../helpers/formatters";
import type { PokemonType } from "../types";


export default function PokemonTypeBadges({ types }: {types: PokemonType[]}) {
    return (
        <div className="flex gap-2">
            {types.map(({ type }) => {
                return (
                    <div key={type.name}
                        className={`flex items-center justify-center w-14 py-1 rounded-sm
                            ${TYPE_COLORS[type.name as PokemonTypeName]}`}
                    >
                        <p className="text-xs text-white font-bold">
                            {toTitleCase(type.name)}</p>
                    </div>);
            })}
        </div>
    );
}