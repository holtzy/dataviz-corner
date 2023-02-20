import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";
import Perlin from "Utils/perlin";

const offset = 0;
const noiseFactor = 0.05;

const width = 600;
const height = 500;

export default function Home() {
  const data = getData();

  const [offset, setOffset] = useState(0);

  console.log(" ----", offset);
  useEffect(() => {
    setTimeout(() => {
      setOffset(offset + 0.01);
    }, 100);
  }, [offset]);

  // while (true) {
  //   setTimeout(() => {
  //     console.log(offset);
  //     //   setOffset(offset + 0.01);
  //   }),
  //     1000;
  // }
  // for (let i = 0; i < 100; i++) {
  //   setTimeout(() => {
  //     console.log(i);
  //   }, 10000);
  // }

  return (
    <div onClick={() => setOffset(offset + 0.1)}>
      <Graph offset={offset} data={data} />
    </div>
  );
}

// renderer
type GraphProps = {
  offset: number;
  data: {
    x: number;
    xVal: number;
    y: number;
    yVal: number;
  }[];
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
        <line
          x1={0}
          y1={0}
          stroke={color(
            n.perlin2(
              item.xVal * noiseFactor + offset,
              item.yVal * noiseFactor + offset
            )
          )}
          x2={
            gapSize *
            Math.sin(
              2 *
                Math.PI *
                n.perlin2(
                  item.xVal * noiseFactor + offset,
                  item.yVal * noiseFactor + offset
                )
            )
          }
          y2={
            gapSize *
            Math.cos(
              2 *
                Math.PI *
                n.perlin2(
                  item.xVal * noiseFactor + offset,
                  item.yVal * noiseFactor + offset
                )
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

// Create initial dataset
// 300 evenly-spaced points
const gapSize = 30;
const n = new Perlin(Math.random());

const getData = () => {
  const noiseFactor = 0.4;

  const xCount = Math.floor(width / gapSize),
    yCount = Math.floor(height / gapSize),
    numPoints = xCount * yCount;

  const d = d3.range(numPoints).map((i) => {
    const xVal = i % xCount,
      x = xVal * gapSize,
      yVal = Math.floor(i / xCount),
      y = yVal * gapSize,
      value = n.perlin2(x / (width * noiseFactor), y / (height * noiseFactor));

    return { x, xVal, y, yVal };
  });

  return d;
};
