import { type ErrorState, type Move, type PokemonMove, type PokemonMoveVersion } from "../../types";
import { useEffect, useState } from "react";
import { POKEMON_GENERATIONS, type PokemonGeneration } from "../../constants";
import TabsLists from "../TabsLists";
import Loader from "../Loader";
import FetchError from "../FetchError";
interface Props {
    pokemonMoves: PokemonMove[];
    generation: string;
};
interface MovesData {
    data: Move;
    version_group_details: PokemonMoveVersion[];
};





function Generations({ generation }: { generation: string }) {
    const genNumber = POKEMON_GENERATIONS[generation as PokemonGeneration];
    const [current, setCurrent] = useState<string>(genNumber.toString());
    const totalGens = 9 - genNumber + 1;
    const list = Array.from({ length: totalGens }, (_, index) => `Gen - ${genNumber + index}`);
    return (
        <div className="flex w-full h-8">
            <TabsLists items={list} current={current} position="middle"
                handleClick={(e) => { setCurrent(e.currentTarget.value) }} />
        </div>
    );
}


export default function PokemonMoves({ pokemonMoves, generation }: Props) {
    const [moves, setMoves] = useState<MovesData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorState | null>(null);
    useEffect(() => {
        const MOVES_API_URLS = pokemonMoves.map((move) => move.move.url);

        const fetchData = async () => {
            try {
                const allPromises = MOVES_API_URLS.map(async (url) => {
                    const res = await fetch(url);
                    if (!res.ok) {
                        throw new Error(`${res.status}`);
                    }
                    return res.json();

                });

                const data = await Promise.all(allPromises)
                const movesData: MovesData[] = data.map((move, index) => {
                    return {
                        data: move,
                        version_group_details: pokemonMoves[index].version_group_details
                    };
                });
                setMoves(movesData);
                
            } catch (error) {
                const errorType = {
                    title: `Could not find moves`,
                    message: error instanceof Error ? error.message : "Unexpected error occurred"
                }

                setError(errorType)
            } finally{
                setLoading(false);
            }
        }

        fetchData();


    }, [pokemonMoves]);
    if(error){
        <FetchError error={error} />
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Moves</h2>
        </div>
    );
}

function Table() {
    return (
        <table>
            <thead>
                <tr className="flex items-center gap-2 border rounded">
                    <td>Lvl.</td>
                    <td> Move</td>
                    <td>Type</td>
                    <td>Cat.</td>
                    <td>Power</td>
                    <td>Acc.</td>
                </tr>
            </thead>
            <tbody className="border">
            </tbody>
        </table>
    );
}