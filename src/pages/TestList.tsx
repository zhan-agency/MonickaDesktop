import { AssignTestType, UserType } from "@/type/monicka";
import folderOpenIcon from '@/assets/folder-open.svg';
import reloadIcon from '@/assets/arrows-rotate-solid-full.svg';
import { useEffect, useState } from "react";
import { getAssignTests } from "@/utils";
import TestDetail from "./TestDetail";

export default function TestList({user}: {user: UserType}) {
    const [query, setQuery] = useState<string>('');
    const [tests, setTests] = useState<AssignTestType[]>([]);
    const [test, setTest] = useState<AssignTestType>();
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [recent, setRecent] = useState<boolean>(true)
    useEffect(() => {
      if (firstLoad) {
        getAssignTests(recent).then((data) => {
          setTests(data)
          setFirstLoad(false);
        });
      }
    }, [tests, test, recent]);
    console.log(tests)

    if (test) {
      return <TestDetail test={test as AssignTestType} setTest={setTest} />
    }

    return (
      <main id="main" className="w3-main-padding">
        <div className="w3-container" style={{paddingBottom: "16px"}}>
        <div className="w3-margin-sides-60 w3-white w3-round-xlarge">

         <div className="w3-title-bar flex">
            <a className="w3-title-bar-icon-backgroung w3-blue">
               <img className="w3-title-bar-icon w3-svg-color1" src={folderOpenIcon} />
            </a>
            <span className="w3-title-bar-title">آزمون‌های من</span>
            <p className="cursor-pointer w3-left h-full m-0 w-[200px] text-center bg-gray-100 rounded-lg p-2 " onClick={()=> {if (recent) {setRecent(false); setFirstLoad(true)}}}>
               { recent ? ('نمایش تست‌های قدیمی') : (firstLoad ? 'در حال بارگذاری' : 'انجام شد')}
            </p>
            <a className="w3-title-bar-icon-backgroung w3-left" onClick={()=> {setFirstLoad(true); setTests([])}}>
               <img className="w3-title-bar-icon2" src={reloadIcon} />
            </a>
           
         </div>

         <div className="m-8">
            <input className="bg-white p-4 w-full text-black rounded-lg" type="text" placeholder="جستجو" defaultValue={query} onChange={(e) => setQuery(e.target.value)}/>
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

               {tests.sort((a, b) => b.id - a.id).filter((t)=> t.test.participant.get_full_name.includes(query)).map((test, index) => (
                 <li key={index} className="w3-round-large cursor-pointer">
                    <div style={{textDecoration: 'none'}} onClick={()=> setTest(test)}>
                        <time className="w3-left"> 
                          { new Date(test.assign_date).toLocaleString('fa-IR') }
                        </time>                            
                       <br className="w3-hide-large w3-hide-medium" />
                       <h3  style={{color:'black'}}>
                         { test.test.participant.get_full_name } <span className="mr-2 text-[14px] p-2 bg-gray-200 rounded-lg">{ test.test.get_type_display }</span>
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