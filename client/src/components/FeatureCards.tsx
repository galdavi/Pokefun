type Feature = {
    icon?: string,
    title: string,
    description: string
}

function Feature({ feature }: { feature: Feature }) {
    return (
        <div className="flex md:w-xl md:h-sm px-1 py-4 bg-container-background rounded-md shadow-md">
            {feature.icon && <img src={`${feature.icon}`}
                className="w-24 h-20 md:w-32 md:h-20 lg:w-44 lg:h-32 "/>}
            <div className="flex flex-col gap-4 ">
                <h3 className="md:text-base lg:text-2xl font-bold text-nowrap text-text-secondary">{feature.title}</h3>
                <p className="md:text-xs lg:text-base">{feature.description}</p>
            </div>
        </div>
    );
}
export default function FeatureCards() {
    const features: Feature[] = [
        {
            icon: "./src/assets/icons/pokedex.png",
            title: "Pokedex",
            description: "Look at pokemon from every region!"
        },
        {
            icon: "./src/assets/icons/poke-details.png",
            title: "Pokemon Details",
            description: "View the details of your favorite pokemon!"
        },
        {
            icon: "./src/assets/icons/battle.png",
            title: "Battle",
            description: "Have pokemon battles with your friends."
        }
    ];


    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-4 m-4 gap-8">
            {features.map((f) => {
                return (
                    <Feature feature={f} key={f.title} />
                );
            })}
        </div>
    );
}