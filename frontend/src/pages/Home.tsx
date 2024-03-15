import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-page-btn-container">
        <button
          className="home-page-btn"
          onClick={() => {
            navigate("/chat");
          }}
        >
          Börja chatta
        </button>
      </div>
    </>
  );
};
