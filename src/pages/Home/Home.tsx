import { useEffect } from "react";
import { useSectionPager } from "../../hooks/useSectionPager";
import { Section } from "./Section";

const projects = [
  {
    id: "about",
    title: "Zaky",
    description:
      "I design products that make complexity feel simple. Bridging creative vision and technical execution to craft experiences that just work.",
    link: "/about",
    dark: true,
    reverse: false,
  },
  {
    id: "shopstream",
    title: "Shopstream",
    description:
      "A live-shopping e-commerce platform. Seamless journey from discovery to checkout with real-time interaction.",
    link: "/shopstream",
    dark: true,
    reverse: false,
  },
  {
    id: "fittrack",
    title: "FitTrack (Run)",
    description:
      "Fitness tracking app with clear data viz and motivational elements.",
    link: "/fit-track",
    dark: true,
    reverse: false,
  },
  {
    id: "webnovel",
    title: "Web Novel",
    description:
      "An immersive reading platform with customizable themes and smooth navigation.",
    link: "/web-novel",
    dark: true,
    reverse: false,
  },
  {
    id: "lastproject",
    title: "Last Project",
    description:
      "A conceptual exploration of future UI patterns with a bold visual identity.",
    link: "/last-project",
    dark: true,
    reverse: false,
  },
];

export const Home = () => {
  const { goToIndex } = useSectionPager({
    enableControls: true,
    infinite: true, // still useful for wheel/keys
    loopSeamless: true, // custom option (handled below)
  });

  // On mount, jump to the FIRST real slide (index 1)
  useEffect(() => {
    const el = document.getElementById("mainContainer");
    if (!el) return;
    // jump without animation so user never sees clone
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
