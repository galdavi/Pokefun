import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPokemonID, toTitleCase } from "../../helpers/formatters";
import type { PokemonEntry } from "../../types";
import { Link } from "react-router-dom";

interface PageTitleProps {
    name: string;
    id: number;
    pokedex: PokemonEntry[];
};

interface AdjacentPokemonProps {
    id: number;
    name: string;
    position?: "left" | "right";
};

function AdjacentPokemon({ id, name, position }: AdjacentPokemonProps) {
    return (
        <Link to={`/pokemon-details/${name}`} className={`flex flex-1 h-20 px-4 py-4 
     bg-neutral-500 border-neutral-500 hover:bg-neutral-600 hover:border-neutral-600 transition-all duration-300 
        [clip-path:polygon(0_0,100%_0,100%_100%,70%_100%,30%_60%,0_60%)]
        ${position === 'left' ? '-ml-10 rotate-y-180' : '-mr-10'}`}
        >
            <div className={`text-white font-normal gap-2 flex flex-1 ${position === 'left' ? 'rotate-y-180' : 'justify-end'}`}>
                {position === 'left' && <ChevronLeft />}
                <span >{`#${formatPokemonID(id)}`}</span>
                <span >{toTitleCase(name)}</span>
                {position === 'right' && <ChevronRight />}
            </div>
        </Link>
    );
}

export default function PageTitle({ name, id, pokedex }: PageTitleProps) {
    const prevPokemon = {
        id: id - 1 > 0 ? id - 1 : pokedex.length,
        name: ""
    };
    const nextPokemon = {
        id: id + 1 < pokedex.length ? id + 1 : 1,
        name: ""
    };
    prevPokemon.name = pokedex[prevPokemon.id - 1].pokemon_species.name;
    nextPokemon.name = pokedex[nextPokemon.id - 1].pokemon_species.name;
    return (
        <div className="relative flex w-full items-end pb-8">
            <AdjacentPokemon id={prevPokemon.id} name={prevPokemon.name} position="left" />
            <AdjacentPokemon id={nextPokemon.id} name={nextPokemon.name} position="right" />
            <div className="absolute flex gap-2 bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap
            font-semibold">
                <span className="flex items-end text-2xl text-secondary">{`#${formatPokemonID(id)}`}</span>
                <h1 className="text-4xl ">{toTitleCase(name)}</h1>
            </div>

        </div>
    );
}