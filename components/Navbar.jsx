import { useState } from "react";
import Image from "next/image";
import logo from "../public/CondominiosParaiso.png";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-rgb-22-21-38 py-4 px-6 flex justify-between items-center">
      <div>
        {" "}
        {/* Agrega este contenedor div */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo-Condominios-Paraiso"
            width={80}
            height={80}
          />
        </div>
      </div>

      <button
        className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Accesar
      </button>
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}
    </nav>
  );
}
