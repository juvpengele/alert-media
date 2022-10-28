import { useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const palettes = [
  "#DAF7A6",
  "#FFC300",
  "#C70039",
  "#900C3F",
  "#884ea0",
  "#1b2631",
  "#2ecc71",
  "#DAF7A6",
  "#FF5733",
]


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Nombre d'alertes / zone",
    },
  },
};
import { axios } from "../../services/Http";

type StatBySector = { label: string, alerts_count: number }

function AlertsPerZone() {
  const [statsPerSector, setStatsPerSector] = useState<StatBySector[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/statistics/alerts-zones');
        setStatsPerSector(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  }, []);


  const getData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];

    statsPerSector.forEach((stat) => {
      labels.push(stat.label);
      data.push(stat.alerts_count);
    });


    return {
      labels, 
      datasets: [{
        fill: true,
        label: "Nombre d'alertes / Secteur",
        data,
        borderColor: palettes,
        backgroundColor: palettes
      }]
    }
  }, [statsPerSector]);

  return (
    <Doughnut data={getData} options={options} />
  );
}

export default AlertsPerZone;
