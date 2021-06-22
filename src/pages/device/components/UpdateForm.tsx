import React from 'react';
import {Modal} from 'antd';
import {FormattedMessage} from "umi";


interface UpdateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {modalVisible, onCancel} = props;

  return (
    <Modal
      destroyOnClose
      title={<FormattedMessage id="device.edit.title"/>}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
