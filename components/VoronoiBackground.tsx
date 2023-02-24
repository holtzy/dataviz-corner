// Video to understand perlin Noise: https://www.youtube.com/watch?v=ikwNrFvnL3g

import * as d3 from "d3";
import { Delaunay } from "d3";
import { useEffect, useMemo, useRef, useState } from "react";
import Perlin from "utils/perlin";

//
// Create initial dataset
// 300 evenly-spaced points
//
const gapSize = 40; // space in px between 2 data points

//
// A component that initialize the dataset and render the graph.
// Then create a loop to update the perlin offset progressively.
//
const OFFSET_STEP = 0.0008; // if offset_step is higher, we move each time to a step that is further in the perlin noise, thus more different. It results in an animation that looks faster.

type VoronoiBackgroundProps = {
  width: number;
  height: number;
};

export const VoronoiBackground = ({ width, height }: VoronoiBackgroundProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOffset(offset + OFFSET_STEP);
    }, 10);
  }, [offset]);

  return (
    <div>
      {/* <Graph offset={offset} data={data} width={width} height={height} /> */}
      <VoronoiGraph offset={offset} width={width} height={height} />
    </div>
  );
};

//
// Initialize a perlin noise calculator
// perlin.perlin2(0.1, 0.3) --> 0.1648953425443803
//
const perlin = new Perlin(Math.random());
const noiseFactor = 0.003;

//
// renderer: just draw the final output based on the perline Noise Value and an offset
//
type VoronoiGraphProps = {
  offset: number;
  width: number;
  height: number;
};

const VoronoiGraph = ({ offset, width, height }: VoronoiGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create n data points randomly located on the canvas
  const particles = useMemo(() => {
    return Array.from({ length: 8000 }, () => [Math.random() * width, Math.random() * height]);
  }, [width, height]);

  const voronoi = useMemo(() => {
    const delaunay = Delaunay.from(particles);
    return delaunay.voronoi([0, 0, width, height]);
  }, [particles]);

  // The perlin 2d algorythm return a values between -0.5 and -5. We want to map an opacity to this
  const opacityScale = d3.scaleLinear().domain([-0.5, 0.5]).range([0.01, 0.7]);
  const colorScale = d3
    .scaleLinear()
    .domain([-0.5, 0.2, 0.2])
    .range(["purple", "#36454F", "#04d9ff"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    particles.forEach((p, i) => {
      const perlinValue = perlin.perlin2(p[0] * noiseFactor + offset, p[1] * noiseFactor + offset);
      const opacity = opacityScale(perlinValue);

      ctx.globalAlpha = opacity;
      ctx.lineWidth = 0.5;
      ctx.fillStyle = colorScale(perlinValue);
      ctx.strokeStyle = "white";

      ctx.beginPath();
      voronoi.renderCell(i, ctx);
      ctx.stroke();
      ctx.fill();
    });
  }, [canvasRef.current, voronoi, offset]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

// const Graph = ({ offset, data, width, height }: GraphProps) => {
//   const color = d3.interpolateRainbow;

//   const allLines = data.map((item, i) => {
//     return (
//       <g
//         key={i}
//         style={{
//           transform: `translate(${item.x}px,${item.y}px)`,
//         }}
//       >
//         {/* <circle
//           cx={0}
//           cy={0}
//           r={
//             (gapSize / 2) *
//             Math.cos(
//               2 *
//                 Math.PI *
//                 perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
//             )
//           }
//           fill={color(
//             perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
//           )}
//         ></circle> */}
//         <line
//           x1={0}
//           y1={0}
//           stroke={color(
//             perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
//           )}
//           x2={
//             gapSize *
//             Math.sin(
//               2 *
//                 Math.PI *
//                 perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
//             )
//           }
//           y2={
//             gapSize *
//             Math.cos(
//               2 *
//                 Math.PI *
//                 perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset)
//             )
//           }
//           strokeWidth={2}
//           opacity={
//             perlin.perlin2(item.xVal * noiseFactor + offset, item.yVal * noiseFactor + offset) + 0.5
//           }
//         ></line>
//       </g>
//     );
//   });

//   return (
//     <div>
//       <svg width={width} height={height} className="svgContainer">
//         {allLines}
//       </svg>
//     </div>
//   );
// };
