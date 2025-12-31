import { AssignTestType, MBTI5TestType, TestType } from "@/type/monicka";
import folderOpenIcon from '@/assets/folder-open.svg';
import plusIcon from '@/assets/plus.svg';
import { useEffect, useState } from "react";
import { getAssignTests } from "@/utils";
import clipboardListCheckIcon from "@/assets/clipboard-list-check.svg";
import printIcon from "@/assets/print.svg"
import arrowUpRightFromSquareIcon from "@/assets/arrow-up-right-from-square.svg"
import toolBoxIcon from "@/assets/toolbox.svg"
import MBTI from "@/components/Tests/MBTI";

export default function TestDetail({ test, setTest }: { test: AssignTestType, setTest: (test: AssignTestType) => void }) {
  const testObj: TestType = test.test; 
  const SidePanel = ({ assignedTest }: { assignedTest: AssignTestType }) => {
    const test: TestType = assignedTest.test;
    return (
      <div className="w3-sidepanel w3-right w3-quarter" id="sidepanel">
        <aside>
          <ul className="w3-ul">
            <li>

              <div style={{padding: "10px 0px"}}>
                <h4 className="text-black">آزمون { test.get_type_display }</h4>
                <h4 className="text-black">مراجع: { test.participant.get_full_name }</h4>
                <div style={{paddingBottom: "15px"}}>
                  <time><span className="persian-date" id="{ test.date|date:'Y, m, d' }"></span></time>
                </div>
              </div>

              <a href="" target="_blank" className="w3-button w3-round"
                style={{textDecoration: "none", margin: "8px 4px", backgroundColor: "var(--split)"}}>
                پرسشنامه
                <img style={{height: "22.472px", paddingRight: '8px'}}
                  src={arrowUpRightFromSquareIcon} />
              </a>
            </li>
            <li>
              <div style={{padding: "10px 0px"}}>
                <h4 className="text-black">
                  <img style={{height: "30px"}} src={toolBoxIcon} />
                    جعبه ابزار
                </h4>

                <a href="#guide" style={{textDecoration: "none"}}>
                  <input className="w3-check" type="checkbox" checked={true}/>
                    <label className="w3-button w3-hoverable w3-round" style={{padding: '4px'}}>نمایش تحلیل</label>
                </a >

                <br />

                <a className="w3-button w3-round" style={{margin: "8px 4px", backgroundColor: "var(--split)"}} id="print"
                  href = "javascript:window.print()" >
                  <img style={{height: "22.5px", paddingLeft: "8px"}} src = { printIcon } />
                  چاپ
                </a >
                <button className="w3-button w3-round" style={{margin: "8px 4px", backgroundColor: "var(--split)"}} id = "print"
                   >
                  <img style={{height: "22.5px", paddingLeft: "8px"}} src = { printIcon } />
                    چاپ پرسش‌نامه
                </button >


              </div >
            </li >

            <li className="w3-hide">
                <div className="w3-container w3-padding-16 w3-row">
                  <a href="" style={{textDecoration: 'none'}}>
                  <div className="w3-button w3-border w3-padding-16" style={{width: "100%"}}>
                  <img style={{width: '25px', paddingLeft: '5px'}} src={clipboardListCheckIcon} />
                  <b>دیدن پرسشنامه</b>
                </div>
              </a>
              </div >
            </li >

          </ul >
        </aside >
      </div >


//        <script>
//          function printExternal(url) {
//      var printWindow = window.open(url, 'Print');
//
//          printWindow.addEventListener('load', function () {
//         if (Boolean(printWindow.chrome)) {
//            printWindow.print();
//          setTimeout(function () {
//            printWindow.close();
//            }, 500);
//         } else {
//            printWindow.print();
//          printWindow.close();
//         }
//      }, true);
//   }
//        </script>
//
//        <style>
//          @media print {
//            @page {
//            size: auto; /* auto is the initial value */
//          margin: 15mm; /* this affects the margin in the printer settings */
//    }
//          html {
//            background - color: #ffffff;
//          margin: 1cm !important; /* this affects the margin on the html before sending to printer */
//    }
//
//          body {
//            margin: 0 !important;
//          font-size: 12pt;
//          line-height: 1.4;
//          color: black;
//          background: white;
//          box-sizing: border-box;
//          width: 16cm;
//          max-height: 26.7cm;
//          height: fit-content;
//          page-break-after: avoid;
//    }
//          div.w3-left.w3-threequarter {
//            width: 100%;
//    }
//    .printable > div > .w3-left {
//            float: right !important;
//          display: block;
//          width: 100%;
//    }
//          .logo {
//            float: right !important;
//          margin-left: 0.35cm;
//          width: 0.65cm ;
//    }
//          .info_box {
//            margin - top: 0;
//    }
//    .info_box > p {
//            display: inline;
//          margin-left: 1cm
//    }
//
//          .page-title {
//            display: block !important;
//    }
//          .w3-container {
//            padding: 0 !important;
//    }
//
//          header,
//          footer {
//            display: none !important;
//    }
//          p,
//          .persian-date {
//            font - size: 12px;
//    }
//          h4 {
//            font - size: 16px;
//    }
//          .info-box-container {
//            box - sizing: border-box;
//          padding: 16px;
//          border-bottom: 1px solid black;
//          border-radius:  16px 16px 0 0 ;
//          margin-bottom: 16px;
//    }
//
//          #guide {
//            box - sizing: border-box;
//          border: 1px solid black;
//          margin: 0;
//          margin-top: 0 !important;
//          padding: 16px !important;
//          border-radius: 8px;
//    }
//  }
//        </style>
//      </div>
//
    )
  }

const TestResult = ({assignedTest}: {assignedTest: AssignTestType}) => {
  if (assignedTest.test.type === 'mbti_5') return <div className="resultPanel"><MBTI test={assignedTest.test as MBTI5TestType} /></div>
  return <></>
}

console.log('test_detail: assignedTest: ', test);
return (
  <main id="main" className="fixed-footer w3-fixed-main">
    <div className="w3-title-bar-fixed">
      <a className="w3-title-bar-icon-backgroung w3-red">
        <img
          className="w3-title-bar-icon w3-svg-color1"
          src={clipboardListCheckIcon}
        />
      </a>
      <span className="w3-title-bar-title text-black" style={{ width: 'calc(100% - 210px)' }}>
        کارنامه&nbsp;آزمون
      </span>
      <a
        href=""
        className="w3-left w3-hide-small"
        style={{ textDecoration: 'none' }}
      >
        <div className="w3-button w3-round-large" style={{ width: '100%' }}>
          <b>دیدن پرسشنامه</b>
        </div>
      </a>
      <a
        href="#sidepanel"
        className="w3-left w3-hide-medium w3-hide-large"
        style={{ textDecoration: 'none' }}
      >
        <div className="w3-button w3-round-large" style={{ width: '100%' }}>
          <b>جعبه ابزار</b>
        </div>
      </a>
    </div>

    <div className="printable info-box-container">
      <div className="no-print">
        <div className="w3-left">
          <img className="logo" src="" />
        </div>
        <div className="persian-date" id="{{ test.date|date:'Y, m, d' }}"></div>
      </div>

      <div className="info_box">
        <p className="page-title">
          <img className="logo print-only" src="" />
          کارنامه آزمون {test.test.get_type_display}</p>
        <p>
          <span>{test.test.participant.get_full_name}</span>
          <span>{test.test.participant.get_full_name ?? ""}</span>
        </p>
        <p className="persian-date print-only" id="{{ test.date|date:'Y, m, d' }}"></p>
      </div>
    </div>

    <div>
      <div className="w3-row">
        <SidePanel assignedTest={test} />
        <div className="w3-left w3-threequarter w3-detailbox w3-detailbox-mobile">
          <TestResult assignedTest={test} />
        </div>
      </div>
    </div>
    <span className="w3-hide" id="a">{test.test.answers}</span>
  </main>


)
}