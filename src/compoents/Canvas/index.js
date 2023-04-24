import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import './index.css';

function Canvas() {
  const [type, setType] = useState('huabi');
  const [color, setColor] = useState('black');
  const clearRef = useRef();

  const handleMouseEnter = () => {
    var canvas = document.getElementById('canvas');
    var clear = document.getElementById('clear');
    var save = document.getElementById('save');
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mouseenter', () => {
      canvas.addEventListener('mousedown', e => {
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = color;
        canvas.addEventListener('mousemove', draw);
      });
      canvas.addEventListener('mouseup', () => {
        canvas.removeEventListener('mousemove', draw);
      });
    });

    function draw(e) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }

    // clear.addEventListener('click', () => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    // });

    // save.addEventListener('click', () => {
    //   const url = canvas.toDataURL();
    //   const a = document.createElement('a');
    //   a.download = 'undefined';
    //   a.href = url;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // });
  };

  const handleClear = () => {
    var canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <div>
        <div className="toolsbar">
          <Button onClick={() => setType('huabi')}>画笔</Button>
          <Button onClick={() => setType('rect')}>正方形</Button>
          <Button onClick={() => setType('arc')}>圆形</Button>
          <span>颜色：</span>
          <input
            type="color"
            value={color}
            onChange={e => {
              setColor(e.target.value);
            }}></input>
          <Button ref={clearRef} onClick={handleClear}>
            清空
          </Button>
          <Button id="save">保存</Button>
        </div>
        <canvas
          id="canvas"
          width="800"
          height="400"
          style={{ border: '1px solid black', marginTop: '10px' }}
          onMouseEnter={handleMouseEnter}></canvas>
      </div>
    </>
  );
}

export default Canvas;
