import Image from "next/image";
import logo from "../public/CondominiosParaiso.png";

export default function Navbar() {
  return (
    <nav className="bg-rgb(22, 21, 38) py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src={logo}
          alt="Logo-Condominios-Paraiso"
          width={80}
          height={80}
        />
        <span className="text-black text-xl font-semibold ml-2">
          Sistema Control de Prospectos
        </span>
      </div>
      <button className="bg-slate-900 text-gray-800 py-2 px-4 rounded-md">
        Accesar
      </button>
    </nav>
  );
}
