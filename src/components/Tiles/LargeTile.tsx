import { TileChoicesItemType, TileTitleBarType } from "@/type/monicka"
import TitleBar from "./TitleBar"
import { Link } from "react-router-dom"

const Choices = ({ items }: { items: TileChoicesItemType[] }) => {
  return (
    <div className="p-2" >
      <ul className="w3-ul w3-hoverable two-columns">
        {items.map((item: TileChoicesItemType, idx:number) => (
          <li className="w3-round-large p-0" key={idx} >
            <Link className="w3-li-a text-black" to={item.to}>
              <h4 style={{ display: "inline-block" }} > {item.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div >
  )
}

const LargeTile = ({ titleBar, items, type }: { titleBar: TileTitleBarType, items: TileChoicesItemType[], type: string }) => {
  return (
    <div className="blog-tile w3-white w3-round-xlarge w3-zoom large-tile">
      <TitleBar {...titleBar} />
      { type === "choices" && <Choices items={items} /> }
    </div>
  )
}

export default LargeTile;