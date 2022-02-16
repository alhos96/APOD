import "./logo.css";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div className="wrapp">
      <img className="logo" src={logo} onClick={() => navigate("/")} />
    </div>
  );
}

export default Logo;
