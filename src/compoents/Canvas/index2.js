import { useRef, useState } from 'react';
import React from 'react';

function App() {
  const canvasRef = useRef(null);
  const [canvasBackground, setCanvasBackground] = useState('');

  const handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const imageUrl = event.target.result;
      setCanvasBackground(imageUrl);
      const canvas = canvasRef.current;
      canvas.style.backgroundImage = `url(${imageUrl})`;
    };
    reader.readAsDataURL(file);
  };

  // const setCanvasBackground = imageUrl => {};

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <canvas ref={canvasRef} style={{ backgroundImage: canvasBackground }} />
    </div>
  );
}

export default App;
