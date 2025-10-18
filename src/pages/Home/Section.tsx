import { Link } from "react-router-dom";

type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
};

type DataClone = "head" | "tail";

interface ISectionProps {
  project: Project;
  dataClone?: DataClone;
  idOverride?: string;
}

export const Section = ({ project, dataClone, idOverride }: ISectionProps) => {
  const { id, title, description, link } = project;

  const isEven = ["fittrack", "lastproject"].includes(id);

  return (
    <section
      id={idOverride ?? id}
      data-clone={dataClone ?? ""}
      className={`section ${
        id !== "about" && id !== "fittrack" && id !== "lastproject"
          ? "bg-card-dark"
          : ""
      }`}
    >
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
        <div
          className={`flex flex-col gap-4 ${
            isEven ? "order-last md:order-first" : ""
          }`}
        >
          <h2 className="text-white font-display text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h2>
          <p className="text-text-secondary-dark text-base md:text-lg leading-normal">
            {description}
          </p>
          <Link
            to={link}
            className="rounded-lg h-12 px-5 bg-primary text-card-dark font-bold grid place-items-center hover:opacity-90"
          >
            {id === "about" ? "Read Profile →" : "Case Study"}
          </Link>
        </div>
        {id !== "about" && (
          <div className="w-full h-96 rounded-xl bg-card-dark" />
        )}
      </div>
    </section>
  );
};
