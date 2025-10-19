import { useEffect } from "react";
import { useSectionPager } from "../../hooks/useSectionPager";
import { Section } from "./Section";
import { projects } from "./const";

export const Home = () => {
  const { goToIndex } = useSectionPager({
    enableControls: true,
    infinite: true,
    loopSeamless: true,
  });

  useEffect(() => {
    goToIndex(1, "auto");
  }, [goToIndex]);

  const head = projects[0];
  const tail = projects[projects.length - 1];

  return (
    <main id="mainContainer" className="main-container">
      <Section
        project={tail}
        dataClone="tail"
        idOverride={`${tail.id}-clone-tail`}
      />

      {projects.map((project) => (
        <Section key={project.id} project={project} />
      ))}

      <Section
        project={head}
        dataClone="head"
        idOverride={`${head.id}-clone-head`}
      />
    </main>
  );
};
