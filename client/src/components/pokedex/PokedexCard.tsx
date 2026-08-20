
import type { Pokemon } from "../../types";
import { formatPokemonID, toTitleCase } from "../../helpers/formatters";
import ImageNotFound from "../../assets/image-not-found.png";
import PokemonTypeBadges from "../PokemonTypeBadges";
import { Link } from "react-router-dom";

interface PokedexCardProps {
    id: number;
    name: string;
    pokemon: Pokemon;
}
export default function PokedexCard({ id, name, pokemon }: PokedexCardProps) {


    return (
        <div className="flex flex-col  items-center justify-center 
        w-full h-auto min-w-40 max-w-48 bg-card-background py-4 px-4 gap-2
        border border-gray-200 rounded-sm shadow-sm">
            <Link to={`/pokemon-details/${id}`}
                className="text-xs text-secondary font-medium
                hover:text-blue-800 transition-colors duration-200">
                #{formatPokemonID(id)}
            </Link>

            <Link to={`/pokemon-details/${id}`}
                className="flex items-center justify-center 
             w-full h-auto max-w-36 min-w-34 py-4 px-2
             bg-card-secondary-background rounded-md ">
                <img className="h-full w-full object-contain
                    hover:scale-105 transition-transform duration-300 ease-in-out"
                    src={pokemon.sprites.other.home.front_default ?? ImageNotFound} alt={name} />
            </Link>

            <Link to={`/pokemon-details/${id}`}
                className="text-sm font-semibold">{toTitleCase(name)}</Link>
            <PokemonTypeBadges types={pokemon.types} />
        </div>

    );
}