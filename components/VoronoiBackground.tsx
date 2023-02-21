// Video to understand perlin Noise: https://www.youtube.com/watch?v=ikwNrFvnL3g

import * as d3 from "d3";
import { Delaunay } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import Perlin from "Utils/perlin";

//
// Create initial dataset
// 300 evenly-spaced points
//
const gapSize = 40; // space in px between 2 data points

type Data = {
  x: number; // used to translate the shape later on
  xVal: number;
  y: number;
  yVal: number;
}[];

const getData = (width: number, height: number): Data => {
  const xCount = Math.floor(width / gapSize);
  const yCount = Math.floor(height / gapSize);
  const numPoints = xCount * yCount;

  const data = d3.range(numPoints).map((i) => {
    const xVal = i % xCount,
      x = xVal * gapSize,
      yVal = Math.floor(i / xCount),
      y = yVal * gapSize;
    return { x, xVal, y, yVal };
  });

  return data;
};

//
// A component that initialize the dataset and render the graph.
// Then create a loop to update the perlin offset progressively.
//
const OFFSET_STEP = 0.004; // if offset_step is higher, we move each time to a step that is further in the perlin noise, thus more different. It results in an animation that looks faster.

type VoronoiBackgroundProps = {
  width: number;
  height: number;
};

export const VoronoiBackground = ({ width, height }: VoronoiBackgroundProps) => {
  const data = useMemo(() => getData(width, height), []);
  console.log("getDadta", data);

  const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOffset(offset + OFFSET_STEP);
  //   }, 0);
  // }, [offset]);

  return (
    <div>
      {/* <Graph offset={offset} data={data} width={width} height={height} /> */}
      <VoronoiGraph offset={1} data={data} width={width} height={height} />
    </div>
  );
};

//
// Initialize a perlin noise calculator
// perlin.perlin2(0.1, 0.3) --> 0.1648953425443803
//
const perlin = new Perlin(Math.random());

const noiseFactor = 0.045;

//
// renderer: just draw the final output based on the perline Noise Value and an offset
//
type GraphProps = {
  offset: number;
  data: Data;
  width: number;
  height: number;
};

const Graph = ({ offset, data, width, height }: GraphProps) => {
  const color = d3.interpolateRainbow;

  const allLines = data.map((item, i) => {
    return (
      <g
        key={i}
        style={{
          transform: `translate(${item.x}px,${item.y}px)`,
        }}
      >
        {/* <circle
          cx={0}
          cy={0}
          r={
            (gapSize / 2) *
            Math.cos(
              2 *
                Math.PI *
                perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
            )
          }
          fill={color(
            perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
          )}
        ></circle> */}
        <line
          x1={0}
          y1={0}
          stroke={color(
            perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
          )}
          x2={
            gapSize *
            Math.sin(
              2 *
                Math.PI *
                perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
            )
          }
          y2={
            gapSize *
            Math.cos(
              2 *
                Math.PI *
                perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
            )
          }
          strokeWidth={2}
          opacity={
            perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset) + 0.5
          }
        ></line>
      </g>
    );
  });

  return (
    <div>
      <svg width={width} height={height} className="svgContainer">
        {allLines}
      </svg>
    </div>
  );
};

//
// renderer: just draw the final output based on the perline Noise Value and an offset
//
type VoronoiGraphProps = {
  offset: number;
  data: Data;
  width: number;
  height: number;
};

const VoronoiGraph = ({ offset, data, width, height }: VoronoiGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = Array.from({ length: 1000 }, () => [
    Math.random() * width,
    Math.random() * height,
  ]);

  const delaunay = Delaunay.from(particles);

  const voronoi = delaunay.voronoi([0, 0, width, height]);
  console.log("data", data);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    voronoi.render(ctx);
    voronoi.renderBounds(ctx);
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }, [canvasRef.current]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
