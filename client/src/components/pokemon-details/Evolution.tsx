import { type ChainLink, type EvolutionDetail } from "../../types";
import { getPokemonID, toTitleCase } from "../../helpers/formatters";
import PokemonCard from "./PokemonCard";
import { MoveRight } from 'lucide-react';
import { cardSizeClasses } from "../../constants";
import EvolutionDescription from "./EvolutionDescription";
type EvolutionGraph = Map<
    string,
    Map<string, EvolutionDetail[]>
>;
interface EvolutionNode {
    name: string;
    row: number;
    evolutionDetails: EvolutionDetail[];
}
function EmptyCard() {
    return <div className={`${cardSizeClasses}`} />;
}


function buildEvolutionGrid(graph: EvolutionGraph) {
    const visited = new Set<string>();
    const grid: (EvolutionNode | null)[][][] = []
    for (const [key] of graph) {
        if (!visited.has(key) && graph.get(key)!.size > 0) {
            grid.push(getEvolutionChain(graph, key, visited));
        }

        visited.add(key);
    }

    return grid;
}


function getEvolutionChain(graph: EvolutionGraph, initialPokemon: string, visited: Set<string>) {
    const chain: (EvolutionNode | null)[][] = [];
    const parentStack: EvolutionNode[] = [];
    const childStack: EvolutionNode[] = [];
    let numOfRows = 1;
    let col: (EvolutionNode | null)[] = Array(numOfRows).fill(null);
    parentStack.push({ name: initialPokemon, row: 0, evolutionDetails: [] });

    while (parentStack.length > 0 || childStack.length > 0) {

        while (parentStack.length > 0) {
            const parent = parentStack.pop()!;

            col[parent.row] = { name: parent.name, row: parent.row, evolutionDetails: parent.evolutionDetails };

            let index = 0;
            graph.get(parent.name)!.forEach((evolutionDetails, key) => {

                const childRow = index + parent.row

                childStack.push({ name: key, row: index + parent.row, evolutionDetails })
                numOfRows = Math.max(numOfRows, childRow + 1);
                index++;
            })

            visited.add(parent.name);
        }
        if (parentStack.length === 0) {
            chain.push(col);
            col = Array(numOfRows).fill(null);
        }

        while (childStack.length > 0) {
            const child = childStack.pop()!;

            col[child.row] = { name: child.name, row: child.row, evolutionDetails: child.evolutionDetails };
            if (graph.get(child.name)) {
                parentStack.push({ name: child.name, row: child.row, evolutionDetails: child.evolutionDetails });
            }
            visited.add(child.name);
        }
        if (childStack.length === 0 &&
            parentStack.length === 0 &&
            col.filter((row) => row != null).length > 0) {
            chain.push(col);
            col = Array(numOfRows).fill(null);
        }

    }

    return chain;
}
//Since the api data is inconsitent, we need a graph to get the 
//galarian, hisui and regular evolutions in a consistent format
function buildEvolutionGraph(node: ChainLink) {
    const map = new Map<string, Map<string, EvolutionDetail[]>>();
    const stk: { node: ChainLink, parent: string }[] = [];
    stk.push({ node: node, parent: "" });
    while (stk.length > 0) {

        const curr = stk.pop()!;

        const parent = curr.parent;
        const child = getPokemonID(curr.node.species.url).toString();

        if (!map.has(child)) {
            map.set(child, new Map<string, EvolutionDetail[]>());
        }
        curr.node.evolves_to.forEach((ch) => {
            stk.push({ node: ch, parent: child });
        });

        curr.node.evolution_details.forEach((details) => {
            const key = details.base_form ? getPokemonID(details.base_form.url).toString() : parent;
            const value = details.evolved_form ? getPokemonID(details.evolved_form.url).toString() : child;

            if (!map.has(key)) {
                map.set(key, new Map<string, EvolutionDetail[]>());
            }
            const childMap = map.get(key)!;
            if (!childMap.has(value)) {
                childMap.set(value, []);
            }
            childMap.get(value)!.push(details);

        });
    }
    return map;
}
export default function Evolution({ evolutionChain, pokemonName }: { evolutionChain: ChainLink, pokemonName: string }) {
    const evolutionGraph = buildEvolutionGraph(evolutionChain);
    const evolutionGrid = buildEvolutionGrid(evolutionGraph);
    const numOfCols = evolutionGrid.length > 0 ? evolutionGrid[0].length : 0;

    if (numOfCols <= 1) {
        return (
            <span>{toTitleCase(pokemonName)} does not have an evolution tree</span>
        );
    }


    return (
        <div className="flex flex-col w-full items-center justify-center gap-4">
            <h2 className="text-3xl font-semibold ">Evolution Tree</h2>
            <div className="flex flex-col w-full  overflow-x-auto gap-4 justify-center pb-4">
                {evolutionGrid.map((currTree, i) =>
                    <div key={i} className="flex min-w-max items-center justify-center gap-2">
                        {currTree.map((evolutions, col) =>
                            <div key={`${i}-${col}`}
                                className="flex min-w-max flex-col items-center justify-center">
                                {evolutions.map((pokemon, row) =>
                                    <div
                                        key={`${i}-${col}-${row}`}
                                        className="flex items-center justify-center px-4 py-2"
                                    >
                                        {col > 0 && (
                                            <div className="flex w-28 shrink-0 flex-col items-center justify-center">
                                                {pokemon && (
                                                    <>
                                                        <MoveRight className="h-8 w-8 text-neutral-600 lg:h-12 lg:w-12" />

                                                        {pokemon.evolutionDetails.length > 0 && (
                                                            <EvolutionDescription evolutionDetails={pokemon.evolutionDetails} />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        {pokemon ? (
                                            <PokemonCard name={pokemon.name} />
                                        ) : (
                                            <EmptyCard />
                                        )}
                                    </div>
                                )}
                            </div>)}
                    </div>)}
            </div>
        </div>

    );
}