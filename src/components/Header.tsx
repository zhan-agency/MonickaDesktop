import { UserType } from "@/type/monicka";
import { Link } from "react-router-dom";
import userIcon from '@/assets/user.svg';
import powerOffIcon from '@/assets/power-off.svg';
import monickaLogo from '@/assets/monicka-logo-54.png';

const HeaderNavbarItem = ({ to, title }: { to: string; title: string }) => {
    return (
      <Link className="w3-bar-item w3-top-menu-item w3-top-menu-item-text w3-button w3-right w3-round"
        to={to}>
        {title}
      </Link>
    )
  }

  const HeaderNavbarIcon = ({ to, icon }: { to: string; icon: string }) => {
    return (
      <div className="w3-button w3-round w3-left" style={{ padding: "4px", margin: "0px 8px" }}>
        <Link to={to}>
          <img className="w3-bar-item w3-top-menu-icon w3-svg-color1" src={icon} />
        </Link>
      </div>

    )
  }

  const MonickaNavbarIcon = () => {
    return (
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="w3-bar-item w3-right w3-top-menu-item w3-top-menu-logo">
          <img className="w3-right w3-top-menu-item" style={{ paddingLeft: "5px", paddingRight: "7px" }}
            src={monickaLogo} />
          <div style={{ color: "white", fontSize: "22px", fontWeight: "900" }}>مونیکا</div>
        </div>
      </Link>
    )
  }

  const NavbarItems = ({user}: {user: UserType}) => {
    return (
      <div>
        <div className="w3-hide-small">
          {(user.is_authenticated ? (
            <>
              <HeaderNavbarItem to="/test_list/" title="آزمون‌ها" />
              <HeaderNavbarItem to="/booking/" title="نوبت‌ها" />
              <HeaderNavbarItem to="/test_list" title="پرداخت‌ها" />
              <HeaderNavbarItem to="/test_list" title="برنامه مشاورین" />
              <HeaderNavbarItem to="/support" title="پشتیبانی" />
              <HeaderNavbarIcon to="/user_profile" icon={userIcon} />
              <HeaderNavbarIcon to="/user_logout" icon={powerOffIcon} />
            </>
          ) : (
            <>
              <HeaderNavbarItem to="/post_list" title="مجله" />
              <HeaderNavbarItem to="/pricing" title="تعرفه خدمات" />
              <HeaderNavbarIcon to="/user_login" icon={userIcon} />
            </>
          ))}
        </div>

        {(user.is_superuser ? (
          <HeaderNavbarItem to="/admin" title={user.profile.type} />
        ) : (<></>))}
      </div>
    )
  }

  const Navbar = ({user}: {user: UserType}) => {
    return (
      <div id="top-menu" className="w3-bar w3-top-menu w3-top-menu-blur" style={{ color: "white" }}>
        <MonickaNavbarIcon />
        <NavbarItems user={user} />
      </div>
    )
  }

  const Header = ({user}: {user: UserType}) => {
    return (
      <header style={{ height: "var(--top-menu-height)" }}>
        <div>
          <Navbar user={user}  />
        </div>
        <span id="mainTop"></span>
      </header>
    )
  }

export default Header;