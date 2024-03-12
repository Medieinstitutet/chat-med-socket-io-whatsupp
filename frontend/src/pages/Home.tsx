import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()
    return<>
            <div className="btn1">
                    <button
                    onClick={() => {
                        navigate("/chat")
                    }}
                    >Börja chatta</button>
                </div>
    
    </>
}
