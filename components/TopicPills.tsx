import { topics } from "@/Utils/types";
import { Pill } from "./Pill";

type TopicPillsProps = {};

export const TopicPills = ({}: TopicPillsProps) => {
  const allPills = topics.map((topic, i) => {
    return (
      <div key={i}>
        <Pill label={topic} opacity={0.7} color={"red"} />
      </div>
    );
  });

  return <div className="flex flex-wrap">{allPills}</div>;
};
