import * as d3 from "d3";

type PillProps = {
  color: string;
  label: string;
  opacity?: number;
};

export const topics = [
  "R",
  "python",
  "d3",
  "react",
  "julia",
  "tableau",
  "news",
  "tech",
  "theory",
  "conference",
  "product",
  "data journalism",
  "scrollytelling",
] as const;

const topicColors = {
  R: d3.color("#2B3467")?.darker(2),
  python: d3.color("#BAD7E9")?.darker(2),
  d3: d3.color("#FCFFE7")?.darker(2),
  react: d3.color("#EB455F")?.darker(2),
  julia: d3.color("#10A19D")?.darker(2),
  tableau: d3.color("#540375")?.darker(2),
  news: d3.color("#FF7000")?.darker(2),
  tech: d3.color("#FFBF00")?.darker(2),
  theory: d3.color("#E14D2A")?.darker(2),
  conference: d3.color("#FD841F")?.darker(2),
  product: d3.color("#3E6D9C")?.darker(2),
  ["data journalism"]: d3.color("#3E6D9C")?.darker(2),
  scrollytelling: d3.color("#D58BDD")?.darker(2),
};

export const Pill = ({ label, color, opacity }: PillProps) => {
  const backgroundColor = topicColors[label] || "red";

  return (
    <button
      style={{ backgroundColor, opacity: opacity || 1 }}
      className="tracking-wider py-0 px-2 no-underline rounded-md text-white font-sans font-light text-xs mr-1 leading-5"
    >
      {label}
    </button>
  );
};
