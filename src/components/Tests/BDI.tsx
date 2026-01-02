import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { BDITestType, Cattel16pfTestType, GlasserTestScoresType, GlasserTestType, MBTI5TestType, TestType } from '@/type/monicka.js';
import { e2p } from '@/utils.js';

const TestGuide = ({ test }: { test: BDITestType }) => {
  return (
    <>
      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div className="w3-container">
            <h4>راهنما و تحلیل آزمون</h4>
            <p>بعد A وجود نشانه‌های عاطفی، بعد C وجود نشانه‌های شناختی و بعد P وجود نشانه‌های جسمانی افسردگی را می‌سنجد.</p>
            <br />
            <p>نمره کلی آزمون‌دهنده جمع این سه نمره است که در این آزمون عدد {e2p(String(test.scores.a + test.scores.c + test.scores.p))} را نشان می‌دهد.</p>
            <p>اگر نمره آزمون‌دهنده کمتر از ۱۴ باشد، به این معنی است که هیچ یا کمترین حد از افسردگی در او مشاهده شده است. نمره ۱۴ تا ۱۹ به معنی افسردگی 
               خفیف، نمره ۲۰ تا ۲۸ به معنی افسردگی متوسط و نمره ۲۹ تا ۶۳ به معنای افسردگی شدید است. این آزمون نقطه برشی به معنی عدم وجود افسردگی معرفی نمی‌کند.
            </p> 
          </div>
        </div>
      </div>
    </>
  )
}

export default function BDI({ test }: { test: BDITestType }) {

 var xValues = ["A","C","P"]
  const yValues = [test.scores.a, test.scores.c, test.scores.p];

  /* -------------------------
     4. CHART DATA & OPTIONS
  -------------------------- */

  const data = {
    labels: xValues,
    datasets: [{
      data: yValues,
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(33,150,243,0.3)",
      borderColor: "rgb(0,0,100)",
      borderWidth: 1,
    }]
  };

  const options: ChartOptions<'bar'> = {
    locale: 'fa-IR',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value) => e2p(String(Math.round(value))),
        anchor: 'end',
        align: 'end',
        font: {
          weight: 'bold',
          family: 'Vazirmatn',
        }
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        max: 36
      },
    },
  };

/* -------------------------
   5. RENDER
-------------------------- */
return (
  <div className='bg-white'>
    <div style={{ height: 400 }}>
      <Bar
        data={data}
        options={options}
      />
    </div>
    <TestGuide test={test} />
  </div>
);
}
