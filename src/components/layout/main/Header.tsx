import { useState, useEffect, MouseEventHandler } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Space,
  Typography,
  notification,
} from "antd";

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import {
  DownOutlined, UserOutlined, SmileOutlined
} from "@ant-design/icons";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, logout } from "../../../store/authSlice";
import { axios } from "../../../services/Http";

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;


type HeaderProps = {
  placement?: any,
  name: any,
  subName: any,
  onPress: () => void,
  handleSidenavColor: (color: any) => void,
  handleSidenavType: (type: any) => void,
  handleFixedNavbar: (type: any) => void,
}

function Header({
  name,
  subName,
}: HeaderProps) {
  useEffect(() => window.scrollTo(0, 0));
  const user = useSelector(authSelector);
  const dispatch = useDispatch();

  async function handleLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();

    try {
      await axios.delete('/auth/logout');
     
      dispatch(logout());
    } catch(error) {
      notification.error({
        message: 'Erreur',
        description: 'Il y a eu une erreur lors de la requete'
      })
    }
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a onClick={handleLogout}>
              Se deconnecter
            </a>
          ),
        },
  
      ]}
    />
  )

  return (
    <>

      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>

            <Breadcrumb.Item >
              {name.replace("/", " / ")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", " / ")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
        <Dropdown overlay={menu}>
          <span onClick={e => e.preventDefault()}>
            <Space>
              <UserOutlined />
              { user?.name }
            </Space>
          </span>
        </Dropdown>
        </Col>
      </Row>
    </>
  );
}

export default Header;
