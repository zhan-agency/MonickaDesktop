import { UserType } from "@/type/monicka";
import folderOpenIcon from '@/assets/folder-open.svg';
import plusIcon from '@/assets/plus.svg';
import { useEffect, useState } from "react";
import { getAssignTests } from "@/utils";

export default function TestList({user}: {user: UserType}) {
    const [tests, setTests] = useState<Array<{[key: string]: any}>>([]);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    useEffect(() => {
      if (firstLoad) {
        getAssignTests().then((data) => {
          setTests(data)
          setFirstLoad(false);
        });
      }
    }, [tests]);
    console.log(tests)
    return (
      <main id="main" className="w3-main-padding">
        <div className="w3-container" style={{paddingBottom: "16px"}}>
        <div className="w3-margin-sides-60 w3-white w3-round-xlarge">

         <div className="w3-title-bar">
            <a className="w3-title-bar-icon-backgroung w3-blue">
               <img className="w3-title-bar-icon w3-svg-color1" src={folderOpenIcon} />
            </a>
            <span className="w3-title-bar-title">آزمون‌های من</span>
            <a className="w3-title-bar-icon-backgroung w3-left" href="/test/new/">
               <img className="w3-title-bar-icon2" src={plusIcon} />
            </a>
         </div>


         <div style={{padding: '8px'}}>
            <ul className="w3-ul w3-hoverable">

               {tests.sort((a, b) => b.id - a.id).map((test, index) => (
                 <li key={index} className="w3-round-large">
                    <a style={{textDecoration: 'none'}} href={`test/${ test.id }/`}>
                        <time className="w3-left"> 
                          { test.date }
                        </time>                            
                       <br className="w3-hide-large w3-hide-medium" />
                       <h3>
                         { test.test.participant.get_full_name } - { test.test.get_type_display }
                       </h3>
                    </a>
                 </li>
               ))}
            </ul>
         </div>

      </div>
   </div>
</main>
    )
}