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
  let isPainting : boolean = false;
  let lineWidth : number = 5;
  let brushShape : CanvasLineCap = 'round';
  let color = '#000000';
  let shadowBlur : number = 0
  let shadowColor : string = '#000000';
  let shadowX : number = 0;
  let shadowY : number = 0;
  const startDraw = (e : any) => {
    isPainting = true;
  }
  const draw = (e : any) => {
    if(!isPainting) {
        return;
    }

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
          type="color"
          aria-label="shadow-color"
          id="shadowcolor"
          onChange={(e) => {
            shadowColor = e.target.value;
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
        <select
          title="brush-shape"
          onChange={(e) => {
            brushShape= e.target.value.toLowerCase() as CanvasLineCap;
          }}
        >
          <option id="shape1">Round</option>
          <option id="shape2">Square</option>
        </select>
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
