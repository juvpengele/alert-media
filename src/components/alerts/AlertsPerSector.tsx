import { useEffect, useMemo, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const palettes = [
  "#43aa8b", 
  "#4d908e", 
  "#277da1",
  "#f94144", 
  "#f3722c", 
  "#f8961e", 
  "#f9844a", 
  "#f9c74f", 
  "#90be6d", 
  "#577590", 
]


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: "Nombre d'alertes / secteur",
    },
  },
};
import { axios } from "../../services/Http";

type StatBySector = { label: string, alerts_count: number }

function AlertsPerSector() {
  const [statsPerSector, setStatsPerSector] = useState<StatBySector[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/statistics/alerts-sectors');
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

export default AlertsPerSector;
