import React from 'react';
import {Card, Modal} from 'antd';
import {FormattedMessage} from "umi";
import {AMapScene, Marker} from "@antv/l7-react";
import {DeviceLocation} from "@/models/device";


interface UpdateFormProps {
  modalVisible: boolean;
  trace?: DeviceLocation[];
  onCancel: () => void;
}


const MarkerPinImg = {
  blue:
    'https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*n6cXTb8R7iUAAAAAAAAAAAAAARQnAQ',
};

const MarkerInfo = ({title}: { title: string }) => {
  return (
    <div className="markerContent">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          padding: '0.05rem',
          background: '#1677ff',
          borderRadius: '44px',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '12px',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          style={{
            width: '20px',
            height: '30px',
          }}
          alt="marker"
          src={MarkerPinImg.blue}
        />
      </div>
    </div>
  );
};

const LocationForm: React.FC<UpdateFormProps> = (props) => {
  const {modalVisible, onCancel, trace} = props;

  return (
    <Modal
      destroyOnClose
      title={<FormattedMessage id="device.location.title"/>}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Card
        bordered={false}
        bodyStyle={{padding: 0}}
      >
        <AMapScene
          map={{
            center: [120.12, 30.38],
            pitch: 0,
            style: 'light',
            zoom: 10,
          }}
          style={{
            width: window.innerWidth / 1.5,
            height: Math.max(480, window.innerWidth / 3)
          }}>
          {trace && trace.map((item) => {
            return (
              <Marker key={item.time} lnglat={[item.longitude, item.latitude]}>
                <MarkerInfo title={new Date(item.time).toLocaleString()}/>
              </Marker>
            );
          })}
        </AMapScene>
      </Card>
    </Modal>
  );
};

export default LocationForm;
