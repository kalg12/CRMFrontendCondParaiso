import heroImage from "../public/heroimage.svg";

const Hero = () => {
  return (
    <section
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(${heroImage.src})`,
        maxHeight: "600px",
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex-col m-9">
          <h1 className="text-4xl font-bold text-white">
            Sistema de control de prospectos
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
