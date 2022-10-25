import React, { Children, Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

type Props = {
  children: React.ReactNode
}

const AuthLayout: React.FC<Props> = ({children}) => {
  return (
    <>
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        {children}
      </Content>
    </Layout>
  </>
  )
}

export { AuthLayout };