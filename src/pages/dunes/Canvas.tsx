import React from "react";

import { useTheme } from "../../components/providers";
import { Mouse } from "./logic/Mouse";
import { World } from "./logic/World";
import { RuleSet } from "./RuleSet";

export function Canvas(props: { ruleset: RuleSet }) {
  const mouse = new Mouse();
  const world = new World(60, 40, props.ruleset);
  let canvas: HTMLCanvasElement;

  React.useEffect(() => {
    if (!canvas) {
      canvas = document.getElementById("dunes") as HTMLCanvasElement;
      canvas.width = world.width;
      canvas.height = world.height;
      canvas.oncontextmenu = (event) => event.preventDefault();
      console.log("adding listeners");
      canvas.addEventListener("mousemove", (event: MouseEvent) => mouse.onMove(event, canvas));
      canvas.addEventListener("mousedown", (event: MouseEvent) => mouse.onClick(event));
      window.addEventListener("mouseup", () => mouse.onRelease());
    }

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    let mounted = true;
    let lastTime = 0;
    const redraw = (time: number) => {
      if (!mounted) return;
      requestAnimationFrame(redraw);
      mouse.interact(world);
      world.draw(context);

      const FPS = 60;
      const elapsed = time - lastTime;
      if (elapsed < 1000 / FPS) return;
      lastTime = time;

      world.update();
    };
    requestAnimationFrame(redraw);
    return () => {
      mounted = false;
    };
  }, []);

  const { theme } = useTheme();
  const style = getStyle();
  return <canvas id="dunes" style={{ ...style.canvas, imageRendering: "pixelated" }}></canvas>;

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
