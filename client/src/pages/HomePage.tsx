import FeatureCards from "../components/FeatureCards";



export default function HomePage() {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                    <h1 className="text-3xl">Welcome to Pokefun!</h1>
                    <img src="./src/assets/temp.png" alt="pokemon" className="w-60 h-68 rounded-2xl" />
                </div>
                <div className="w-full ">
                    <FeatureCards/>
                </div>
            </div>
        </>
    );
}