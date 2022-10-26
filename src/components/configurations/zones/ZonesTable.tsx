import { Space, Card, Table, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, MouseEvent } from 'react';
import { axios } from '../../../services/Http';
import { addZones, Zone, getZones, removeZone, selectZone } from '../../../store/zonesSlice';
import { useDispatch, useSelector } from "react-redux";




export const ZonesTable: React.FC = () => {

  const cancel = () => {
    console.log('Cancaled')
  };
  
  const columns: ColumnsType<Zone> = [
    {
      title: 'Libellé',
      dataIndex: 'label',
    },
    {
      title: 'Alertes',
      dataIndex: 'alerts_count',
    },
    {
      title: 'Actions',
      key: 'x',
      render: (_, zone: Zone) => <Space size="middle">
        <a onClick={() => dispatch(selectZone(zone))}>Modifier </a>
        <Popconfirm
          title="Etes-vous sur de vouloir supprimer cette zone ?"
          onConfirm={() => deleteZone(zone)}
          onCancel={cancel}
          okText="Oui"
          cancelText="Annuler"
        >
          <a href="#">Supprimer</a>
        </Popconfirm>
      
    </Space>
    },
  ];
  

  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const data = useSelector(getZones);
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    async function fetchZones() {
      try {
        const response = await axios.get('zones');
        dispatch(addZones(response.data as Zone[]));
      } catch (error) {
        console.log(error);
      }
    }

    fetchZones();
  }, []);

  async function deleteZone(zone: Zone) {
    try {
      await axios.delete(`zones/${zone.id}`);
      dispatch(removeZone(zone));
    } catch (error) {
      console.log(error);
    }
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Card>
      <Title level={2} className="mb-0">Liste des zones</Title>
    <div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
    </Card>

  );
};
