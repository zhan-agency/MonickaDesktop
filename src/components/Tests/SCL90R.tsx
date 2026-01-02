import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { BarElement, CategoryScale, ChartOptions, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { BAEQITestType, SCL90RTestType } from '@/type/monicka.js';
import { e2p } from '@/utils.js';
import { Chart } from 'chart.js';

const Questions = ({test}:{test: SCL90RTestType}) => {
  const questions = [19, 44, 59, 60, 64, 66, 89];

  return (
    <>
      <h4>نشانه‌های بالینی گزارش شده توسط آزمون‌دهنده:</h4>
      <p id="question19">۱- آیا بی‌اشتها شده‌اید؟  
        {
          test.answers.charAt(18) == '0'  ?  <label id="19.0" htmlFor="0">به هیچ وجه</label>
          : test.answers.charAt(18) == '1' ? <label id="19.1" htmlFor="1">اندکی</label>
          : test.answers.charAt(18) == '2' ? <label id="19.2" htmlFor="2">در حد متوسط</label>
          : test.answers.charAt(18) == '3' ? <label id="19.3" htmlFor="3">تا حد زیادی</label>
          : <label id="19.4" htmlFor="4"> کاملا</label>
        }
      </p>

      <p id="question44">۲- آیا دیر خوابتان می‌برد؟   به خواب رفتن برایتان مشکل
        است؟
        { test.answers.charAt(43) == '0' ? <label id="44.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(43) == '1' ? <label id="44.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(43) == '2' ? <label id="44.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(43) == '3' ? <label id="44.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="44.4" htmlFor="4"> کاملا</label> }
      </p>

      <p id="question59">۳- آیا زیاد درباره مرگ و مردن فکر می‌کنید؟  
        { test.answers.charAt(58) == '0' ?<label id="59.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(58) == '1' ?<label id="59.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(58) == '2' ?<label id="59.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(58) == '3' ?<label id="59.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="59.4" htmlFor="4"> کاملا</label> }
      </p>

      <p id="question60">۴- آیا پرخوری می‌کنید؟   
        { test.answers.charAt(59) == '0' ? <label id="60.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(59) == '1' ? <label id="60.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(59) == '2' ? <label id="60.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(59) == '3' ? <label id="60.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="60.4" htmlFor="4"> کاملا</label> }
      </p>

      <p id="question64">۵- آیا صبح‌ها زودتر از آنچه که عادت داشته‌اید بیدار
        می‌شوید و دیگر خوابتان نمی‌برد؟  
        { test.answers.charAt(63) == '0' ? <label id="64.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(63) == '1' ? <label id="64.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(63) == '2' ? <label id="64.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(63) == '3' ? <label id="64.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="64.4" htmlFor="4"> کاملا</label> }
      </p>

      <p id="question66">۶- آیا بد خواب هستید؟ ناراحت می‌خوابید؟
        { test.answers.charAt(64) == '0' ? <label id="66.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(64) == '1' ? <label id="66.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(64) == '2' ? <label id="66.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(64) == '3' ? <label id="66.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="66.4" htmlFor="4"> کاملا</label> }
      </p>

      <p id="question89">۷- آیا بیشتر اوقات احساس تقصیر و گناه می‌کنید؟
        { test.answers.charAt(88) == '0' ? <label id="89.0" htmlFor="0"> به هیچ وجه</label>
        : test.answers.charAt(88) == '1' ? <label id="89.1" htmlFor="1"> اندکی</label>
        : test.answers.charAt(88) == '2' ? <label id="89.2" htmlFor="2"> در حد متوسط</label>
        : test.answers.charAt(88) == '3' ? <label id="89.3" htmlFor="3"> تا حد زیادی</label>
        : <label id="89.4" htmlFor="4"> کاملا</label> }
      </p>
    </>
  )
}
const TestGuide = ({ test }: { test: SCL90RTestType }) => {
  return (
    <>
      <p>میزان فاکتور PST در این آزمون
        {" " + e2p(String(test.scores.pst)) + " "}
        گزارش شده است.
      </p>
      <br />
      <Questions test={test} />
      <br />
      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div>
            <h4>راهنمای تحلیل آزمون</h4>
            <p>
              <strong>فاکتور SOM (شکایت جسمانی):</strong>
              این بعد نشان‌گر مشکلات بدنی است. این مشکلات می‌تواند در سیستم قلبی عروقی، معدی روده‌ای یا تنفسی باشد یا
              به صورت علائمی چون سردردهای تکرار شونده، دردهای عضلانی، و معادل‌هایی از اضطراب نیز بروز کند.
            </p>
            <p>
              <strong>فاکتور O-C (وسواسی-اجباری):</strong>
              علائمی این بعد تطابق زیادی با تابلوی بالینی اختلال وسواسی دارند. تمرکز این معیار بر تفکرات، تکانه‌ها و
              اعمالی است که خود فرد آن‌ها ا به ناچار به گونه‌ای غیر قابل مقاومت تجربه نمود و ماهیتی بی‌گانه با خود و
              ناخواسته دارند. به علاوه نشان‌دهنده نوعی باریک‌بینی عمومی در افراد است.
            </p>
            <p>
              <strong>فاکتور INT (حساسیت در روابط متقابل):</strong>
              این بعد به احساس عدم کفایت و حقارت فرد بالاخص در مقایسه با دیگران تکیه می‌کند. دست‌کم گرفتن خود، احساس
              عدم آرامش و ناراحتی محسوس در جریان ارتباط با دیگران از تظاهرات خاص این بعد هستند. افراد که نمره بالایی در
              این بعد می‌گیرند معمولا در ارتباط با دیگران مشکل داشته و انتظارات منفی دارند.
            </p>
            <p>
              <strong>فاکتور DEP (افسردگی):</strong>
              این بعد نشان‌دهنده طیف وسیعی از نشانه‌های بالینی افسردگی است. علائمی مانند خلق و خوی افسرده، بی‌علاقگی
              نسبت به لذت‌های زندگی، نداشتن انگیزه و از دست دادن انرژی حیاتی در این بعد بررسی می‌شوند. به علاوه
              احساس درماندگی، افکار خودکشی و بعضی جنبه‌های جامعه‌شناختی و جسمی افسردگی در این معیار گنجانده شده
              است.
            </p>
            <p>
              <strong>فاکتور ANX (اضطراب):</strong>
              این بعد علائم عمومی اضطراب را ارزیابی می‌کند. علائمی مانند احساس نگرانی مداوم، تنش عضلانی،
              لرزش، حملات پانیک ناگهانی، احساس ترس و وحشت، و دشواری در آرامش یافتن در این
              معیار گنجانده شده است. افراد با نمره بالا اغلب با اضطراب فراگیر یا حملات هراس روبرو هستند.
            </p>
            <p>
              <strong>فاکتور HOS (پرخاشگری یا خصومت):</strong>
              این بعد افکار، احساسات و اعمال مرتبط با خشم و پرخاشگری را نشان می‌دهد. علائمی مانند تحریک‌پذیری،
              خشم سرکوب‌شده، تمایل به بحث و جدل، احساس خصومت نسبت به دیگران، و گاهی
              افکار انتقام‌جویانه در این بعد بررسی می‌شوند. این معیار می‌تواند نشان‌دهنده مشکلات در کنترل خشم باشد.
            </p>
            <p>
              <strong>فاکتور PHOB (ترس مرضی):</strong>
              این بعد ترس‌های خاص و غیرمنطقی از موقعیت‌ها یا اشیاء را اندازه‌گیری می‌کند. علائمی مانند ترس از مکان‌های
              شلوغ (آگورافوبیا)، فضاهای بسته (کلاستروفوبیا)، ارتفاع، حیوانات، یا موقعیت‌های اجتماعی، همراه با اجتناب از آن‌ها،
              از ویژگی‌های این بعد هستند. افراد با نمره بالا اغلب زندگی روزمره خود را به دلیل این ترس‌ها محدود می‌کنند.
            </p>
            <p>
              <strong>فاکتور PAR (افکار پارانوئیدی):</strong>
              این بعد افکار مشکوک و پارانوئید را ارزیابی می‌کند. علائمی مانند احساس تعقیب شدن، خیانت توسط دیگران،
              ایده‌های مرجع (باور به اینکه رویدادها به خود فرد مربوط است)، و احساس آسیب‌پذیری
              یا آزار از سوی دیگران در این معیار قرار دارند. این بعد می‌تواند نشان‌دهنده سطوح خفیف پارانویا باشد.
            </p>
            <p>
              <strong>فاکتور PSY (روان‌گسسته‌گرایی):</strong>
              ین بعد علائم مرتبط با روان‌پریشی و انزوا را نشان می‌دهد. علائمی مانند از دست دادن تماس با واقعیت،
              هذیان‌ها، توهمات، احساس بیگانگی و انزوا از جامعه، و مشکلات در روابط اجتماعی در این بعد
              بررسی می‌شوند. علاوه بر این، جنبه‌هایی مانند علایق خاص یا رفتارهای عجیب نیز ممکن است ظاهر شود.
            </p>
            <p>
              <strong>فاکتور GSI (شاخص شدت کلی):</strong>
              این شاخص میانگین شدت همه علائم گزارش‌شده را محاسبه می‌کند و سطح کلی پریشانی روانی فرد را نشان می‌دهد.
              GSI به عنوان معیاری جامع برای ارزیابی وضعیت کلی سلامت روان عمل می‌کند و نمرات بالا حاکی از نیاز
              به مداخله حرفه‌ای است.
            </p>
            <p>
              <strong>فاکتور PSDI (شاخص ناراحتی نشانه‌های مثبت):</strong>
              این شاخص شدت پریشانی ناشی از هر علامت مثبت (علائم گزارش‌شده) را اندازه‌گیری می‌کند. PSDI
              با تقسیم GSI بر PST به دست می‌آید و نشان‌دهنده سطح ناراحتی نسبت به تعداد علائم است؛ نمرات بالا بیانگر
              شدت بالای هر علامت هستند.
            </p>
            <p>
              <strong>فاکتور PST (جمع نشانه‌های مثبت):</strong>
              این شاخص تعداد کل علائم مثبت یا گزارش‌شده توسط فرد را شمارش می‌کند.
              PST نشان‌دهنده گستردگی علائم است و نمرات بالا حاکی از تنوع بیشتر مشکلات روانی می‌باشد، بدون توجه به شدت آن‌ها.
            </p>
            <p>
              <strong>نشانه‌های بالینی گزارش شده توسط آزمون‌دهنده:</strong>
              این سوالات در هیچ‌یک از شاخص‌های ۹ گانه آزمون موثر نیستند و تنها در نمرات کلی محاسبه می‌شوند، اما
              اهمیت بالای این نشانه‌های بالینی به مشاور کمک می‌کند تا در مورد دیگر ابعاد مشکلات مراجع دید بهتری پیدا
              کند.
              برای نمونه نمره بالای افسردگی در کنار بی‌خوابی می‌توانند معنایی متفاوت از نمره بالا بدون این نشانه داشته
              باشد.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function SCL90R({ test }: { test: SCL90RTestType }) {

  Chart.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  const xValues = ["SOM", "O-C", "INT", "DEP", "ANX", "HOS", "PHOB", "PAR", "PSY", "GSI", "PSDI"];
  const yValues = [
    test.scores.som,
    test.scores.oc,
    test.scores.intr,
    test.scores.dep,
    test.scores.anx,
    test.scores.hos,
    test.scores.phob,
    test.scores.par,
    test.scores.psy,
    test.scores.gsi,
    test.scores.psdi,
  ];

  /* -------------------------
     4. CHART DATA & OPTIONS
  -------------------------- */

  const data = {
    labels: xValues,
    datasets: [{
      data: yValues,
      fill: false,
      tension: 0,
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
        align: 'top',
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
    <div className='bg-white text-black'>
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
