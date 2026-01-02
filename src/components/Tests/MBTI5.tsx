import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import { ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './chart.js'
import { MBTI5TestType, TestType } from '@/type/monicka.js';

const TestGuide = ({typeIndicator, persianTypeIndicator}:{typeIndicator: string, persianTypeIndicator: string}) => {
  return (
    <>
      <div className="w3-container w3-canvas-caption text-black">
        <p>
           تیپ شخصیتی
          <span id="typeIndicator"> {typeIndicator} </span>
          گزارش شده است.
        </p>
      </div>

      <div className="w3-margin-top w3-margin-bottom text-black">
        <div id="guide" className="w3-redirectable w3-hide w3-show">
          <div className="w3-container">
            <div>
              <h4>راهنما و تحلیل آزمون</h4>
              <p>
                این آزمون دارای ۱۰ عامل است که دو به دو در مقابل هم قرار
                دارند:
              </p>
              <p>
                <strong>درون‌گرایی یا برون‌گرایی (I-E):</strong>
                عامل E نشان‌دهنده میزان برونگرایی و عامل I نشان‌دهنده میزان
                دورن‌گرایی آزمون‌دهنده است.
              </p>
              <p>
                <strong>شهودی یا نکته‌بین بودن (N-S):</strong>
                عامل N نشان‌دهنده میزان شهودی بودن و عامل S نشان‌دهنده میزان
                حسی بودن یا نکته‌بینی آزمون‌دهنده است.
              </p>
              <p>
                <strong>احساسی یا مطنقی بودن (F-T):</strong>
                عامل F نشان‌دهنده میزان احساسی بودن و عامل T نشان‌دهنده
                میزان منطقی بودن آزمون‌دهنده است.
              </p>
              <p>
                <strong>قضاوتی یا ادراکی بودن (J-P):</strong>
                عامل J نشان‌دهنده میزان قضاوتی بودن و عامل P نشان‌دهنده
                میزان ادراکی بودن آزمون‌دهنده است.
              </p>
              <p>
                <strong>قاطع یا بی‌قرار بودن (A-Tu):</strong>
                عامل Tu نشان‌دهنده میزان بی‌قراری و عامل A نشان‌دهنده میزان
                قاطع بودن آزمون‌دهنده است.
              </p>

              <p>
                وجه غالب شخصیت آزمون‌دهنده با توجه به مقایسه نمره هر یک از
                جفت‌عامل‌ها تعیین می‌شود. در این آزمون تیپ شخصیتی
                 آزمون‌دهنده به صورت 
                <strong> {persianTypeIndicator} </strong>
                گزارش شده است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function MBTI5({ test }: { test: MBTI5TestType }) {

  /* -------------------------
     1. TYPE INDICATORS
  -------------------------- */
  const { typeIndicator, persianTypeIndicator } = useMemo(() => {
    let type = '';
    let fa = '';

    if (+test.scores.e > +test.scores.i) { type += 'E'; fa += 'برون‌گرا/'; }
    else { type += 'I'; fa += 'درون‌گرا/'; }

    if (+test.scores.n > +test.scores.s) { type += 'N'; fa += 'شهودی/'; }
    else { type += 'S'; fa += 'نکته‌بین/'; }

    if (+test.scores.f > +test.scores.t) { type += 'F'; fa += 'احساسی/'; }
    else { type += 'T'; fa += 'منطقی/'; }

    if (+test.scores.j > +test.scores.p) { type += 'J'; fa += 'قضاوتی/'; }
    else { type += 'P'; fa += 'ادراکی/'; }

    if (+test.scores.a > +test.scores.tu) { type += '-A'; fa += 'قاطع'; }
    else { type += '-Tu'; fa += 'بی‌قرار'; }

    return { typeIndicator: type, persianTypeIndicator: fa };
  }, [test]);

  /* -------------------------
     2. VALUES (UNCHANGED LOGIC)
  -------------------------- */
  const yValues = [
    +test.scores.e / 72 * 100,
    +test.scores.n / 72 * 100,
    +test.scores.f / 72 * 100,
    +test.scores.j / 72 * 100,
    +test.scores.a / 72 * 100,
    +test.scores.i / 72 * 100,
    +test.scores.s / 72 * 100,
    +test.scores.t / 72 * 100,
    +test.scores.p / 72 * 100,
    +test.scores.tu / 72 * 100
  ];

  const traits = [
    { left: 'درون‌گرا (I)', right: 'برون‌گرا (E)' },
    { left: 'نکته‌بین (S)', right: 'شهودی (N)' },
    { left: 'منطقی (T)', right: 'احساسی (F)' },
    { left: 'جستجوگر (P)', right: 'منظم (J)' },
    { left: 'بی‌قرار (Tu)', right: 'قاطع (A)' }
  ];

  const scores = yValues.slice(0, 5).map(v => Number(v.toFixed(1)));

  /* -------------------------
     3. CUSTOM PLUGIN (IDENTICAL)
  -------------------------- */
  const sideLabelsPlugin = useMemo(() => ({
    id: 'sideLabelsAndIndicators',
    afterDraw(chart: any) {
      const { ctx, scales } = chart;
      const xScale = scales.x;
      const yScale = scales.y;
      const meta = chart.getDatasetMeta(0);
  
      const leftPadding = 20;
      const rightPadding = 20;
  
      ctx.save();
      ctx.font = '12px Vazirmatn';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText('تعادل', xScale.getPixelForValue(50), xScale.top + 16);
      ctx.restore();
  
      traits.forEach((trait, index) => {
        const yCenter = yScale.getPixelForValue(index);
        const score = scores[index];
  
        ctx.font = score < 50 ? 'bold 12px Vazirmatn' : '12px Vazirmatn';
        ctx.textAlign = 'right';
        ctx.fillText(trait.left, xScale.left - leftPadding, yCenter);
  
        ctx.font = score > 50 ? 'bold 12px Vazirmatn' : '12px Vazirmatn';
        ctx.textAlign = 'left';
        ctx.fillText(trait.right, xScale.right + rightPadding, yCenter);
  
        const xPos = xScale.getPixelForValue(score);
        ctx.beginPath();
        ctx.arc(xPos, yCenter, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(75,192,192,1)';
        ctx.fill();
      });
    }
  }), [traits, scores]);

  /* -------------------------
     4. CHART DATA & OPTIONS
  -------------------------- */
  const data = {
    labels: ['', '', '', '', ''],
    datasets: [{
      data: scores,
      backgroundColor: 'rgba(200,200,200,0.3)',
      barPercentage: 0.3
    }]
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { left: 100, right: 100 }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 50,
          callback: () => ''
        }
      },
      y: { grid: { display: false } }
    },
    plugins: {
      legend: { display: false }
    }
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
          plugins={[sideLabelsPlugin]}
        />
      </div>
      <TestGuide typeIndicator={typeIndicator} persianTypeIndicator={persianTypeIndicator}/>
    </div>
  );
}
