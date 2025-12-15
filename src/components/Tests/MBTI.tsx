import { Bar } from 'react-chartjs-2';
import { useMemo } from 'react';
import './chart.js'

export default function MBTI({ test }) {

  /* -------------------------
     1. TYPE INDICATORS
  -------------------------- */
  const { typeIndicator, persianTypeIndicator } = useMemo(() => {
    let type = '';
    let fa = '';

    if (+test.e > +test.i) { type += 'E'; fa += 'برون‌گرا/'; }
    else { type += 'I'; fa += 'درون‌گرا/'; }

    if (+test.n > +test.s) { type += 'N'; fa += 'شهودی/'; }
    else { type += 'S'; fa += 'نکته‌بین/'; }

    if (+test.f > +test.t) { type += 'F'; fa += 'احساسی/'; }
    else { type += 'T'; fa += 'منطقی/'; }

    if (+test.j > +test.p) { type += 'J'; fa += 'قضاوتی/'; }
    else { type += 'P'; fa += 'ادراکی/'; }

    if (+test.a > +test.tu) { type += '-A'; fa += 'قاطع'; }
    else { type += '-Tu'; fa += 'بی‌قرار'; }

    return { typeIndicator: type, persianTypeIndicator: fa };
  }, [test]);

  /* -------------------------
     2. VALUES (UNCHANGED LOGIC)
  -------------------------- */
  const yValues = [
    +test.e / 72 * 100,
    +test.n / 72 * 100,
    +test.f / 72 * 100,
    +test.j / 72 * 100,
    +test.a / 72 * 100,
    +test.i / 72 * 100,
    +test.s / 72 * 100,
    +test.t / 72 * 100,
    +test.p / 72 * 100,
    +test.tu / 72 * 100
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
    afterDraw(chart) {
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

  const options = {
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
      legend: { display: false },
      datalabels: {
        formatter: Math.round,
        font: { family: 'Vazirmatn', weight: 'bold' }
      }
    }
  };

  /* -------------------------
     5. RENDER
  -------------------------- */
  return (
    <>
      <div id="typeIndicator">{typeIndicator}</div>
      <div id="persianTypeIndicator">{persianTypeIndicator}</div>

      <div style={{ height: 400 }}>
        <Bar
          data={data}
          options={options}
          plugins={[sideLabelsPlugin]}
        />
      </div>
    </>
  );
}
