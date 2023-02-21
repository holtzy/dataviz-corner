// Video to understand perlin Noise: https://www.youtube.com/watch?v=ikwNrFvnL3g

import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";
import Perlin from "Utils/perlin";

//
// Create initial dataset
// 300 evenly-spaced points
//
const width = 600;
const height = 500;
const gapSize = 20; // space in px between 2 data points

type Data = {
  x: number; // used to translate the shape later on
  xVal: number;
  y: number;
  yVal: number;
}[];

const getData = (): Data => {
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
const OFFSET_STEP = 0.008; // if offset_step is higher, we move each time to a step that is further in the perlin noise, thus more different. It results in an animation that looks faster.

export default function Home() {
  const data = getData();

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOffset(offset + OFFSET_STEP);
    }, 50);
  }, [offset]);

  return (
    <div>
      <Graph offset={offset} data={data} />
    </div>
  );
}

//
// Initialize a perlin noise calculator
// perlin.perlin2(0.1, 0.3) --> 0.1648953425443803
//
const perlin = new Perlin(Math.random());

const noiseFactor = 0.05;

//
// renderer: just draw the final output based on the perline Noise Value and an offset
//
type GraphProps = {
  offset: number;
  data: Data;
};

const Graph = ({ offset, data }: GraphProps) => {
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
