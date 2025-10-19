import { useSectionPager } from "../hooks/useSectionPager";
import { projects } from "../pages/Home/const";

export const NavDots = () => {
  const { index, goToIndex, realCount } = useSectionPager();

  const total = realCount;
  const logical = (() => {
    if (index === 0) return total - 1;
    if (index === total + 1) return 0;
    return Math.max(0, Math.min(index - 1, total - 1));
  })();

  return (
    <div
      className="hidden md:flex flex-col gap-6 fixed top-1/2 -translate-y-1/2 right-8 z-10
                 pointer-events-none"
    >
      {projects.map((project, i) => (
        <button
          key={project.id}
          onClick={() => goToIndex(i + 1)}
          className={`pointer-events-auto w-3 h-3 rounded-full border-2 transition-all ${
            i === logical
              ? "border-primary bg-primary"
              : "border-text-secondary-dark"
          }`} // ⬅️ only the buttons are interactive
          aria-label={`Go to ${project.id}`}
        />
      ))}
    </div>
  );
};
