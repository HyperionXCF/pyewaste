import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ChartPie({ labels, values, colors }: { labels: string[]; values: number[]; colors?: string[] }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || ['#0ea5e9', '#f97316', '#10b981', '#ef4444'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: { legend: { position: 'right' as const } },
    maintainAspectRatio: false,
  }

  return (
    <div style={{ width: 220, height: 160 }}>
      <Pie data={data} options={options} />
    </div>
  )
}
