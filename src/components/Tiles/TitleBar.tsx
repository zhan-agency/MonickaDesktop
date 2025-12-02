import { TileTitleBarType } from "@/type/monicka";
import { Link } from "react-router-dom";

const TitleBar = ({ to, button_to, title, icon, button_icon, iconBackgroundClassName }: TileTitleBarType) => {
    return (
      <div className="w3-title-bar">
        <Link className="w3-title-bar-link" to={to}>
          <div className={`w3-title-bar-icon-backgroung ${iconBackgroundClassName ?? "w3-blue "}`}>
            <img className="w3-title-bar-icon w3-svg-color1" src={icon} />
          </div>
          <div className="w3-title-bar-title text-black">
            {title}
          </div>
        </Link>
  
        <Link className=" w3-title-bar-icon-backgroung w3-left" to={button_to ?? to}>
          <img className="w3-title-bar-icon2" src={button_icon} />
        </Link>
      </div>
    )
  }

export default TitleBar;