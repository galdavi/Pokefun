import { useState } from "react";
import { toTitleCase } from "../../helpers/formatters";
import type { Pokemon } from "../../types";
import imageNotFound from  "../../assets/image-not-found.png";

function getArtwork(pokemon: Pokemon) {
    const artwork = new Map<string, string>();

    for (const [key, value] of Object.entries(pokemon.sprites.other)) {
        if (key !== "showdown" && key !== "dream_world") {
           
            
            if (key === "home") {
                artwork.set("Game", value.front_default ?  value.front_default: imageNotFound)  
            } else {
                artwork.set(toTitleCase(key), value.front_default ?  value.front_default: imageNotFound);
            }
        }
    }
    return artwork
}
interface TabsProp {
    items: string[];
    current: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function Tabs({ items, current, handleClick}: TabsProp) {
    const tabStyle = {
        on: "bg-white border-b-white -mb-px",
        off: "bg-neutral-200 border-b-0 text-neutral-500"
    }
    
    return (
        <div className="flex justify-center w-full border-b  gap-2 border-neutral-300">
            {
                items.map((i) => <button
                    className={`flex items-center justify-center px-2 py-2 text-sm rounded-t-md
                        border border-t-neutral-300 border-x-neutral-300
                        ${current === i ? tabStyle.on : tabStyle.off}
                        `}
                    key={i} value={`${i}`} onClick={handleClick}
                >{i}</button>
                )}
        </div>
    );
}

export default function Artwork({ pokemon }: { pokemon: Pokemon }) {
    const [current, setCurrent] = useState("Official Artwork");
    const artwork = getArtwork(pokemon);
    
    return (
        <>
            <Tabs items={Array.from(artwork.keys())} current={current}
            handleClick={(e) => { setCurrent(e.currentTarget.value) }} />
            {
                <div className="w-full max-w-xs bg-card-secondary-background rounded-md">
                    <img className="h-auto w-full object-cover" src={artwork.get(current)} alt={current} />
                </div>
            }

        </>
    );
}