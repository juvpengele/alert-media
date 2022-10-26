import React from 'react';
import { Col, Divider, Row } from 'antd';
import { SectorForm } from '../../components/configurations/sectors/SectorForm';
import { SectorsTable } from '../../components/configurations/sectors/SectorsTable';

export function Sector() {
  return (
    <Row>
      <Col flex={1} style={{ paddingRight: "20px" }}>
        <SectorForm />
      </Col>
      <Col flex={2} style={{ paddingLeft: "20px" }}>
        <SectorsTable />
      </Col>
    </Row>
  )
}