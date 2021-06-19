import React from 'react';
import {Link} from 'react-dom';


export default function Navbar(props) {
    return (
        <div className="navbar">
            <div>
                <Link to="/home">
                Home
                </Link>
            </div>
            <div>
                <Link to="/assignment">
                Assignment
                </Link>
            </div>
            
        </div>)
}