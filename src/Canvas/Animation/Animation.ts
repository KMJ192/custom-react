class Animation {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  delta: number;
  startTime: number;
  frameRequestHandler: number;
  constructor(id: string) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.delta = 0;
    this.startTime = Date.now();
    this.frameRequestHandler = requestAnimationFrame(this.frameRequest);
  }

  private frameRequest = () => {
    this.frameRequestHandler = requestAnimationFrame(this.frameRequest);
    const curTime = Date.now();
    this.delta = (curTime - this.startTime) * 0.01;
    this.startTime = curTime;
  };
}

export default Animation;
//https://velog.io/@kimbyungchan/canvas-animation
