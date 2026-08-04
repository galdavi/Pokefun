import type { ErrorState } from "../types";

 

export default function FetchError({error} : {error: ErrorState}) {
    return(
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-6xl font-semibold">{`Error: ${error.title}`}</h1>
            <span className="text-lg text-text-secondary">{error.message}</span>
        </div>
    );
}