
import { NavLink } from "react-router-dom"

export const Navigation = () => {
    return <>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About us</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    
};