import React from "react";

import { useTheme } from "../../components/providers";
import { Mouse } from "./logic/Mouse";
import { Painter } from "./logic/Painter";
import { World } from "./logic/World";

export function Canvas({ world, mouse }: { world: World; mouse: Mouse }) {
  let canvas: HTMLCanvasElement;

  const [fps, setFps] = React.useState(0);
  const [drawTime, setDrawTime] = React.useState(0);
  const [calcTime, setCalcTime] = React.useState(0);

  React.useEffect(() => {
    if (!canvas) {
      canvas = document.getElementById("dunes") as HTMLCanvasElement;
      canvas.width = world.width;
      canvas.height = world.height;
      canvas.oncontextmenu = (event) => event.preventDefault();
      console.log("adding listeners");
      canvas.addEventListener("mousemove", (event: MouseEvent) => mouse.onMove(event, canvas));
      canvas.addEventListener("mousedown", (event: MouseEvent) => mouse.onPress(event));
      window.addEventListener("mouseup", () => mouse.onRelease());
    }

    const painter = new Painter(canvas.getContext("2d") as CanvasRenderingContext2D);

    let mounted = true;
    let lastTime = 0;
    const redraw = (time: number) => {
      if (!mounted) return;
      requestAnimationFrame(redraw);
      mouse.interact(world);
      const startDraw = performance.now();
      world.draw(painter);
      const endDraw = performance.now();
      setDrawTime(endDraw - startDraw);

      const elapsed = time - lastTime;
      lastTime = time;
      setFps(1000 / elapsed);

      const startCalc = performance.now();
      world.update(elapsed);
      const endCalc = performance.now();
      setCalcTime(endCalc - startCalc);
    };
    requestAnimationFrame(redraw);
    return () => {
      mounted = false;
    };
  }, []);

  const { theme } = useTheme();
  const style = getStyle();
  return (
    <>
      <canvas id="dunes" style={{ ...style.canvas, imageRendering: "pixelated" }}></canvas>
      <div>{"FPS: \t" + fps.toFixed(0)}</div>
      <div>{"Draw Time: \t" + drawTime.toFixed(0)} ms</div>
      <div>{"Calc Time: \t" + calcTime.toFixed(0)} ms</div>
    </>
  );

  function getStyle() {
    return {
      canvas: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        boxShadow: "inset 0 0 24px rgba(0, 0, 0, 0.5)",
        borderRadius: "8px",
        overflow: "hidden",
      },
    };
  }
}
