import React from "react";
import {
  Layout,
} from "antd";


const { Content } = Layout;

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
};

export { AuthLayout };