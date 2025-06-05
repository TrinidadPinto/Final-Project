import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
            <nav className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">Resting</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <form className="d-flex flex-column flex-md-row ms-auto" role="search">
                            {isValid ? (
                                <Link to={`/profile/${localStorage.getItem("user_id")}`} className="btn btn-outline-primary">My Profile</Link>
                            ) : (
                                <>
                                    <Link to="/login" className="btn me-md-2 mb-2 mb-md-0">Log In</Link>
                                    <Link to="/api/signup" className="btn btn-outline-primary">Sign Up</Link>
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