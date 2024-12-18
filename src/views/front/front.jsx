import "./front.scss";
import { Calendar } from "../../components";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";

const Front = () => {
  const { plan } = useContext(AppContext);

  return (
    <div className="app-front-container">
      <div className="container">
        <Calendar plan={plan} />
      </div>
    </div>
  );
};

export default Front;
