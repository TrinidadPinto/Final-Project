import { Link } from "react-router-dom";

const Navbar = () => {
    return (<>
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container">
                <Link to={'/'} className="navbar-brand">Zunko</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <form className="d-flex flex-column flex-md-row ms-auto" role="search">
                        <button className="btn me-md-2 mb-2 mb-md-0" type="submit">Log In</button>
                        <button className="btn btn-outline-primary" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </nav>
    </>)
}
export default Navbar;
export { Navbar };