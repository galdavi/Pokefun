export function toTitleCase(text : string){
    text = text.replace(/-/g, " ");
    return text.replace(/(^|\s)[a-z]/g, match => match.toUpperCase())
}

export function formatStat(stat : string){
        switch (stat) {
            case "hp":
                stat = stat.toUpperCase();
                break;
            case "special-attack":
                stat = "Sp. Atk";
                break;
            case "special-defense":
                stat = "Sp. Def";
                break;
            default:
                stat = toTitleCase(stat);
                break;
            }

            return stat;
}