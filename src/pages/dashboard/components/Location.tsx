import {AMapScene, Marker} from '@antv/l7-react';
import {Card} from "antd";
import {FormattedMessage} from "umi";
import React from "react";

import type {LocationDataType} from "@/models/dashboard";


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


const Location = ({loading, locationData}: {
  loading: boolean;
  locationData: LocationDataType[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{padding: 0}}
    title={<FormattedMessage id="dashboard.trace"/>}
    style={{
      marginTop: 20,
    }}>
    <Card
      loading={loading}
      bordered={false}
      bodyStyle={{padding: 0}}
    >
      <AMapScene
        map={{
          center: [120.12, 30.38],
          pitch: 0,
          style: 'light',
          zoom: 10.5,
        }}
        style={{
          height: Math.max(480, window.innerWidth / 3)
        }}>
        {locationData &&
        locationData.map((item) => {
          return (
            <Marker key={item.name} lnglat={[item.longitude, item.latitude]}>
              <MarkerInfo title={item.name}/>
            </Marker>
          );
        })}
      </AMapScene>
    </Card>
  </Card>
)

export default Location;
