import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"


export default function Layout() {
    return (
        <ScrollToTop>
            <div className="page-bg">
                <Navbar />
                <main className="container my-3">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ScrollToTop>
    );
}