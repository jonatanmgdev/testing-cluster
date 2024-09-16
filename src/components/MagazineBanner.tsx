import React from "react";

interface MagazineBannerProps {
  mobileImage: string;
  tabletBackground: string;
  desktopBackground: string;
  title: string;
  description: string;
}

export const MagazineBanner = (props: MagazineBannerProps) => {
  const {
    mobileImage,
    tabletBackground,
    desktopBackground,
    title,
    description,
  } = props;

  const magazineContent = (title: string, description: string) => {
    return (
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6 font-bold">{description}</p>
        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 space-y-2 md:space-y-0 md:text-left text-center">
          <select className="border border-gray-300 rounded-md p-2">
            <option>¿Dónde te encuentras?</option>
            <option>España</option>
            <option>Latinoamérica</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 min-w-40 rounded-md">
            Acceder
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="hidden lg:flex container px-0 rounded-3xl"
        style={{
          backgroundImage: `url(${desktopBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col md:flex-row bg-white/40 max-w-[450px] lg:max-w-[550px] rounded-r-3xl p-8 md:p-10">
            <div className="w-full">{magazineContent(title, description)}</div>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block lg:hidden container px-0 rounded-3xl"
        style={{
          backgroundImage: `url(${tabletBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Container para manejar el espaciado lateral */}
        <div className="flex flex-col w-full">
          <div className="relative flex flex-col md:flex-row bg-white/40 max-w-[450px] rounded-3xl p-8 md:p-10">
            {/* Columna de texto */}
            <div className="w-full">{magazineContent(title, description)}</div>
          </div>
        </div>
      </div>
      <div className="md:hidden container">
        <img src={mobileImage} alt="Banner" width={550} height={300} />
        {magazineContent(title, description)}
      </div>
    </div>
  );
};
