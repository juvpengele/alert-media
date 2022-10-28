import { useEffect, useMemo, useState } from "react";

import { AlertOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Typography, Progress } from "antd";
import AlertPerMonths from "../components/alerts/AlertPerMonths";
import AlertsPerSector from "../components/alerts/AlertsPerSector";
import AlertsPerZone from "../components/alerts/AlertsPerZone";
import { axios } from "../services/Http";

type DashboardStats = {
  todayAlerts: number,
  todayCompletedAlerts: number,
  totalAlerts: number,
  totalCompletedAlerts: number,
}
const { Title } = Typography;
function Home() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    todayAlerts: 0,
    todayCompletedAlerts: 0,
    totalAlerts: 0,
    totalCompletedAlerts: 0,
  })
  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axios.get('/statistics/dashboard-stats');
        setDashboardStats(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} className="mb-24">
          <Card bordered={false} className="criclebox "  style={{ paddingBottom: '1.5rem'}}>
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Aujourd'hui</span>
                    <Title level={3}>
                      { dashboardStats.todayAlerts } <small className="">{dashboardStats.todayAlerts > 1 ? "Alertes" : "Alerte"}</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <AlertOutlined />  
                    </div>
                  </Col>
                </Row>
              </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} className="mb-24">
        <Card bordered={false} className="criclebox " >
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>Aujourd'hui</span>
                  <Title level={3}>
                    {dashboardStats.todayCompletedAlerts} <small className="">{10 > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                  <Progress percent={
                    dashboardStats.todayCompletedAlerts * 100 / dashboardStats.todayAlerts || 0
                  } />
                </Col>
                <Col xs={6}>
                  <div className="icon-box success">
                    <CheckCircleFilled />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} className="mb-24">
        <Card bordered={false} className="criclebox " style={{ paddingBottom: '1.5rem'}} >
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>Total</span>
                  <Title level={3}>
                    {dashboardStats.totalAlerts} <small className="">{dashboardStats.totalAlerts > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">
                    <AlertOutlined />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} className="mb-24">
        <Card bordered={false} className="criclebox ">
            <div className="number">
              <Row align="middle" gutter={[24, 0]}>
                <Col xs={18}>
                  <span>Traitées</span>
                  <Title level={3}>
                    {dashboardStats.totalCompletedAlerts} <small className="">{dashboardStats.totalCompletedAlerts > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                  <Progress percent={
                    dashboardStats.totalCompletedAlerts * 100 / dashboardStats.totalAlerts || 0
                  } />
                </Col>
                <Col xs={6}>
                  <div className="icon-box success">
                    <CheckCircleFilled />
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card
            bordered={false}
            className="criclebox cardbody h-full"
            style={{ padding: "4rem" }}
          >
            <div className="project-ant"></div>
            <div className="ant-list-box table-responsive">
              <AlertPerMonths />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={7} className="mb-24">
          <Card
            bordered={false}
            className="criclebox cardbody h-full"
            style={{ padding: "4rem" }}
          >
            <div className="project-ant"></div>
            <div className="ant-list-box table-responsive">
              <AlertsPerSector />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={7} className="mb-24">
          <Card
            bordered={false}
            className="criclebox cardbody h-full"
            style={{ padding: "4rem" }}
          >
            <div className="project-ant"></div>
            <div className="ant-list-box table-responsive">
              <AlertsPerZone />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Home;
