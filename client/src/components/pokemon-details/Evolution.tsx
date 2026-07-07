import { type ChainLink, type EvolutionChain } from "../../types";
import { getPokemonId, toTitleCase } from "../../helpers/formatters";
import type React from "react";
import { MoveDownRight, MoveRight, MoveUpRight } from 'lucide-react';




function getArrowPattern(evolutions: ({ name: string; id: number; } | null)[]) {
    const ARROW_PATTERNS = new Map<number, string[]>([
        [1, ["right"]],
        [2, ["up-right", "down-right"]],
        [3, ["up-right", "right", "down-right"]],
        [8, ["up-right", "right", "down-right", "up-right", "down-right", "up-right", "down-right", "right"]],
    ]);
    const count = evolutions.filter((evolution) => evolution !== null).length;
    return ARROW_PATTERNS.get(count);
}

function Arrow({ index, evolutions }: { index: number, evolutions: ({ name: string; id: number; } | null)[] }) {
    const arrowStyle = "text-text-secondary w-10 h-10";
    const ARROW_ICONS = new Map<string, React.ReactNode>([
        ["right", <MoveRight className={arrowStyle} />],
        ["up-right", <MoveUpRight className={arrowStyle} />],
        ["down-right", <MoveDownRight className={arrowStyle} />]
    ]);

    const pattern = getArrowPattern(evolutions);

    if (pattern && !pattern[index] || !pattern) {
        return ARROW_ICONS.get("right");
    }

    return ARROW_ICONS.get(pattern[index])

}

function PokemonCard({ name, id }: { name: string, id: number }) {
    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

    return (
        <div className="flex flex-col flex-1 items-center justify-center">
            <img className="w-24 h-24" src={imageSrc} alt="" />
            <span className="text-md font-semibold ">{toTitleCase(name)}</span>
            <span className="text-sm text-text-secondary">#{id.toString().padStart(4, "0")}</span>
        </div>
    );
}
function EmptyCard() {
    return (
        <div>
            <div className="flex items-center gap-2 w-35 h-35">
            </div>
        </div>
    );
}



function getGrid(node: ChainLink) {
    const grid: ({ name: string, id: number } | null)[][] = [];
    const parentStack: { node: ChainLink, row: number }[] = [];
    const childStack: { node: ChainLink, row: number }[] = [];
    parentStack.push({ node: node, row: 0 });
    let numOfRows = 1;
    let col: ({ name: string, id: number } | null)[] = Array(numOfRows).fill(null);

    while (parentStack.length > 0) {
        const parent = parentStack[parentStack.length - 1];
        parentStack.pop();
        col[parent.row] = { name: parent.node.species.name, id: getPokemonId(parent.node.species.url) };

        parent.node.evolves_to.forEach((child, i) => childStack.push({ node: child, row: i + parent.row }))
        numOfRows = Math.max(numOfRows, childStack.length)

        if (parentStack.length === 0) {
            grid.push(col);
            col = Array(numOfRows).fill(null);
        }
        while (childStack.length > 0) {
            const child = childStack[childStack.length - 1];
            childStack.pop();
            col[child.row] = { name: child.node.species.name, id: getPokemonId(child.node.species.url) }
            if (child.node.evolves_to.length > 0) {
                parentStack.push({ node: child.node, row: child.row })
            }
        }
    }
    grid.push(col);
    return grid;
}
export default function Evolution({ evolutionChain, pokemonName }: { evolutionChain: EvolutionChain, pokemonName: string }) {
    const grid = getGrid(evolutionChain.chain);
    const numOfCols = grid.length;
    return (
        <div className="grid grid-cols-1 items-center">
            <h2 className="text-2xl font-semibold">Evolution</h2>
            {numOfCols > 1 ?
                <div className={`grid grid-cols-${numOfCols} gap-2`}>
                    {grid.map(
                        (evolutions, col) =>
                            <div key={col} className="flex flex-col">
                                <div className="flex flex-col flex-1 items-center justify-center">
                                    {evolutions.map((pokemon, row) =>
                                        <div key={`${col},${row}`} className="flex items-center justify-center gap-2">
                                            {pokemon ?
                                                <>
                                                    {col > 0 && <Arrow index={row} evolutions={evolutions} />}
                                                    <PokemonCard name={pokemon.name} id={pokemon.id} />
                                                </>
                                                : <EmptyCard />}
                                        </div>)}
                                </div>
                            </div>)
                    }
                </div>
                : <span>{toTitleCase(pokemonName)} does not have an evolution tree</span>


            }

        </div>
    );
}