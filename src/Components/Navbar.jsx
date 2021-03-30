import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="nav bg-dark">
                <Link to='/' className="nav-link active">Home</Link>
                <Link to='/admin' className="nav-link active">Admin</Link>
            </nav>
        )
    }
}