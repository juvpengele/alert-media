import { useEffect, useMemo, useState } from "react";

import { UnderlineOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import AlertPerMonths from "../components/alerts/AlertPerMonths";
import AlertsPerSector from "../components/alerts/AlertsPerSector";
import AlertsPerZone from "../components/alerts/AlertsPerZone";

const { Title } = Typography;
function Home() {
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6} className="mb-24">
          <Card bordered={false} className="criclebox ">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span>Aujourd'hui</span>
                    <Title level={3}>
                      {10} <small className="">{10 > 1 ? "Alertes" : "Alerte"}</small>
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">
                      <UnderlineOutlined />
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
                  <span>Aujourd'hui</span>
                  <Title level={3}>
                    {10} <small className="">{10 > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">
                    <UnderlineOutlined />
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
                  <span>Aujourd'hui</span>
                  <Title level={3}>
                    {10} <small className="">{10 > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">
                    <UnderlineOutlined />
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
                  <span>Aujourd'hui</span>
                  <Title level={3}>
                    {10} <small className="">{10 > 1 ? "Alertes" : "Alerte"}</small>
                  </Title>
                </Col>
                <Col xs={6}>
                  <div className="icon-box">
                    <UnderlineOutlined />
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
