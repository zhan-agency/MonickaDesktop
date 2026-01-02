import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { BarElement, CategoryScale, ChartOptions, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { BAEQITestType } from '@/type/monicka.js';
import { e2p } from '@/utils.js';
import { Chart } from 'chart.js';

const TestGuide = () => {
  return (
    <>
      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div className="w3-container">
            <h4>راهنما و تحلیل آزمون</h4>
            <p>خط قرمز نشان‌دهنده میانگین هر شاخص و نمودار میله‌ای نشان‌دهنده نمره آزمون‌دهنده است.</p>
            <p><strong>خودآگاهی هیجانی (ES):</strong> این مقیاس نشان‌گر میزان آگاهی فرد از احساسات و عواطف خود است. افراد با نمره بالا قادر به شناسایی، تمایز و درک دقیق احساسات خود، دلایل بروز آن‌ها و عوامل محرک هستند، که این امر به مدیریت بهتر هیجانات کمک می‌کند. نمره پایین ممکن است با عدم آگاهی از حالات درونی و دشواری در بیان عواطف همراه باشد.</p>
            <p><strong>خودابرازی (AS):</strong> این مقیاس میزان توانایی فرد در بیان احساسات، باورها و افکار خود به شیوه‌ای سازنده و بدون آسیب‌رسانی را ارزیابی می‌کند. افراد با نمره بالا قاطع، اعتمادبه‌نفس‌دار و قادر به دفاع از حقوق خود بدون پرخاشگری هستند، در حالی که نمره پایین نشان‌دهنده خجالت یا رفتارهای تهاجمی نامتعادل است.</p>
            <p><strong>احترام به خود (SR):</strong> این مقیاس سطح پذیرش و احترام فرد نسبت به خود را می‌سنجد، صرف‌نظر از نقاط قوت و ضعف. نمره بالا بیانگر اعتمادبه‌نفس بالا، رضایت درونی و تصویر مثبت از خود است، که به resilience عاطفی کمک می‌کند؛ نمره پایین با احساس ناکافی‌بودن و خودسرزنشی همراه است.</p>
            <p><strong>خودشکوفایی (SA):</strong> این مقیاس پتانسیل فرد برای تحقق توانایی‌ها و دستیابی به زندگی غنی و معنادار را نشان می‌دهد. افراد با نمره بالا به دنبال رشد مداوم، پیگیری اهداف شخصی و بهبود مهارت‌ها هستند، در مقابل نمره پایین که با عدم انگیزه برای پیشرفت و احساس پوچی همراه است.</p>
            <p><strong>استقلال (IN):</strong> این مقیاس درجه خوداتکایی و آزادی از وابستگی عاطفی به دیگران را ارزیابی می‌کند. نمره بالا مربوط به افراد خودگردان، تصمیم‌گیر مستقل و قادر به کار بدون حمایت بیش از حد است، در حالی که نمره پایین نشان‌دهنده وابستگی به نظرات دیگران و دشواری در تصمیم‌گیری تنها است.</p>
            <p><strong>همدلی (EM):</strong> این مقیاس توانایی فرد در شناسایی، درک و قدردانی از احساسات دیگران را می‌سنجد. افراد با نمره بالا همدل، قادر به هم‌فرکانس شدن با عواطف اطرافیان و تشخیص دلایل آن‌ها هستند، که به روابط عمیق‌تر کمک می‌کند؛ نمره پایین با عدم حساسیت به حالات دیگران همراه است.</p>
            <p><strong>مسئولیت‌پذیری اجتماعی (RE):</strong> این مقیاس تعهد فرد به عنوان عضوی سازنده و مشارکتی در گروه اجتماعی را نشان می‌دهد. نمره بالا بیانگر همکاری، پذیرش دیگران و استفاده از استعدادها برای خیر جمعی است، در مقابل نمره پایین که با عدم مسئولیت اجتماعی و تمرکز صرف بر منافع شخصی همراه است.</p>
            <p><strong>روابط بین‌فردی (IR):</strong> این مقیاس کیفیت برقراری و حفظ روابط متقابل رضایت‌بخش و صمیمی را ارزیابی می‌کند. افراد با نمره بالا در ایجاد پیوندهای عاطفی مثبت و مبادله محبت مهارت دارند، در حالی که نمره پایین با مشکلات در روابط و احساس تنهایی همراه است.</p>
            <p><strong>واقع‌گرایی (RT):</strong> این مقیاس توانایی ارزیابی تطابق تجربیات درونی با واقعیت عینی را می‌سنجد. نمره بالا نشان‌دهنده جمع‌آوری شواهد عینی، ارزیابی دقیق موقعیت‌ها و coping مؤثر است؛ نمره پایین با تحریف واقعیت و تصمیم‌گیری‌های نادرست همراه است.</p>
            <p><strong>انعطاف‌پذیری (FL):</strong> این مقیاس ظرفیت سازگاری با تغییرات و شرایط پویا را نشان می‌دهد. افراد با نمره بالا باز به ایده‌های جدید، قادر به تنظیم عواطف و رفتارها در برابر ناآشنایی‌ها هستند، در مقابل نمره پایین که با مقاومت در برابر تغییر و سفت‌وسختی همراه است.</p>
            <p><strong>حل مسئله (PS):</strong> این مقیاس مهارت فرد در شناسایی، تعریف و حل مؤثر مشکلات را ارزیابی می‌کند. نمره بالا بیانگر رویکرد فعال به چالش‌ها، تولید راه‌حل‌های خلاقانه و اجرا است؛ نمره پایین با اجتناب از مشکلات و ناتوانی در مدیریت آن‌ها همراه است.</p>
            <p><strong>تحمل استرس (ST):</strong> این مقیاس مقاومت در برابر رویدادهای نامطلوب و مدیریت مثبت استرس را می‌سنجد. افراد با نمره بالا قادر به حفظ آرامش، حفظ خوش‌بینی و کنترل واکنش‌ها هستند، در حالی که نمره پایین با فروپاشی عاطفی تحت فشار همراه است.</p>
            <p><strong>کنترل تکانه (IC):</strong> این مقیاس توانایی مقاومت یا تأخیر در برابر impulses و وسوسه‌ها را نشان می‌دهد. نمره بالا مربوط به حفظ composure، کنترل رفتارهای پرخاشگرانه و فکر کردن پیش از عمل است؛ نمره پایین با impulsivity و رفتارهای irresponsible همراه است.</p>
            <p><strong>خوش‌بینی (OP):</strong> این مقیاس نگرش مثبت و امیدوارانه فرد نسبت به زندگی را ارزیابی می‌کند. افراد با نمره بالا حتی در برابر ناملایمات، به جنبه‌های روشن توجه دارند و hopeful هستند؛ نمره پایین با بدبینی و تمرکز بر شکست‌ها همراه است.</p>
            <p><strong>شادمانی (HA):</strong> این مقیاس سطح رضایت کلی از زندگی و لذت بردن از خود و دیگران را می‌سنجد. نمره بالا بیانگر شادی درونی، enthusiasm و احساس contentment است، در مقابل نمره پایین که با نارضایتی و افسردگی خفیف همراه است.</p>

          </div>
        </div>
      </div>
    </>
  )
}

export default function BAEQI({ test }: { test: BAEQITestType }) {

  Chart.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  var xValues = ["ES", "AS", "SR", "SA", "IN", "EM", "RE", "IR", "RT", "FL", "PS", "ST", "IC", "OP", "HA"];
  var yValues = [
    test.scores.f_es,
    test.scores.f_as,
    test.scores.f_sr,
    test.scores.f_sa,
    test.scores.f_in,
    test.scores.f_em,
    test.scores.f_re,
    test.scores.f_ir,
    test.scores.f_rt,
    test.scores.f_fl,
    test.scores.f_ps,
    test.scores.f_st,
    test.scores.f_ic,
    test.scores.f_op,
    test.scores.f_ha,
  ];
  var yMeanValues = [20.6, 18.7, 21.05, 21.7, 19.1, 25.2, 25.3, 23.9, 19.2, 18.6, 22.3, 17.37, 16.7, 20.9, 22.5]

  /* -------------------------
     4. CHART DATA & OPTIONS
  -------------------------- */

  const data = {
    labels: xValues,
    datasets: [{
      type: 'bar',
      data: yValues,
      fill: false,
      tension: 0,
      backgroundColor: "rgba(33,150,243,0.3)",
      borderColor: "rgb(0,0,100)",
      borderWidth: 1,
    },
    {
      type: "line",
      label: 'میانگین',
      data: yMeanValues,
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2
    }]
  };

  const options: ChartOptions<'bar' | 'line'> = {
    locale: 'fa-IR',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: (value) => e2p(String(Math.round(value))),
        anchor: 'end',
        align: 'top',
        font: {
          weight: 'bold',
          family: 'Vazirmatn',
        }
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            if (context.dataset.type === 'line') {
              return; // Hide label for line dataset
            }
            return context.dataset.label + ': ' + context.formattedValue;
          }
        },
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
      <TestGuide />
    </div>
  );
}
