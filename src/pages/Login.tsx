import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Space
} from "antd";

const { Title, Text } = Typography;

export function Login() {
  return (
    <Row gutter={[24, 0]} justify="space-around">
      <Col
        xs={{ span: 24, offset: 0 }}
        lg={{ span: 6 }}
        md={{ span: 12 }}
      >
        <Title level={1} className="mb-0">Connexion</Title>
        <Text type="secondary">Veuillez saisir votre email et votre mot de passe pour vous connecter</Text>

        <Form
            onFinish={() => {}}
            onFinishFailed={() => {}}
            layout="vertical"
            className="row-col my-10"
          >
            <Form.Item
              className="username"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              className="username"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="remember"
              className="aligin-center"
              valuePropName="checked"
            >
              <Switch defaultChecked onChange={() => { console.log('hello world')}} />
              Remember me
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                SIGN IN
              </Button>
            </Form.Item>
            <p className="font-semibold text-muted">
              <Link to="/auth/password-reset" className="text-dark font-bold">
              Reset password
              </Link>
            </p>
          </Form>
      </Col>
      
    </Row>
  );
}
