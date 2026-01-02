import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { BAITestType, Cattel16pfTestType, GlasserTestScoresType, GlasserTestType, MBTI5TestType, TestType } from '@/type/monicka.js';
import { e2p } from '@/utils.js';

const TestGuide = ({ test }: { test: BAITestType }) => {
  return (
    <>
      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div className="w3-container">
            <h4>راهنما و تحلیل آزمون</h4>
            <br />
            <p>نمره کلی آزمون‌دهنده جمع این سه نمره است که در این آزمون عدد { test.scores.a.toLocaleString('fa-IR') } را نشان می‌دهد.</p>
            <p>اگر نمره آزمون‌دهنده کمتر از ۷ باشد، به این معنی است که هیچ یا کمترین حد از اضطراب در او مشاهده شده است. نمره ۸ تا ۱۵ به معنی اضطراب
              خفیف، نمره ۱۶ تا ۲۵ به معنی اضطراب متوسط و نمره ۲۶ تا ۳۶ به معنای اضطراب شدید است. این آزمون نقطه برشی به معنی عدم وجود اضطراب معرفی نمی‌کند.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function BAI({ test }: { test: BAITestType }) {

  var xValues = ["A"]
  const yValues = [test.scores.a];

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
