import { useDimensions } from "@/hook/use-dimensions";
import { useRef } from "react";
import { VoronoiBackground } from "./VoronoiBackground";

export const HeaderSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(ref);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
        }}
        ref={ref}
      >
        <VoronoiBackground width={width} height={height} />
      </div>
      <h1 className="]" style={{ fontSize: 80 }}>
        The Dataviz Corner
      </h1>
      <p>an aggregator of dataviz blogs</p>
    </div>
  );
};
