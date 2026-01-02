import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { Cattel16pfTestType, GlasserTestScoresType, GlasserTestType, MBTI5TestType, TestType } from '@/type/monicka.js';
import { e2p } from '@/utils.js';

const TestGuide = () => {
  return (
    <>
      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div className="w3-container">
            <h4>راهنما و تحلیل آزمون</h4>
            <p>این تست از ۵ نیم‌رخ تشکیل شده است که میزان نیاز شخص در هر حوزه را نشان می‌دهد.</p>
            <p><strong>نیمرخ نیاز به بقا:</strong> میزان احتیاط شما در کارها زیاد است، معمولا ریسک کمتری می‌پذیرید و از خطرات اجتناب می‌کنید و معمولا نسبت به آن هوشیار هستید. به مسائل مالی و به خصوص پس‌انداز اهمیت می‌دهید و همچنین ممکن است کشش جنسی بالایی داشته باشید.</p>
            <p><strong>نیمرخ نیاز به عشق و احساس تعلق:</strong> احساسات و عواطف خود را به دیگران (به شیوه‌های مختلف) نشان می‌دهید. برای خانواده اهمیت قائل هستید و برای عزیزان‌تان وقت می‌گذارید. به عضویت در گروه‌های اجتماعی علاقه‌مندید و سعی می‌کنید از هر فرصت برای عشق و محبت‌ورزی به اطرافیان‌تان استفاده کنید.</p>
            <p><strong>نیمرخ قدرت و ارزشمندی:</strong> برای دستیابی به هدف‌تان تلاش می‌کنید. پیشرفت و ارتقا برای‌تان از اهمیت بالایی برخوردار است و سعی می‌کنید که بر اوضاع و شرایط کنترل داشته باشید. از دیگر خصوصیات این نیاز می‌توان به این موارد اشاره کرد: مهارت داشتن، اعتماد به خود داشتن، احساس افتخار، نفوذ بر دیگران داشتن، حس رقابت، رهرو داشتن، الگو بودن و مورد پیروی قرار گرفتن.</p>
            <p><strong>نیمرخ آزادی:</strong> علاقه زیادی به مسافرت کردن، تنوع و احساس آزادی در اقدام و تصمیم‌گیری دارید. معمولا خلاق هستید و بدون ترس و واهمه نظر خود را ابراز می‌کنید.</p>
            <p><strong>نیمرخ تفریح:</strong> شوخ‌طبع هستید و بازی و سرگرمی را دوست دارید. به یادگیری مباحث جدید علاقه دارید و سعی می‌کنید از خندیدن و شوخی کردن برای یادگیری استفاده کنید.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Glasser({ test }: { test: GlasserTestType }) {

  const xValues = ["بقاء (S)", "عشق (L)", "آزادی (F)", "قدرت (P)", "تفریح (F)"];
  const yValues = [test.scores.s, test.scores.l, test.scores.f, test.scores.p, test.scores.fu];

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
        max: 30
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
    <TestGuide />
  </div>
);
}
