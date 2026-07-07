import { type PokemonMove } from "../../types";
import { POKEMON_GENERATIONS, TYPE_COLORS, type PokemonTypeName } from "../../constants";
interface Props {
    pokemonMoves: PokemonMove[];
    generation: string;
};

function Generations({ generation }: { generation: string }) {
    return(
        <div className="flex w-full">
        </div>
    );
}

export default function PokemonMoves({ pokemonMoves, generation }: Props) {

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">Moves</h2>
            {/* <Generations generation={generation}/> */}
        
        </div>
    );
}