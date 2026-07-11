interface TabsListsProps{
    items: string[];
    current: string;
    position?:string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const POSITIONS = {
    "left":"items-start",
    "middle" : "justify-center",
    "right": "items-end"
}

export default function TabsLists({ items, current, position = "middle", handleClick}: TabsListsProps){
    const tabStyle = {
        on: "bg-white border-b-white -mb-px",
        off: "bg-neutral-200 border-b-0 text-neutral-500"
    }
    
    return (

        <div className={`flex w-full ${POSITIONS[position as keyof typeof POSITIONS] ?? ''} border-b  gap-2 border-neutral-300`}>
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