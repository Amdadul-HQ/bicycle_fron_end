import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

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

        </footer>
        </>
    );
};

export default Mainlayout;