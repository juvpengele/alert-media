import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";
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
    },
  },
};

import { axios } from "../services/Http";

type Month = 'Oct' | 'Nov' | 'Dec' | 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Apr' | 'Jun' | 'Jul' | 'Aug' | 'Sep';
type StatByMonth = { [key in Month]: number }

function Home() {
  const { Title } = Typography;
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
        label: 'Alerte média',
        data: labels.map((label: Month) => statsByMonth[label] || 0),
        borderColor: 'rgb(99, 141, 255)',
      }]
    }
  }, [statsByMonth]);

  return (
    <>
      <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={2}>Alertes médias / Mois</Title>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <Line data={getData} />
              </div>
            </Card>
          </Col>
        </Row>
    </>
  );
}

export default Home;
