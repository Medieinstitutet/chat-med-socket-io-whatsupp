import { Link } from "react-router-dom"

function homePage() {
  
  return (
    <>
      <Link to="/room">
        <button className="chat-btn">Börja Chatta!</button>
      </Link>      
    </>
  ) 
}

export default homePage