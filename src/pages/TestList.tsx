import { AssignTestType, UserType } from "@/type/monicka";
import folderOpenIcon from '@/assets/folder-open.svg';
import plusIcon from '@/assets/plus.svg';
import { useEffect, useState } from "react";
import { getAssignTests } from "@/utils";
import TestDetail from "./TestDetail";

export default function TestList({user}: {user: UserType}) {
    const [tests, setTests] = useState<AssignTestType[]>([]);
    const [test, setTest] = useState<AssignTestType>();
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    useEffect(() => {
      if (firstLoad) {
        getAssignTests(true).then((data) => {
          setTests(data)
          setFirstLoad(false);
        });
      }
    }, [tests, test]);
    console.log(tests)

    if (test) {
      return <TestDetail test={test as AssignTestType} setTest={setTest} />
    }

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
               { tests.length == 0 ? (
                  <li className="w3-round-large">
                    <a>
                        <time className="w3-left"> </time>                            
                       <br className="w3-hide-large w3-hide-medium" />
                       <h3 style={{color:'black'}}>
                           در حال اتصال به سرور...
                       </h3>
                    </a>
                 </li>
               ):(<></>)
            }

               {tests.sort((a, b) => b.id - a.id).map((test, index) => (
                 <li key={index} className="w3-round-large">
                    <div style={{textDecoration: 'none'}} onClick={()=> setTest(test)}>
                        <time className="w3-left"> 
                          { new Date(test.assign_date).toLocaleString('fa-IR') }
                        </time>                            
                       <br className="w3-hide-large w3-hide-medium" />
                       <h3  style={{color:'black'}}>
                         { test.test.participant.get_full_name } - { test.test.get_type_display }
                       </h3>
                    </div>
                 </li>
               ))}
            </ul>
         </div>

      </div>
   </div>
</main>
    )
}