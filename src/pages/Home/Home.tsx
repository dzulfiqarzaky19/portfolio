// Home.tsx
import { useEffect } from "react";
import { useSectionPager } from "../../hooks/useSectionPager";
import { Section } from "../../features/Home/Section";
import { useLocation } from "react-router-dom";
import { HOME_CONST } from "../../libs/const/Home";

export const Home = () => {
  const { goToIndex, ready } = useSectionPager();
  const { search } = useLocation();

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams(search);
    const sectionId = params.get("section");
    if (sectionId) {
      const realIdx = HOME_CONST.findIndex((p) => p.id === sectionId);
      if (realIdx >= 0) {
        goToIndex(realIdx + 1, "auto");
        return;
      }
    }

    goToIndex(1, "auto");
  }, [ready, goToIndex, search]);

  const head = HOME_CONST[0];
  const tail = HOME_CONST[HOME_CONST.length - 1];

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

      {HOME_CONST.map((p) => (
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
