import { Space, Card, Table, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, MouseEvent } from 'react';
import { axios } from '../../../services/Http';
import { addSectors, Sector, getSectors, removeSector, selectSector } from '../../../store/sectorsSlice';
import { useDispatch, useSelector } from "react-redux";




export const SectorsTable: React.FC = () => {
  
  const cancel = () => console.log('Cancaled');
  
  const columns: ColumnsType<Sector> = [
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
      render: (_, sector: Sector) => <Space size="middle">
        <a onClick={() => dispatch(selectSector(sector))}>Modifier </a>
        <Popconfirm
          title="Etes-vous sur de vouloir supprimer cette zone ?"
          onConfirm={() => deleteSector(sector)}
          onCancel={cancel}
          okText="Oui"
          cancelText="Non"
        >
          <a href="#">Supprimer</a>
        </Popconfirm>
      
    </Space>
    },
  ];
  

  const dispatch = useDispatch();
  const { Title, Text } = Typography;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const data = useSelector(getSectors);
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const response = await axios.get('sectors');
        dispatch(addSectors(response.data as Sector[]));
      } catch (error) {
        console.log(error);
      }
    }

    fetchSectors();
  }, []);

  async function deleteSector(sector: Sector) {
    try {
      await axios.delete(`sectors/${sector.id}`);
      dispatch(removeSector(sector));
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
      <Title level={2} className="mb-0">Liste des secteurs</Title>
    <div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
    </Card>

  );
};
