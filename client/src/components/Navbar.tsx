import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    const navBase = "flex items-center justify-between w-full h-12 px-4 bg-primary-red shadow-lg";
    const mobileNav = "sm:hidden flex flex-col w-full items-center justify-center gap-2 bg-primary-red";
    const mobileMenuButton = "flex items-center justify-center w-full py-2 text-white hover:bg-secondary-red";

    return (
        <>
            <nav className={navBase}>
                <div className="flex items-center">
                    <Link to="/" className="text-md text-white">Pokéfun</Link>
                    <img src="./src/assets/pokefun-logo.png" alt=""
                        className="w-16 h-12" />
                </div>
                <button onClick={() => setOpenMenu(prev => !prev)}
                    className="sm:hidden flex items-center justify-center w-8 h-8 mr- bg-secondary-red rounded-sm hover:opacity-80 hover:cursor-pointer">
                    <Menu className="text-white w-5 h-5" />
                </button>
                <div className="hidden sm:flex gap-4    ">

                <Link to="/pokedex" className="text-sm text-white">Pokedex</Link>
                <Link to="/pokemon-details" className="text-sm text-white">Pokemon Details</Link>

                </div>
            </nav>

            {
                openMenu &&
                <nav className={mobileNav}>
                    <Link to="/pokedex"
                        className={mobileMenuButton}
                    >Pokedex</Link>
                    <Link to="/pokemon-details"
                        className={mobileMenuButton}
                    >Pokemon Details</Link>
                </nav>
            }
        </>
    );
}