import { useEffect, useState } from "react";
import type { Pokemon } from "../../types";
import { POKEMON_API_URL, cardSizeClasses } from "../../constants";
import { formatPokemonID, getPokemonID, toTitleCase } from "../../helpers/formatters";
import imageNotFound from "../../assets/image-not-found.png";
import PokemonTypeBadges from "../PokemonTypeBadges";
import { Link } from "react-router-dom";

interface PokemonCardProps {
    name: string;
}
export default function PokemonCard({ name }: PokemonCardProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch(POKEMON_API_URL + name.toLowerCase(), {
            signal: controller.signal,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status}`)
                }

                return res.json();
            })
            .then((data) => {
                setPokemon(data);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    console.error(err);
                }
            });

        return () => controller.abort();
    }, [name]);

    if (!pokemon) {
        return (
            <div className={`${cardSizeClasses} flex items-center justify-center`}>
                <span>Loading...</span>
            </div>
        );
    }

    const pokemonID = getPokemonID(pokemon.species.url);

    return (
        <div className={`
            ${cardSizeClasses}
            flex flex-col items-center justify-start
            gap-1 px-2 py-3
        `}>
            <Link to={`/pokemon-details/${pokemonID}`}
                className="aspect-square w-full max-w-24 sm:max-w-28 lg:max-w-32">
                <img
                    className="h-full w-full object-contain
                    hover:scale-105 transition-transform duration-300 ease-in-out"
                    src={
                        pokemon.sprites.other.home.front_default ??
                        imageNotFound
                    }
                    alt={pokemon.name}
                />
            </Link>
            <Link to={`/pokemon-details/${pokemonID}`}
                className="font-semibold text-sm lg:text-md">
                {toTitleCase(pokemon.name)}
            </Link>

            <span className="text-neutral-600 text-xs lg:text-sm">
                #{formatPokemonID(pokemonID)}
            </span>

            <PokemonTypeBadges types={pokemon.types} />
        </div>
    );
}