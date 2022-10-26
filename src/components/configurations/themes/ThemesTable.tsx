import { Space, Card, Table, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState, MouseEvent } from 'react';
import { axios } from '../../../services/Http';
import { addThemes, Theme, getThemes, removeTheme, selectTheme } from '../../../store/themeSlice';
import { useDispatch, useSelector } from "react-redux";




export const ThemesTable: React.FC = () => {

  const cancel = () => {
    console.log('Cancaled')
  };
  
  const columns: ColumnsType<Theme> = [
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
      render: (_, theme: Theme) => <Space size="middle">
        <a onClick={() => dispatch(selectTheme(theme))}>Modifier </a>
        <Popconfirm
          title="Etes-vous sur de vouloir supprimer cette thematique ?"
          onConfirm={() => deleteTheme(theme)}
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
  const data = useSelector(getThemes);
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    async function fetchThemes() {
      try {
        const response = await axios.get('themes');
        dispatch(addThemes(response.data as Theme[]));
      } catch (error) {
        console.log(error);
      }
    }

    fetchThemes();
  }, []);

  async function deleteTheme(theme: Theme) {
    try {
      await axios.delete(`themes/${theme.id}`);
      dispatch(removeTheme(theme));
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
      <Title level={2} className="mb-0">Liste des thématiques</Title>
    <div>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
    </Card>

  );
};
