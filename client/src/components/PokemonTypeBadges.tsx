import {  TYPE_COLORS, type PokemonTypeName } from "../constants";
import { toTitleCase } from "../helpers/formatters";
import type { PokemonType } from "../types";


export default function PokemonTypeBadges({ types }: {types: PokemonType[]}) {
    return (
        <div className="flex w-full  items-center justify-center gap-2">
            {types.map(({ type }) => {
                return (
                    <div key={type.name}
                        className={`flex items-center justify-center w-12 md:w-14 py-1 rounded-sm
                            ${TYPE_COLORS[type.name as PokemonTypeName]}`}
                    >
                        <span className="text-2xs lg:text-xs text-white font-bold">
                            {toTitleCase(type.name)}</span>
                    </div>);
            })}
        </div>
    );
}