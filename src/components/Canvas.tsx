import { useRef, useEffect, MouseEventHandler } from "react";

type CanvasProps = {
  width: number;
  height: number;
}

const Canvas = (props : CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context : CanvasRenderingContext2D;

  useEffect(() => {
    context = canvasRef?.current?.getContext('2d') as CanvasRenderingContext2D;
  }, [])

  const handleReset = () => {
    if (context) {
      context.clearRect(0, 0, props.width, props.height);
    }
  }
  let isPainting = false;
  let lineWidth = 5;
  let startX = 0;
  let startY = 0;
  let color = '#000000';
  const startDraw = (e : any) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
  }
  const draw = (e : any) => {
    if(!isPainting) {
        return;
    }

    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = color;
    let canvasOffsetX = canvasRef?.current?.offsetLeft as number;
    let canvasOffsetY = canvasRef?.current?.offsetTop as number;
    context.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    context.stroke();
}

  const finishDraw = (e : any) => {
    isPainting = false; 
    context.stroke();
    context.beginPath();
  }
  return (
    <div>
      <div>
        <h1>Draw-App</h1>
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
        <button type="button" id="reset" onClick={handleReset}>Reset</button>
      </div>
      <canvas 
        ref={canvasRef}
        width={props.width}
        height={props.height}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={finishDraw}
      />
    </div>
  );
};

export default Canvas;
