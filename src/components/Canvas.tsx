import { useRef, useEffect } from "react";

const Canvas = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    contextRef.current = context;
  }, [])

  const handleReset = () => {
    if (contextRef.current) {
      let width = contextRef.current.canvas.width;
      let height = contextRef.current.canvas.height;
      contextRef.current.clearRect(0, 0, width, height);
    }
  }
  let isPainting: boolean = false;
  let lineWidth: number = 5;
  let brushShape: CanvasLineCap = 'round';
  let color = '#000000';
  let shadowBlur: number = 0
  let shadowColor: string = '#000000';
  let shadowX: number = 0;
  let shadowY: number = 0;
  let drawShape = false;
  let radius: number = 0;
  const shapeDrawer = (e: any) => {
    if (!drawShape) {
      return;
    }
    let context = contextRef.current as CanvasRenderingContext2D;
    let canvasOffsetX = canvasRef?.current?.offsetLeft as number;
    let canvasOffsetY = canvasRef?.current?.offsetTop as number;
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY, radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    drawShape = false;
  }
  const startDraw = () => {
    isPainting = true;
    if (!isPainting || drawShape) {
      return;
    }
  }
  const draw = (e: any) => {
    if (!isPainting || drawShape) {
      return;
    }
    let context = contextRef.current as CanvasRenderingContext2D;
    context.lineWidth = lineWidth;
    context.lineCap = brushShape;
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.shadowBlur = shadowBlur;
    context.shadowColor = shadowColor;
    context.shadowOffsetX = shadowX;
    context.shadowOffsetY = shadowY;
    let canvasOffsetX = canvasRef?.current?.offsetLeft as number;
    let canvasOffsetY = canvasRef?.current?.offsetTop as number;
    context.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    context.stroke();
  }

  const finishDraw = (e: any) => {
    if (!isPainting || drawShape) {
      return;
    }
    isPainting = false;
    let context = contextRef.current as CanvasRenderingContext2D;
    context.stroke();
    context.beginPath();
  }
  const bkgColor = (e: any) => {
    let context = contextRef.current as CanvasRenderingContext2D;
    if (context) {
      let width = context.canvas.width;
      let height = context.canvas.height;
      context.fillStyle = e.target.value;
      context.fillRect(0, 0, width, height);
    }
  }
  return (
    <div className="container">
      <div className="toolbar">
        <h1>Draw-App</h1>
        <input
          type="color"
          aria-label="bkgcolor"
          id="bkgcolor"
          defaultValue={"#ffffff"}
          onChange={bkgColor}
        />
        <input
          type="color"
          aria-label="color"
          id="color"
          onChange={(e) => {
            color = e.target.value;
          }}
        />
        <input
          type="number"
          defaultValue={5}
          aria-label="linewidth"
          id="width"
          min="1"
          onChange={(e) => {
            lineWidth = parseInt(e.target.value);
          }}
        />
        <details>
          <summary>Shadow</summary>
          <input
            type="color"
            aria-label="shadow-color"
            id="shadowcolor"
            onChange={(e) => {
              shadowColor = e.target.value;
            }}
          />
          <input
            type="number"
            defaultValue={0}
            aria-label="shadowblur"
            id="shadowblur"
            min="0"
            onChange={(e) => {
              shadowBlur = parseInt(e.target.value);
            }}
          />
          <input
            type="number"
            defaultValue={0}
            aria-label="shadow-X"
            id="shadowX"
            min="0"
            onChange={(e) => {
              shadowX = parseInt(e.target.value);
            }}
          />
          <input
            type="number"
            defaultValue={0}
            aria-label="shadow-Y"
            id="shadowY"
            min="0"
            onChange={(e) => {
              shadowY = parseInt(e.target.value);
            }}
          />
        </details>
        <select
          title="brush-shape"
          onChange={(e) => {
            brushShape = e.target.value.toLowerCase() as CanvasLineCap;
          }}
        >
          <option id="shape1">Round</option>
          <option id="shape2">Square</option>
        </select>
        <details>
          <summary>Draw Circle Shape</summary>
          <input
            type="number"
            defaultValue={0}
            aria-label="circle-radius"
            id="circleradius"
            min="0"
            onChange={(e) => {
              radius = parseInt(e.target.value);
            }}
          />
          <button type="button" id="drawcircle" onClick={() => {
            drawShape = true;
          }}
          >
            Draw Circle
          </button>
        </details>
        <button type="button" id="reset" onClick={handleReset}>Reset</button>
      </div>
      <div className="canvasholder">
        <canvas
          ref={canvasRef}
          onClick={shapeDrawer}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={finishDraw}
        />
      </div>
    </div>
  );
};

export default Canvas;
