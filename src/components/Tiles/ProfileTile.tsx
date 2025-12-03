import { UserType } from "@/type/monicka"
import { Link } from "react-router-dom"
import circleUserIcon from '@/assets/circle-user.svg';

const ProfileTile = ({ user }: { user: UserType }) => {
  return (
    <div className="profile-tile w3-round-xlarge small-tile w3-zoom w3-right">
      <Link style={{ width: "100%", height: "100%", display: "block", margin: "0px", textDecoration: "none" }}
        to="/profile">
        <div style={{ height: "30px", marginBottom: "-30px" }}> </div>
        <img className=" profile-tile-icon w3-svg-color2" src={circleUserIcon} />
          <div style={{ padding: "0px 30px" }}>
            <h3 className="text-black">{ user.get_full_name }</h3>
            <p className="text-black font-size-[15px]">{ user.email }</p>
            {user.profile.type == "1" ?
              (<strong className="text-black font-size-[15px]">اکانت { user.profile.get_level_display }</strong>) :
              (<strong className="text-black font-size-[15px]">{ user.profile.get_type_display }</strong>)
            }
          </div>
      </Link>
    </div>
  )
}

export default ProfileTile;