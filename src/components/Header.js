import React from 'react';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';

const Header = ({userInfo,setUserInfo}) => {

    const history = useHistory();

    const signout = () => {
        axios.post('/logout').then(res => {
           history.push('/login')
           setUserInfo(null)
        })

        
    }

    return (
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/myBooks">Mes livres</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myBorrows">Mes emprunts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/listBooks">Livres disponibles</Link>
                    </li>
                </ul>
                <div>Bienvenue, {userInfo}</div>
                <button variant="secondary" onClick={signout}>Se déconnecter</button>
            </div>
        </nav>
       
    );
};

export default Header;