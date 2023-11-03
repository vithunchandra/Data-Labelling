export default function Navbar(){
    return(
        <nav className={`navbar navbar-expand-lg bg-primary`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar">Enable both scrolling & backdrop</button>
            </div>
        </nav>
    )
}