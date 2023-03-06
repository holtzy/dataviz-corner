// Video to understand perlin Noise: https://www.youtube.com/watch?v=ikwNrFvnL3g

import * as d3 from "d3";
import { Delaunay } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import Perlin from "utils/perlin";

//
// Initialize a perlin noise calculator
// perlin.perlin2(0.1, 0.3) --> 0.1648953425443803
//
const perlin = new Perlin(Math.random());

const OFFSET_STEP = 0.0042; // if offset_step is higher, we move each time to a step that is further in the perlin noise, thus more different. It results in an animation that looks faster.
const NOISE_FACTOR = 0.003;
const PARTICLE_NUMBER = 1500;

type VoronoiBackgroundProps = {
  width: number;
  height: number;
};

/**
 *
 * A component that initialize the dataset and render the voronoi graph.
 * Then create a loop to update the perlin offset progressively.
 *
 */
export const VoronoiBackground = ({ width, height }: VoronoiBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create n data points randomly located on the canvas
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_NUMBER }, () => [
      Math.random() * width,
      Math.random() * height,
    ]);
  }, [width, height]);

  const voronoi = useMemo(() => {
    const delaunay = Delaunay.from(particles);
    return delaunay.voronoi([0, 0, width, height]);
  }, [particles]);

  // The perlin 2d algorythm return a values between -0.5 and -5. We want to map an opacity to this
  const opacityScale = d3.scaleLinear().domain([-0.9, 0.9]).range([0.1, 0.9]);
  const colorScale = d3
    .scaleLinear()
    .domain([-0.7, 0, 0.7])
    .range(["purple", "#36454F", "#04d9ff"]);

  useEffect(() => {
    let offset = 0;

    function step() {
      offset += OFFSET_STEP;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        const perlinValue = perlin.perlin2(
          Math.sin(p[0] * NOISE_FACTOR - offset),
          Math.cos(p[1] * NOISE_FACTOR - offset)
        );
        const opacity = 1; // opacityScale(perlinValue);

        ctx.globalAlpha = opacity;
        ctx.lineWidth = 0.5;
        ctx.fillStyle = colorScale(perlinValue);
        ctx.strokeStyle = "white";

        ctx.beginPath();
        voronoi.renderCell(i, ctx);
        ctx.stroke();
        ctx.fill();
      });

      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }, [canvasRef.current, voronoi]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
