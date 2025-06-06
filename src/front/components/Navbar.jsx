import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
    const [isValid, setIsValid] = useState(false);

    const checkToken = () => {
        const token = localStorage.getItem("jwt-token") || localStorage.getItem("token");
        if (token && token !== '1' && token.length > 10) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    useEffect(() => {
        checkToken();
    });

    useEffect(() => {
        window.addEventListener("storage", checkToken);
        window.addEventListener("focus", checkToken);
        return () => {
            window.removeEventListener("storage", checkToken);
            window.removeEventListener("focus", checkToken);
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-md" id="navbar">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">Rest<span className="text-green">ing</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <form className="d-flex flex-column flex-md-row ms-auto" role="search">
                            {isValid ? (
                                <>
                                    <Link to={`/profile/${localStorage.getItem("user_id")}`} className="btn btn-green mx-2">My Profile</Link>
                                    <button className="btn btn-danger" onClick={() => {localStorage.removeItem("jwt-token"); localStorage.removeItem("user_id"); window.dispatchEvent(new Event("storage")); navigate("/"); }} > Log Out </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-light mx-2">Log In</Link>
                                    <Link to="/api/signup" className="btn btn-green mx-2">Sign Up</Link>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default Navbar;
export { Navbar };