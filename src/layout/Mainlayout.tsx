import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Mainlayout = () => {
    return (
        <>
        {/* navbar */}
        <header>
            <Navbar/>
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