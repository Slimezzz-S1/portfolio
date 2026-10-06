import result from "@/data/monkeyType/results.json"
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register only what you use, so the rest is tree-shaken out
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

const data = {
  labels: result.map(r => new Date(r.timestamp).toLocaleDateString()),
  datasets: [
    {
      label: 'WPM',
      data: result.map(r => r.wpm),
      borderColor: '#61DAFB',
      pointRadius: 0,
      tension: 0.3,
    },
    {
      label: 'Accuracy',
      data: result.map(r => r.accuracy),
      borderColor: '#4FC08D',
      pointRadius: 0,
      yAxisID: 'y2',
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { title: { display: true, text: 'WPM' } },
    y2: { position: 'right' as const, grid: { drawOnChartArea: false }, min: 80, max: 100 },
  },
}

export default function MonkeyTypeStats() {
    return (
        <div className="h-80">
        <Line data={data} options={options} />
        </div>
    )
}