import React from 'react';
import { Col, Row } from 'antd';
import { ZoneForm } from '../../components/configurations/zones/ZoneForm';
import { ZonesTable } from '../../components/configurations/zones/ZonesTable';

export function Zone() {
  return (
    <Row>
      <Col flex={1} style={{ paddingRight: "20px" }}>
        <ZoneForm />
      </Col>
      <Col flex={2} style={{ paddingLeft: "20px" }}>
        <ZonesTable />
      </Col>
    </Row>
  )
}