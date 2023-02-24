import { topics } from "utils/types";
import { Pill } from "./Pill";

type TopicPillsProps = {};

export const TopicPills = ({}: TopicPillsProps) => {
  const allPills = topics.map((topic, i) => {
    return (
      <div key={i}>
        <Pill label={topic} />
      </div>
    );
  });

  return <div className="flex flex-wrap">{allPills}</div>;
};
