import { useSectionPager } from "../hooks/useSectionPager";
const ids = ["about", "shopstream", "fittrack", "webnovel", "lastproject"];

export const NavDots = () => {
  const { index, goToIndex, realCount } = useSectionPager({
    enableControls: false,
    infinite: true,
    loopSeamless: true,
  });

  const total = realCount;
  const logical = (() => {
    if (index === 0) return total - 1;
    if (index === total + 1) return 0;
    return Math.max(0, Math.min(index - 1, total - 1));
  })();

  return (
    <div className="hidden md:flex flex-col gap-6 fixed top-1/2 -translate-y-1/2 right-8 z-10">
      {ids.map((id, i) => (
        <button
          key={id}
          onClick={() => goToIndex(i + 1)} // +1 because of leading clone
          className={`w-3 h-3 rounded-full border-2 transition-all ${
            i === logical
              ? "border-primary bg-primary"
              : "border-text-secondary-dark"
          }`}
          aria-label={`Go to ${id}`}
        />
      ))}
    </div>
  );
};
