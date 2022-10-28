import { useEffect, useMemo, useState } from "react";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Nombre d'alertes sur une année",
    },
  },
};
import { axios } from "../../services/Http";

type Month = 'Oct' | 'Nov' | 'Dec' | 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Apr' | 'Jun' | 'Jul' | 'Aug' | 'Sep';
type StatByMonth = { [key in Month]: number }

function AlertPerMonths() {
  const [statsByMonth, setStatsByMonth] = useState<StatByMonth>({ 
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/statistics/alerts-month');
        setStatsByMonth(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  }, []);

  function _getLabels(): Month[] {
    return Object.keys(statsByMonth) as Month[];
  }

  const getData = useMemo(() => {
    const labels = _getLabels();

    return {
      labels, 
      datasets: [{
        fill: true,
        label: "Nombre d'alertes",
        data: labels.map((label: Month) => statsByMonth[label] || 0),
        borderColor: 'rgb(99, 141, 255)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }]
    }
  }, [statsByMonth]);

  return (
    <Line data={getData} options={options} />
  );
}

export default AlertPerMonths;
