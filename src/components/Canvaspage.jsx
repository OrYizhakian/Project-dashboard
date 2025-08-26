import { useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";

function CanvasPage({ onSave, initialPaths = [] }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#00bfff");
  const [paths, setPaths] = useState(initialPaths);
  const [currentPath, setCurrentPath] = useState([]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setCurrentPath([{ x: offsetX, y: offsetY }]);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setCurrentPath((prev) => [...prev, { x: offsetX, y: offsetY }]);
  };

  const endDrawing = () => {
    if (currentPath.length > 0) {
      setPaths((prev) => [...prev, { points: currentPath, color: penColor }]);
    }
    setCurrentPath([]);
    setDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    paths.forEach((path) => {
      ctx.strokeStyle = path.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      path.points.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    if (currentPath.length > 0) {
      ctx.strokeStyle = penColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      currentPath.forEach((point, index) => {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }
  }, [paths, currentPath, penColor]);

  const handleSave = () => {
    const dataURL = canvasRef.current.toDataURL("image/png");
    if (onSave) onSave(dataURL, paths);
  };

  const handleClear = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm font-medium mb-1">Pen Color</p>
            <div className="bg-gray-800 p-2 rounded-md border border-gray-700 shadow">
              <HexColorPicker color={penColor} onChange={setPenColor} />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Save
          </button>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="bg-gray-900 border border-gray-700 rounded-lg shadow-md cursor-crosshair"
      />
    </div>
  );
}

export default CanvasPage;
