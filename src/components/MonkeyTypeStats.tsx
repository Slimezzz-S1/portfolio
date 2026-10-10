// DATA
import result from "@/data/monkey-type/results.json"

// COMPONENTS
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function MonkeyTypeStats() {
    return (
        <div className="relative w-full h-96 min-w-0 overflow-hidden">
          <div className="absolute inset-0">
            <Line
              data={{
                labels: result.map(r => new Date(r.timestamp).toLocaleDateString()),
                datasets: [
                  {
                    label: 'WPM',
                    data: result.map(r => r.wpm),
                    borderColor: '#61DAFB',
                    pointRadius: 0,
                    tension: 0.5,
                  },
                  {
                    label: 'Accuracy',
                    data: result.map(r => r.accuracy),
                    borderColor: '#4FC08D',
                    pointRadius: 0,
                    yAxisID: 'y2',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,

                scales: {
                  y: {
                    title: {
                      display: true,
                      text: 'WPM'
                    },
                  },
                  y2: {
                    position: 'right' as const,
                    grid: {
                      drawOnChartArea: false
                    },
                    min: 80,
                    max: 150
                  },
                },
              }}
            />
          </div>
        </div>
    )
}