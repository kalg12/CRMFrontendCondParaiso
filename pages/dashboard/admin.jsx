import Image from "next/image";
import "tailwindcss/tailwind.css";

const admin = () => {
  return (
    <div className="flex">
      {/* Panel lateral */}
      <div className="w-1/4 bg-gray-200">
        {/* Botones */}
        <div className="p-4">
          <button className="block p-2 mb-2 rounded-lg bg-blue-500 text-white">
            Botón 1
          </button>
          <button className="block p-2 mb-2 rounded-lg bg-blue-500 text-white">
            Botón 2
          </button>
          <button className="block p-2 mb-2 rounded-lg bg-blue-500 text-white">
            Botón 3
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-grow bg-gray-100">
        {/* Barra de navegación */}
        <div className="h-16 bg-white flex items-center justify-between px-4">
          {/* Foto de usuario */}
          <div className="flex items-center">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Foto de usuario"
              className="h-8 w-8 rounded-full"
              width={50}
              height={50}
            />
            <span className="ml-2">Nombre de usuario</span>
          </div>
          {/* Otros elementos de la barra de navegación */}
        </div>

        {/* Contenido principal de la página */}
        <div className="p-4">
          {/* Cuadros de datos estadísticos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Estadística 1</h2>
              <p className="text-gray-500">Datos estadísticos</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Estadística 2</h2>
              <p className="text-gray-500">Datos estadísticos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default admin;
