const GenreBanner = ({ genre = "Action", description, image }) => {
  return (
    <div
      className="relative w-full bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize:"cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4">
          🎬 {genre}
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GenreBanner;
