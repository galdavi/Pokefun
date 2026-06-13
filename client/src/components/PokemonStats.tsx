

function formatStats(data: { base_stat: number, stat: { name: string } }[]) {
    const stats = [];
    for (const stat of data) {
        let name: string;

        switch (stat.stat.name) {
            case "hp":
                name = stat.stat.name.toUpperCase();
                break;
            case "special-attack":
                name = "Sp. Atk";
                break;
            case "special-defense":
                name = "Sp. Def";
                break;
            default:
                name = stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1);

        }

        let color: string;
        switch (true) {
            case (stat.base_stat < 30):
                color = "bg-red-500";
                break;
            case (stat.base_stat < 59):
                color = "bg-orange-500";
                break;
            case (stat.base_stat < 89):
                color = "bg-yellow-400";
                break;
            case (stat.base_stat < 119):
                color = "bg-lime-400";
                break;
            case (stat.base_stat < 149):
                color = "bg-green-600";
                break
            default:
                color = "bg-teal-500";
        }
        stats.push({ name: name, value: stat.base_stat, background: color });
    }

    return stats;
}
export default function PokemonStats({ data }: { data: Array<{ base_stat: number, stat: { name: string } }> }) {
    const stats = formatStats(data);
    const maxStatValue = 255;
    return (
        <div className="grid grid-cols-1 w-2/3 gap-1">
            <h2 className="text-2xl font-semibold">Base Stats</h2>
            <div className="grid grid-cols-1  w-full border-y border-gray-300">
                {stats.map((stat) =>
                    <div key={stat.name} className="flex w-full py-1 px-2 gap-2" >
                        <h2 className="w-12 text-xs text-text-secondary">{stat.name}</h2>
                        <p className=" w-10 text-xs"> {stat.value}</p>
                        <div className="flex items-center flex-1"><div className={`h-2 ${stat.background} rounded-xs`} style={{ width: `${(stat.value / maxStatValue) * 100}%` }}></div></div>
                    </div>
                )}
            </div>
        </div>
    );
}
