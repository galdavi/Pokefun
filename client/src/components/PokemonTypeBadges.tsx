import { type PokemonType, TYPE_COLORS } from "../types";
import { toTitleCase } from "../helpers/formatters";
interface Props {
    types: Array<{
        slot: number;
        type: {
            name: PokemonType;
            url: string;
        };
    }>;
}

export default function PokemonTypeBadges({ types }: Props) {
    return (
        <div className="flex gap-2">
            {types.map(({ type }) => {
                return (
                    <div key={type.name}
                        className="flex items-center justify-center w-14 py-1 rounded-sm"
                        style={{ background: TYPE_COLORS[type.name] }}
                    >
                        <p className="text-xs text-white font-bold">
                            {toTitleCase(type.name)}</p>
                    </div>);
            })}
        </div>
    );
}