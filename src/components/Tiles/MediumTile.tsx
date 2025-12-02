import { TileListItemType, TileTitleBarType, UserType } from "@/type/monicka";
import { Link } from "react-router-dom";
import TitleBar from "./TitleBar";

const List = ({ items, user }: { items: TileListItemType[]; user: UserType }) => {
  return (
    <div style={{ padding: "8px" }}>
      {!items ? (
        <p className="w3-empty-tile">
          {user.profile.type == '2' ? ("آزمونی موجود نیست.") : ("مشتاق اولین آزمونتیم!")}
        </p>
      ) : (
        <ul className="w3-ul w3-hoverable">
          { items.map((item: TileListItemType, idx: number) => (
            <li key={idx} className="w3-round-large" style={{ padding: "0px 0px" }}>
              <Link className="w3-li-a text-black" to={item.to} >
                <time className="w3-left ">
                  {item.date}
                </time>
                <br />
                <h4 style={{ marginTop: "0px" }}>
                  {item.title}
                </h4>
              </Link>
            </li>
          ))
          }
        </ul >
      )}
    </div >
  )
}

const MediumTile = ({ titleBar, user, items, type }: { titleBar: TileTitleBarType, user: UserType; items: any, type: string }) => {
  return (
    <div className="items-tile w3-white w3-round-xlarge medium-tile w3-zoom w3-left">
      <TitleBar {...titleBar} />
      {type == 'list' ? (
        <List items={items} user={user} />
      ) : (<></>)}
    </div>
  )
}

export default MediumTile;