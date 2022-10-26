import { useEffect, useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  CalendarOutlined, 
  PlusOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import { useNavigate } from "react-router-dom";
import AlertsTable from "../components/alerts/AlertsTable";
import { axios } from "../services/Http";

interface AlertStats {
  dailyAlerts: number,
  monthlyAlerts: number,
  successAlerts: number
}

function Alert() {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [stats, setStats] = useState<AlertStats>({ dailyAlerts: 0, monthlyAlerts: 0, successAlerts: 0});

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('alerts/statistics')
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, []);

  const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  const goToCreationPage = () => navigate('/alertes/create')

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Aujourd'hui</span>
                    <Title level={3}>
                      { stats.dailyAlerts } <small className="">
                      { stats.dailyAlerts > 1 ? "Alertes": "Alerte"}
                      </small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <UnorderedListOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Traitées</span>
                    <Title level={3}>
                      { stats.successAlerts } <small className="">
                        { stats.successAlerts > 1 ? "Alertes": "Alerte"}
                      </small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box success">
                      <CheckCircleOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={8}
            className="mb-24"
          >
            <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Ce mois</span>
                    <Title level={3}>
                      { stats.monthlyAlerts } <small className="">
                      { stats.monthlyAlerts > 1 ? "Alertes": "Alerte"}
                      </small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <CalendarOutlined />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

        </Row>



        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={2}>Liste des alertes</Title>

                </div>
                <div>
                  <Button type="primary" icon={<PlusOutlined />} size='large' onClick={goToCreationPage}>NOUVELLE ALERTE</Button>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <AlertsTable />
              </div>

            </Card>
          </Col>

        </Row>

      </div>
    </>
  );
}

export default Alert;
