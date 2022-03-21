import React from "react"
import {Link} from "react-router-dom"
class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand">
                    Moklet Laundry
                </a>
 
                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
 
                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/member" className="nav-link">
                                Member
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">
                                User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/paket" className="nav-link">
                                Paket
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transaksi" className="nav-link">
                                Transaksi
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
