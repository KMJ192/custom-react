function createRandomColor(): string {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function linear(t: number) {
  return t;
}

class AnimatedValue {
  from: number;
  to: number;
  time: number;
  elapsedTime: number;
  duration: number;
  delay: number;
  easingFunction: (t: number) => number;
  constructor(
    from: number,
    to: number,
    duration: number,
    delay: number,
    easingFunction: (t: number) => number = linear,
  ) {
    this.from = from;
    this.to = to;
    this.duration = duration;
    this.delay = delay * 0.001;
    this.easingFunction = easingFunction;
    this.time = 0;
    this.elapsedTime = 0;
  }

  get value() {
    return (
      this.from +
      (this.to - this.from) * this.easingFunction.call(null, this.elapsedTime)
    );
  }

  update(delta: number) {
    this.time += delta;

    if (this.time < this.delay) {
      return;
    }

    this.elapsedTime += delta * (1000 / this.duration);
    if (this.elapsedTime >= 1) {
      this.elapsedTime = 1;
    }
  }
}

class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Shape {
  position: Vector;
  constructor(position: Vector) {
    this.position = position;
  }

  update(delta: number) {}

  render(context: CanvasRenderingContext2D) {}
}

class Circle extends Shape {
  pi: number;
  radius: number;
  angle: number;
  speed: number;
  color: string;
  radiusAnimatedValue: AnimatedValue;

  constructor(position: Vector) {
    super(position);
    this.radius = 10 * Math.random();
    this.pi = Math.PI * 2;
    this.angle = this.pi * Math.random();
    this.speed = 100 * Math.random();
    this.color = createRandomColor();

    this.radiusAnimatedValue = new AnimatedValue(0, 1, 300, this.speed * 10);
  }

  update(delta: number) {
    const velocity = this.speed * delta;
    this.position.x += Math.cos(this.angle) * velocity;
    this.position.y += Math.sin(this.angle) * velocity;

    this.radiusAnimatedValue.update(delta);
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(
      this.position.x,
      this.position.y,
      this.radius * this.radiusAnimatedValue.value,
      0,
      this.pi,
    );
    context.fill();
  }
}

class Animation {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  delta: number;
  startTime: number;
  frameRequestHandler: number;
  shapes: Array<Shape> = [];

  constructor(id: string) {
    this.canvas = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');
    this.delta = 0;
    this.startTime = Date.now();
    this.frameRequestHandler = requestAnimationFrame(this.frameRequest);

    for (let i = 0; i < 100; i++) {
      this.shapes.push(
        new Circle(
          new Vector(this.canvas.width * 0.5, this.canvas.height * 0.5),
        ),
      );
    }
  }

  private frameRequest = () => {
    this.frameRequestHandler = requestAnimationFrame(this.frameRequest);
    const curTime = Date.now();
    this.delta = (curTime - this.startTime) * 0.001;
    this.startTime = curTime;

    if (this.context) {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.shapes.length; i++) {
        this.shapes[i].update(this.delta);
        this.shapes[i].render(this.context);
      }
    }
  };
}

export default Animation;
// https://velog.io/@kimbyungchan/canvas-animation
