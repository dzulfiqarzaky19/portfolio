import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { PulseButton } from "../../components/animation/PulseAnimation";

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  image?: string;
};

type Props = {
  project: Project;
  dataClone?: "head" | "tail";
  idOverride?: string;
};

export const Section = React.memo(function Section({
  project,
  dataClone,
  idOverride,
}: Props) {
  const { id, title, description, link, image } = project;
  const domId = idOverride ?? id;
  const isAbout = id === "about";
  const headingId = `${domId}-heading`;

  const containerClass = `
    h-full w-full max-w-7xl mx-auto px-4 md:px-8
    grid ${isAbout ? "grid-rows-[1fr_auto]" : "md:grid-cols-2"} 
    gap-8 md:gap-16 items-center
  `;

  return (
    <section
      id={domId}
      data-clone={dataClone ?? ""}
      className="section relative z-0"
      role="region"
      aria-labelledby={headingId}
    >
      <div className={containerClass}>
        {!isAbout && (
          <div
            className="
    relative z-10 
    rounded-xl bg-amber-300 overflow-hidden
    aspect-[4/3] md:aspect-[16/9]
    grid place-items-center
    p-5 md:p-4
    mt-[calc(env(safe-area-inset-top)+var(--header-h,64px)+8px)] md:mt-0
  "
          >
            <Link
              to={link}
              aria-label={`Open ${title} case study`}
              className="block pointer-events-auto"
            >
              <img
                src={image}
                alt={`${title} preview`}
                width={1280}
                height={720}
                className="max-w-full w-full md:max-h-[32rem] max-h-[24rem] object-contain"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </Link>
          </div>
        )}

        <div
          className={`order-2 md:order-1 flex flex-col gap-4 ${
            isAbout ? "row-start-1 row-end-1 justify-center text-center" : ""
          }`}
        >
          <h2
            id={headingId}
            className="text-white font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-tight"
          >
            {title}
          </h2>

          <p className="text-text-secondary-dark text-base md:text-xl leading-normal">
            {description}
          </p>

          {!isAbout && <PulseButton to={link}>Case Study</PulseButton>}
        </div>

        {isAbout && (
          <div className="row-start-2 row-end-2 flex items-end justify-center pb-[calc(env(safe-area-inset-bottom)+24px)]">
            <Link
              to={link}
              className=" inline-flex items-center justify-center gap-2 h-12 min-h-[44px] px-5 rounded-lg
                         font-bold text-text-primary-dark "
              aria-label="Learn more about me"
              data-pager-exempt
              onPointerDownCapture={(e) => e.stopPropagation()}
              onPointerUpCapture={(e) => e.stopPropagation()}
              onClickCapture={(e) => e.stopPropagation()}
            >
              <span>Knows me</span>
              <ChevronDown width={20} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
});
