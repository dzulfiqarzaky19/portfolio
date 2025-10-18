import { Button } from "../components/Button";

const WebNovel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
      <div className="w-full h-96 rounded-xl bg-card-dark" />
      <div className="flex flex-col gap-4">
        <h2 className="text-white font-display text-4xl md:text-5xl font-bold leading-tight">
          Web Novel
        </h2>
        <p className="text-text-secondary-dark text-base md:text-lg leading-normal">
          An immersive reading platform with customizable themes and smooth
          navigation.
        </p>
        <Button>Case Study</Button>
      </div>
    </div>
  );
};

export default WebNovel;
