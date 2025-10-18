import { Button } from "../components/Button";

const About = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 @container text-center md:text-left">
      <div className="flex flex-col items-center md:items-start gap-6">
        <h1 className="text-white text-6xl md:text-8xl font-display font-bold leading-tight tracking-tight">
          Zaky
        </h1>
        <p className="text-text-secondary-dark text-lg max-w-2xl">
          I design products that make complexity feel simple. Bridging creative
          vision and technical execution to craft experiences that just work.
        </p>
        <div className="flex gap-3">
          <a href="/Zaky-CV.pdf" className="inline-block">
            <Button>Download CV</Button>
          </a>
          <a href="#shopstream" className="inline-block">
            <Button variant="outline">See Work</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
