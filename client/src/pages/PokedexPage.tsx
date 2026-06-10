import { useEffect, useState } from "react";
import Pokedex from "../components/Pokedex";

const GEN_API_URL = "https://pokeapi.co/api/v2/generation/"



function cleanData(data: Array<{ name: string, url: string }>) {
    const generation = new Map<string, string>();
    
    for (let i = 0; i < data.length; i++) {
        data[i].name = data[i].name.replace(/-/g, " ");
        data[i].name = data[i].name[0].toUpperCase() + data[i].name.slice(1);

        generation.set(data[i].name, data[i].url);
    }
    return generation;
}

export default function PokedexPage() {
    const [generation, setGenerations] = useState<Map<string, string>>();
    const [current, setCurrent] = useState<string>("Generation i");
    useEffect(() => {
        fetch(GEN_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} `);
                }

                return response.json();
            })
            .then((data) => {
                setGenerations(cleanData(data.results));
                
            })
            .catch((error) => { console.error(error); })
    }, []);

    return (
        <>
            {generation &&
                <div className="flex flex-col items-center justify-center w-full pt-2 gap-2">
                    <div>
                        <label>Select Generation: </label>
                        <select value={current}
                            onChange={(e)=>{setCurrent(e.target.value);}}>
                            {Array.from(generation.keys(),(gen) => <option key={gen}>{gen}</option>)}
                        </select>
                    </div>
                    <Pokedex url={generation.get(current) ?? null} />
                </div>
            }

        </>
    );
}