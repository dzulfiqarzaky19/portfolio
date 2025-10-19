// Home.tsx
import { useEffect } from "react";
import { useSectionPager } from "../../hooks/useSectionPager";
import { Section } from "./Section";
import { projects } from "./const";

export const Home = () => {
  const { goToIndex, ready } = useSectionPager();

  useEffect(() => {
    if (ready) goToIndex(1, "auto");
  }, [ready, goToIndex]);

  const head = projects[0];
  const tail = projects[projects.length - 1];

  return (
    <div
      id="mainContainer"
      className="main-container"
      role="region"
      aria-label="Projects carousel"
    >
      <Section
        project={tail}
        dataClone="tail"
        idOverride={`${tail.id}-clone-tail`}
      />
      {projects.map((p) => (
        <Section key={p.id} project={p} />
      ))}
      <Section
        project={head}
        dataClone="head"
        idOverride={`${head.id}-clone-head`}
      />
    </div>
  );
};
