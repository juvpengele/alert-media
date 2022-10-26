import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { axios } from '../../services/Http';
import { Sector } from '../../store/sectorsSlice';
import { Theme } from '../../store/themeSlice';
import { Zone } from '../../store/zonesSlice';
import { Link } from 'react-router-dom'
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface Alert {
  id: number,
  title: string,
  summary: string,
  explanation: string,
  link: string,
  date: Date,
  themes: Theme[],
  zones: Zone[],
  sectors: Sector[],
  media_action: string,
  principal_action: string,
  status: 0 | 1
}


const columns: ColumnsType<Alert> = [
  {
    title: 'Titre',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Statut',
    dataIndex: 'status',
    key: 'status',
    render: (_, alert) => (
      <Tag color={alert.status === 1 ? "success": "default"}
        icon={alert.status === 1 ? <CheckCircleOutlined />: <ClockCircleOutlined />}
      >{alert.status === 1 ? "Traitée": "En cours de traitement"}</Tag>
    )
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Secteurs',
    key: 'sectors',
    dataIndex: 'sectors',
    render: (_, { sectors }) => (
      <>
        {sectors.map(sector => (
            <Tag color="blue">{sector.label}</Tag>
          ))}
      </>
    ),
  },
  {
    title: 'Zones',
    key: 'zones',
    dataIndex: 'zones',
    render: (_, { zones }) => (
      <>
        {zones.map(zone => (
            <Tag color="cyan">{zone.label}</Tag>
          ))}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, alert) => (
      <Space size="middle">
        <a href={alert.link}>Consulter</a>
        <Link to={'/alerts/' + alert.id}>Modifier</Link>
      </Space>
    ),
  },
];


const AlertsTable: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const response = await axios.get('/alerts');
        console.log(response.data.data);
        setAlerts(response.data.data);
      } catch(error) {
        console.error(error);
      }
    }

    fetchAlerts();
  }, []);

  return (
    <Table columns={columns} dataSource={alerts} />
  )
};

export default AlertsTable;