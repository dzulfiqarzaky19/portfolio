import { useRef } from "react";
import { HeaderLayout } from "../../components/HeaderLayout";
import { ABOUT_CONST } from "../../libs/const/About";
import { useInView, motion } from "framer-motion";
import { router } from "../../app/router";
import { HOME_CONST } from "../../libs/const/Home";

const About = () => {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const footerInView = useInView(footerRef, { initial: false });

  if (footerInView) {
    console.log("Footer is in view");

    router.navigate("/?section=" + encodeURIComponent(HOME_CONST[1].id), {
      replace: true,
    });
  }

  return (
    <motion.div
      exit={{
        background: "red",
      }}
    >
      <HeaderLayout
        title={ABOUT_CONST.header.title}
        description={ABOUT_CONST.header.description}
      />
      {ABOUT_CONST.body && (
        <section
          aria-labelledby="experience-heading"
          className="w-full max-w-5xl mx-auto px-4 md:px-8"
        >
          <h2
            id="experience-heading"
            className="font-display text-4xl md:text-5xl font-bold leading-tight text-amber-600 mt-6 md:mt-10"
          >
            {ABOUT_CONST.body.experience.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mt-6 md:mt-10">
            {ABOUT_CONST.body.experience.data.map((item) => (
              <article key={item.title} className="flex flex-col gap-3">
                <div
                  className="
                    w-full h-64 md:h-72 rounded-xl 
                    bg-[color:var(--color-card)]
                    shadow-sm
                  "
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-2 text-[color:var(--color-text-secondary)]">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <strong className="font-display text-xl md:text-2xl font-bold leading-tight text-amber-600">
                      {item.title}
                    </strong>
                    <span aria-hidden="true" className="opacity-40">
                      |
                    </span>
                    <strong className="font-display text-lg md:text-xl font-semibold leading-tight text-amber-600">
                      {item.company.name}
                    </strong>
                  </div>

                  {item.subTitle && (
                    <p className="font-medium text-[color:var(--color-primary)]">
                      {item.subTitle}
                    </p>
                  )}

                  {item.stacks?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.stacks.map((stack) => (
                        <span
                          key={stack}
                          className="
                            px-2 py-1 text-sm
                            bg-slate-500
                            text-[color:var(--color-card-inverse)]
                          "
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-base md:text-lg leading-relaxed text-[color:var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="p-72 bg-(--color-bg) mt-24" />

      <div ref={footerRef} className="pt-29" />
    </motion.div>
  );
};

export default About;
