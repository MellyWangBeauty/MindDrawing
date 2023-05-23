import React, { useEffect, useRef, useState } from 'react';
import { Checkbox, Input, Button, Col, Row, Modal } from 'antd';
import './index.less';
import {
  ArrowDown,
  Upload,
  Save,
  Back,
  Delete,
  Optimize,
  Label,
  Notes
} from '@icon-park/react';
import '@icon-park/react/styles/index.css';
import CreatedImg from '../../assets/images/ironman2.png';

const { TextArea } = Input;

function Content() {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [brushSize, setBrushSize] = useState(5);
  const [canvasBackground, setCanvasBackground] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [undoStack, setUndoStack] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = '960';
    canvas.height = '550';
  }, []);

  const handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const image = new Image();
      image.onload = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = event => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const handleMouseMove = event => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    context.lineWidth = brushSize;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    context.lineTo(x, y);
    context.strokeStyle = brushColor;
    context.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack([...undoStack, imageData]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = undoStack.pop();
    context.putImageData(imageData, 0, 0);
    setUndoStack([...undoStack]);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setUndoStack([]);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'canvas.png';
    const imgUrl = canvas.toDataURL();
    console.log(imgUrl);
    setImgUrl(imgUrl);
    // link.href = canvas.toDataURL();
    // link.click();
  };

  const handleBrushSizeChange = event => {
    setBrushSize(event.target.value);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onTagChange = checkedValues => {
    console.log('checked = ', checkedValues);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onTextChange = e => {
    setText(e.target.value);
    console.log(text);
  };

  const options = [
    { label: '卡通', value: '1' },
    { label: '山', value: '2' },
    { label: '花', value: '3' },
    { label: '天空', value: '4' },
    { label: '科技', value: '5' },
    { label: '风景', value: '6' },
    { label: '城市', value: '7' },
    { label: '建筑', value: '8' },
    { label: '森林', value: '9' },
    { label: '星空', value: '10' },
    { label: '春天', value: '11' }
  ];

  return (
    <div className="container">
      <div className="top">
        <i className="icon icon-xiajiantou"></i>
        <span id="huabu">
          <ArrowDown theme="outline" size="30" fill="#6e41ff" />
          画布
        </span>
        <label type="primary">画笔颜色：</label>
        <input
          style={{ marginRight: '20px' }}
          type="color"
          value={brushColor}
          onChange={event => setBrushColor(event.target.value)}
        />
        <label>画笔粗细：</label>
        <input
          style={{ marginRight: '10px' }}
          type="range"
          min={1}
          max={10}
          value={brushSize}
          onChange={handleBrushSizeChange}
        />
        <Button
          type="primary"
          onClick={handleButtonClick}
          style={{ margin: '15px 10px' }}>
          <Upload
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          上传背景图片
        </Button>
        {/* <button onClick={handleButtonClick}>上传图片作为背景</button> */}
        <input
          type="file"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        {/* <Button
          type="primary"
          onClick={handleButtonClick}
          style={{ margin: '15px 15px' }}>
          <Upload
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          选择图片素材
        </Button> */}
        <Button
          type="primary"
          onClick={handleUndo}
          style={{ marginRight: '30px' }}>
          <Back
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          撤销
        </Button>
        <Button
          type="primary"
          onClick={handleClear}
          style={{ marginRight: '30px' }}>
          <Delete
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          清空
        </Button>
        <Button
          type="primary"
          onClick={handleSave}
          style={{ marginRight: '30px' }}>
          <Save
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          保存
        </Button>
        <Button type="primary" onClick={showModal}>
          <Optimize
            theme="outline"
            size="15"
            fill="white"
            style={{ marginRight: '5px' }}
          />
          智慧生成绘图
        </Button>
      </div>

      <div className="bottom">
        <div className="left">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
        <div className="right">
          <div className="label" style={{ margin: '10px' }}>
            <div>
              <Label theme="outline" size="24" fill="#6e41ff" />
              <span>标签：</span>
            </div>
            <Checkbox.Group
              // options={options}
              defaultValue={[]}
              onChange={onTagChange}>
              <Row style={{ marginTop: '10px' }}>
                {options.map(option => {
                  return (
                    <Col span={8} key={option.label}>
                      <Checkbox value={option.value}>{option.label}</Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </Checkbox.Group>
          </div>

          <div
            className="textarea"
            style={{
              position: 'absolute',
              margin: '10px',
              bottom: '50px'
            }}>
            <Notes theme="outline" size="24" fill="#6e41ff" />
            <span>文本:</span>
            <TextArea
              // value={value}
              className="text"
              onChange={e => onTextChange(e)}
              rows="5"
              cols="20"
              allowClear
            />
          </div>
        </div>
      </div>
      <Modal
        title="生成图片预览"
        visible={isModalOpen}
        cancelText="放弃"
        okText="保存"
        onOk={handleOk}
        onCancel={handleCancel}>
        <img
          // src="https://img1.baidu.com/it/u=413643897,2296924942&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
          src={CreatedImg}
          alt="tp"
          width="100%"
          height="100%"
        />
      </Modal>
    </div>
  );
}

export default Content;
