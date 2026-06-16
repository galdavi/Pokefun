import { useEffect, useState } from "react";
import { TYPE_COLORS, type PokemonType } from "../types";

type TypeDamageData = {
    damage_relations: {
        double_damage_from: Array<{
            name: string,
            url: string
        }>
        half_damage_from: Array<{
            name: string,
            url: string
        }>
        no_damage_from: Array<{
            name: string,
            url: string
        }>
    }
}

function Effectiveness({ value }: { value: number | null }) {
    let background :string;
    let damageEffect : string;
    switch(value){
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
function getDamageRelations(typeDamageData: TypeDamageData[]) {
    const defenses = new Map<PokemonType, number | null>(
        (Object.keys(TYPE_COLORS) as PokemonType[]).map((key) => [key, null])
    );

    typeDamageData.forEach((t) => {
        for (const [damageCategory, relatedTypes] of Object.entries(t.damage_relations)) {

            if (damageCategory === "no_damage_from") {
                relatedTypes.forEach((immunity) => {
                    const name = immunity.name as PokemonType;
                    defenses.set(name, 0);
                });
            } else if (damageCategory === "half_damage_from") {
                relatedTypes.forEach((resistance) => {
                    const name = resistance.name as PokemonType;
                    defenses.set(name, (defenses.get(name) || 1) / 2);
                })
            } else if (damageCategory === "double_damage_from") {
                relatedTypes.forEach((weakness) => {
                    const name = weakness.name as PokemonType;
                    defenses.set(name, (defenses.get(name) || 0) + 2);
                })
            }
        }
    })

    return defenses;

}

export default function PokemonTypeDefense({ pokemonTypes }: { pokemonTypes: Array<{ slot: number; type: { name: PokemonType; url: string; } }> }) {
    const [effectiveness, setEffectiveness] = useState<Map<PokemonType, number | null>>(new Map());
   



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Promise.all((pokemonTypes.map((type) => fetch(type.type.url))));
                const data = await Promise.all((response.map((res) => res.json())));


                setEffectiveness(getDamageRelations(data));
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
                        <div className="flex items-center  justify-center h-8 w-8 border border-gray-200 rounded-sm"
                            style={{ background: TYPE_COLORS[typeName] }}>
                            <span className="text-xs text-white font-semibold">{typeName[0].slice(0, 3).toUpperCase()}</span>
                        </div>
                        <Effectiveness key={typeName}value={multiplier} />
                    </div>)}
            </div>

        </div>
    );
}