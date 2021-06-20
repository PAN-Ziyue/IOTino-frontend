import {PlusOutlined} from '@ant-design/icons';
import {Button, message, Divider, Form, Input,} from 'antd';
import React, {useState, useRef} from 'react';
import {FormattedMessage, useIntl} from 'umi';
import {GridContent} from '@ant-design/pro-layout';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';


import {queryDevice, updateRule, addDevice, removeRule} from '@/services/device';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import type {DeviceItem} from '@/models/device';


const handleAdd = async (fields: DeviceItem) => {
  const hide = message.loading('正在添加');
  try {
    await addDevice({...fields});
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

const handleUpdate = async (fields: DeviceItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      device: fields.device,
      name: fields.name,
    });
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};


const handleRemove = async (fields: DeviceItem) => {
  const hide = message.loading('正在删除');
  try {
    await removeRule({
      device: fields.device,
    });
    hide();
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [updateDeviceValues, setUpdateDeviceValues] = useState<DeviceItem>();
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  const columns: ProColumns<DeviceItem>[] = [
    {
      title: <FormattedMessage id="device.table.device"/>,
      dataIndex: 'device',

      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage id="device.table.device.required"/>,
          },
        ],
      },
    },
    {
      title: <FormattedMessage id="device.table.name"/>,
      dataIndex: 'name',

      formItemProps: {
        rules: [
          {
            required: true,
            message: <FormattedMessage id="device.table.name.required"/>,
          },
        ],
      },
    },
    {
      title: <FormattedMessage id="device.table.data"/>,
      dataIndex: 'count',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="device.table.value"/>,
      dataIndex: 'value',
      hideInForm: true,
    },
    {
      title: <FormattedMessage id="device.table.status"/>,
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        'offline': {
          text: <FormattedMessage id="device.status.offline"/>,
          status: 'Default'
        },
        'normal': {
          text: <FormattedMessage id="device.status.normal"/>,
          status: 'Success'
        },
        'alert': {
          text: <FormattedMessage id="device.status.alert"/>,
          status: 'Error'
        },
      },
    },
    {
      title: <FormattedMessage id="device.table.operation"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a onClick={() => {
          handleUpdateModalVisible(true);
          setUpdateDeviceValues(record);
        }}>
          <FormattedMessage id="device.edit"/>
        </a>,
        <Divider type="vertical"/>,
        <a onClick={async () => {
          await handleRemove(record);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }} style={{color: "red"}}>
          <FormattedMessage id="device.delete"/>
        </a>,
      ],
    },
  ];


  return (
    <GridContent>
      <ProTable<DeviceItem>
        headerTitle={intl.formatMessage({id: 'device.title'})}
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={false}
        pagination={false}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined/>
            <FormattedMessage id="device.new"/>
          </Button>,
        ]}
        request={(params) => queryDevice({...params})}
        columns={columns}
        rowSelection={false}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}>
        <Form
          layout="vertical"
          onFinish={
            async (value) => {
              const success = await handleAdd(value);
              if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}>
          <Form.Item
            name="device"
            label={<FormattedMessage id="device.table.device"/>}
            rules={[{
              required: true,
              message: <FormattedMessage id="device.table.device.required"/>,
            }]}>
            <Input/>
          </Form.Item>
          <Form.Item
            name="name"
            label={<FormattedMessage id="device.table.name"/>}
            rules={[{
              required: true,
              message: <FormattedMessage id="device.table.name.required"/>,
            }]}>
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </CreateForm>

      <UpdateForm
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}>
        <Form
          layout="vertical"
          onFinish={
            async (value) => {
              const success = await handleUpdate(value);
              if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
          initialValues={{
            device: updateDeviceValues?.device,
            name: updateDeviceValues?.name
          }}>
          <Form.Item
            name="device"
            tooltip={<FormattedMessage id="device.table.device.tip"/>}
            label={<FormattedMessage id="device.table.device"/>}
            rules={[{
              required: true,
              message: <FormattedMessage id="device.table.device.required"/>,
            }]}>
            <Input readOnly/>
          </Form.Item>
          <Form.Item
            name="name"
            label={<FormattedMessage id="device.table.name"/>}
            rules={[{
              required: true,
              message: <FormattedMessage id="device.table.name.required"/>,
            }]}>
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </UpdateForm>
    </GridContent>
  );
};

export default TableList;
