import { EVOLUTION_TRIGGERS } from "../../constants";
import { toTitleCase } from "../../helpers/formatters";
import type { EvolutionDetail } from "../../types";

function getEvolutionConditions(evolutionDetails: EvolutionDetail[]) {
    const descriptions: string[] = [];

    let hasLocationGroup = false;
    let hasSpecialRock = false;
    let locationDescriptionIndex = 0;

    for (const detail of evolutionDetails) {
        // PokeAPI returns one EvolutionDetail per valid location for certain
        // level-up evolutions (e.g. Leafeon, Magnezone). These entries are
        // otherwise identical, so we merge the locations into one description.
        if (hasLocationGroup && detail.trigger.name === "level-up" &&
            detail.location) {
            descriptions[locationDescriptionIndex] += ` ${toTitleCase(detail.location.name)},`;

            if (detail.near_special_rock) {
                hasSpecialRock = true;
            }
            continue;
        }

        let description =
            EVOLUTION_TRIGGERS[
            detail.trigger.name as keyof typeof EVOLUTION_TRIGGERS
            ] ?? toTitleCase(detail.trigger.name);

        if (detail.item) {
            description += ` ${toTitleCase(detail.item.name)}`;
        }

        if (detail.min_level !== null) {
            description += ` to level ${detail.min_level}`;
        }

        if (detail.min_happiness !== null) {
            description += ` to happiness ${detail.min_happiness}`;
        }

        if (detail.min_affection !== null) {
            description += ` with ${detail.min_affection} affection`;
        }

        if (detail.known_move) {
            description += ` while knowing ${toTitleCase(detail.known_move.name)}`;
        }

        if (detail.known_move_type) {
            description += ` while knowing a ${toTitleCase(detail.known_move_type.name)}-type move`;
        }

        if (detail.used_move) {
            description += ` after using ${toTitleCase(detail.used_move.name)}`;

            if (detail.min_move_count !== null) {
                description += ` ${detail.min_move_count} times`;
            }
        }

        if (detail.held_item) {
            description += ` while holding ${toTitleCase(detail.held_item.name)}`;
        }

        if (detail.trade_species) {
            description += ` with ${toTitleCase(detail.trade_species.name)}`;
        }

        if (detail.party_species) {
            description += ` with ${toTitleCase(detail.party_species.name)} in the party`;
        }

        if (detail.party_type) {
            description += ` with a ${toTitleCase(detail.party_type.name)} type Pokémon in the party`;
        }

        if (detail.time_of_day) {
            description += ` during the ${toTitleCase(detail.time_of_day)}`;
        }

        if (detail.location) {
            description += ` in: ${toTitleCase(detail.location.name)},`;
            locationDescriptionIndex = descriptions.length;
            hasLocationGroup = true;
        }

        if (detail.region) {
            description += ` in the ${toTitleCase(detail.region.name)} region`;
        }

        if (detail.gender === 1) {
            description += " if female";
        } else if (detail.gender === 2) {
            description += " if male";
        }

        if (detail.relative_physical_stats !== null) {
            if (detail.relative_physical_stats === 1) {
                description += " when Attack is higher than Defense";
            } else if (detail.relative_physical_stats === -1) {
                description += " when Defense is higher than Attack";
            } else {
                description += " when Attack and Defense are equal";
            }
        }

        if (detail.needs_overworld_rain) {
            description += " while it is raining";
        }

        if (detail.needs_multiplayer) {
            description += " while connected with another player";
        }

        if (detail.turn_upside_down) {
            description += " and physically turn your console upside down";
        }

        if (detail.near_special_rock) {
            hasSpecialRock = true;
        }

        if (detail.min_steps !== null) {
            description += ` and walk ${detail.min_steps} steps`;
        }
        descriptions.push(description);
    }

    if (hasSpecialRock && descriptions[locationDescriptionIndex]) {
        descriptions[locationDescriptionIndex] += " near a special rock";
    }

    return descriptions;
}

interface EvolutionDetailsProps {
    evolutionDetails: EvolutionDetail[];
}
export default function EvolutionDescription({ evolutionDetails }: EvolutionDetailsProps) {

    const evolutionConditions = getEvolutionConditions(evolutionDetails);
    const descriptions = evolutionConditions.join(" or ");
    return (
        <div className="flex flex-col w-full text-2xs lg:text-xs">
            <span>({descriptions})</span>
        </div>
    );
}