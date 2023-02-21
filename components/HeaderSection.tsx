import { useDimensions } from "@/hook/use-dimensions";
import { useRef } from "react";
import { VoronoiBackground } from "./VoronoiBackground";
import styles from "./header-section.module.css";

export const HeaderSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useDimensions(ref);

  return (
    <div className={styles.heroContainer}>
      {/* Most below div is for voronoi */}
      <div ref={ref} className={styles.voronoiContainer}>
        <VoronoiBackground width={width} height={height} />
      </div>

      <div className="wrapper">
        <div style={{ height }} className="flex flex-col justify-center ">
          <h1 className={"z-10 font-bold text-7xl"}>Explore the Art of Data Visualization</h1>
          <br />
          <p className={"z-10 font-normal text-xl"}>
            The dataviz corner aggregates the best dataviz blogs and ship the result to your inbox
            every week. Simply.
          </p>
        </div>
      </div>
    </div>
  );
};
