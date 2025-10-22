interface IHeaderLayout {
  title: string;
  description: string;
}

export const HeaderLayout = ({ title, description }: IHeaderLayout) => (
  <section
    id="about"
    role="region"
    aria-labelledby="about-heading"
    className="min-h-[80dvh] grid place-items-center px-4 md:px-8 bg-(--color-bg)"
  >
    <div className="w-full max-w-7xl">
      <div className="mx-auto max-w-7xl text-center flex flex-col gap-4">
        <h2
          id="about-heading"
          className="text-white font-display text-[clamp(2rem,6vw,5rem)] font-bold leading-tight"
        >
          {title}
        </h2>

        <p className="text-text-secondary-dark text-base md:text-xl leading-normal">
          {description}
        </p>
      </div>
    </div>
  </section>
);
