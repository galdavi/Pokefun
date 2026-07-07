import { useEffect, useState } from "react";
import {  type PokemonType,  type PokemonTypeData} from "../../types";
import { TYPE_COLORS,  type PokemonTypeName} from "../../constants";


function Effectiveness({ value }: { value: number | null }) {
    let background :string;
    let damageEffect : string;
    switch(value){
        case 0:
            damageEffect ="0";
            background = "bg-zinc-800 border border-red-700";
            break;
        case 0.25:
            damageEffect = "¼"; 
            background = "bg-red-900";
            break;
        case 0.50:
            damageEffect = "½";
            background = "bg-red-700";
            break;
        case 2:
            damageEffect = "2";
            background = "bg-lime-700";
            break;
        case 4:
            damageEffect = "4";
            background = "bg-lime-400";
            break;
        default:
            damageEffect ="";
            background="bg-white";
            break;

    }
    return (
        <div className={`flex items-center justify-center h-8 w-8 border ${background} border-gray-200 rounded-sm`} >
            <p className="text-xs text-white">{damageEffect}</p>
        </div>);
}
function getDamageRelations(damageData: PokemonTypeData[]) {
    const defenses = new Map<string , number | null>(
        Array.from(Object.keys(TYPE_COLORS)).map((name) => [name, null])
    );

    console.log(defenses);
    damageData.forEach((currType) => {
        for (const [damageCategory, relatedTypes] of Object.entries(currType.damage_relations)) {
            if (damageCategory === "no_damage_from") {
               
                relatedTypes.forEach((immunity : PokemonTypeData) => {
                    const name = immunity.name as PokemonTypeName;
                    defenses.set(name, 0);
                });
            } else if (damageCategory === "half_damage_from") {
                relatedTypes.forEach((resistance : PokemonTypeData) => {
                    const name = resistance.name as PokemonTypeName;
                    defenses.set(name, (defenses.get(name) || 1) / 2);
                })
            } else if (damageCategory === "double_damage_from") {
                relatedTypes.forEach((weakness : PokemonTypeData) => {
                    const name = weakness.name as PokemonTypeName;
                    defenses.set(name, (defenses.get(name) || 0) + 2);
                })
            }
        }
    })

    console.log(defenses)
    return defenses;

}

export default function PokemonTypeDefense({ pokemonTypes }: { pokemonTypes: PokemonType[]  }) {
    const [effectiveness, setEffectiveness] = useState<Map<string, number | null>>(new Map());
   



    useEffect(() => {
        
        const TYPES_API_URL = pokemonTypes.map((t) => t.type.url);
        const fetchData = async () => {
            try {
                const allPromises = TYPES_API_URL.map(async (url)=> {
                    const res = await fetch(url);
                    if(!res.ok){
                        throw new Error(`${res.status}`);
                    }
                    return res.json();
                });
                const data =  await Promise.all(allPromises);
                const damageRelations = getDamageRelations(data);

                setEffectiveness(damageRelations);
                
            } catch (error) {
                console.error(`Error Fetching data:${error}`);
            }
        };
        fetchData();
    }, [pokemonTypes])


    const typeEffects = Array.from(effectiveness);

    return (
        <div className="grid grid-cols-1 px-2 gap-2">
            <h2 className="text-2xl font-semibold">Type Defense</h2>
            <p className="text-xs text-text-secondary">How effective an attack type is against this Pokémon.</p>
            <div className="grid grid-cols-9 gap-1">
                {typeEffects.map(([typeName, multiplier]) =>
                    <div key={typeName} className="grid grid-cols-1 ">
                        <div className={`flex items-center  justify-center h-8 w-8 border border-gray-200 rounded-sm 
                            ${TYPE_COLORS[typeName as PokemonTypeName]}`}>
                            <span className="text-xs text-white font-semibold">{typeName.slice(0, 3).toUpperCase()}</span>
                        </div>
                        <Effectiveness key={typeName}value={multiplier} />
                    </div>)}
            </div>

        </div>
    );
}