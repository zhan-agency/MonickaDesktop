import { IconLinkType, LinkType } from "@/type/monicka";
import { Link } from "react-router-dom";

const FooterNavbarItem = ({ to, title }: LinkType) => {
  return (
    <Link className="w3-footer-link w3-button w3-round p-0" target="_blank"
      to={to}>{title}</Link>
  )
}

const FooterNavbarIcon = ({to, icon}: IconLinkType) => {
  return (
    <Link className="w3-footer-icon" target="_blank" to={to}>
      <button className="w3-button w3-round" style={{ padding: "5px" }}>
        <img src={icon} className="w3-right" style={{ height: "15px" }} />
      </button>
    </Link>
  )
}

const MediumLargeFooter = ({ links }: { links: LinkType[] }) => {
  const icons= {
    telegram: {to:"http://t.me/monicka_ir", icon:"/telegram-38.png"},
    github: {to:"http://github.com/hafezmehr", icon:"/GitHub.png"},
  }
  
  return (
    <div id="legal-footer" className="w3-contatiner w3-white w3-hide-small" style={{ padding: "30px 0px" }}>
      <div className="w3-margin-sides-60 w3-container">

        {links.map((item: LinkType, idx) => (
          <FooterNavbarItem key={idx} {...item} />
        ))}

        <FooterNavbarIcon {...icons.telegram} />
        <FooterNavbarIcon {...icons.github} />

        <span className="w3-left">
          تمامی حقوق برای مونیکا محفوظ است ۱۴۰۴-۱۴۰۱©
        </span>
      </div>
    </div>
  )
}

const Footer = ({ links }: { links: LinkType[] }) => {
  return (
    <footer>
      <MediumLargeFooter links={links} />
    </footer>
  )
}

export default Footer;