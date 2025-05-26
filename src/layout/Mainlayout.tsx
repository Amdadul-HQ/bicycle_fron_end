import { Outlet } from "react-router-dom";
import { MegaNavbar  } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Mainlayout = () => {
    return (
        <>
        {/* navbar */}
        <header>
            <MegaNavbar/>
        </header>

        {/* content */}
        <main>
            <Outlet/>
        </main>
        
        {/* footer */}
        <footer>
            <Footer/>
        </footer>
        </>
    );
};

export default Mainlayout;