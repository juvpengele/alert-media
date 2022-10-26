
import { Col, Row } from 'antd';
import { ThemeForm } from '../../components/configurations/themes/ThemeForm';
import { ThemesTable } from '../../components/configurations/themes/ThemesTable';

export function Theme() {
  return (
    <Row>
      <Col flex={1} style={{ paddingRight: "20px" }}>
        <ThemeForm />
      </Col>
      <Col flex={2} style={{ paddingLeft: "20px" }}>
        <ThemesTable />
      </Col>
    </Row>
  )
}