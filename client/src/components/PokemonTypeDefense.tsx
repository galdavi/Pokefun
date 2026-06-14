import { useEffect } from "react";
import { TYPE_COLORS, type PokemonType } from "../types";



export default function PokemonTypeDefense({ data }: { data: Array<{ slot: number; type: { name: PokemonType; url: string; } }> }) {
    
    const types = Object.keys(TYPE_COLORS) as PokemonType[];
    useEffect(() =>{
        fetch(data[0].type.url)
        .then((res)=> {
            if(!res.ok){
                throw new Error (`${res.status}`);
            }

            return res.json();
        })
        .then((data) =>{
            console.log(data);
        })
        .catch((err) => {console.log(err)});
    },[data])
    
    return (
        <div className="grid grid-cols-1 px-2 gap-2">
            <h2 className="text-2xl font-semibold">Type Defense</h2>
            <div className="grid grid-cols-9 gap-1">
                {types.map((type) => 
                <div className="grid grid-cols-1 ">
                    <div className="flex items-center  justify-center h-8 w-8 border border-gray-200 rounded-sm"
                        style={{background: TYPE_COLORS[type]}}>
                        <p className="text-xs text-white font-semibold">{type.slice(0,3).toUpperCase()}</p>
                    </div>
                    <div className="flex items-center justify-center h-8 w-8 border border-gray-200 rounded-sm"></div>                   
                </div> )}
            </div>
            
        </div>
    );
}