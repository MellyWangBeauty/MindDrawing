import React, { useState } from 'react';
import { Pagination, Col, Row, Card, Space, Image } from 'antd';
import './index.less';

const src =
  'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500';

const imageData = [
  { id: 1, url: src },
  { id: 2, url: src },
  { id: 3, url: src },
  { id: 4, url: src },
  { id: 5, url: src },
  { id: 6, url: src },
  { id: 7, url: src }
  // ... more image data
];

function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // number of images to display per page

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentImages = imageData.slice(startIndex, endIndex);

  return (
    <div className="container">
      <Row justify="space-around" align="middle" className="wrapper">
        {currentImages.map(image => (
          <Col span={11} key={image.id}>
            <Image className="pic" key={image.id} src={image.url} />
            <div className="text">asdasdasdasdasd</div>
          </Col>
        ))}
      </Row>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 70,
          left: 0,
          right: 0
        }}>
        <Pagination
          // className="page"
          current={currentPage}
          pageSize={pageSize}
          total={imageData.length}
          onChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default History;
