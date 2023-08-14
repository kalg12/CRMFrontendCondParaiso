import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver"; // Para descargar el archivo

const API = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/api/prospects";

const List = () => {
  const [prospects, setProspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prospectsPerPage, setProspectsPerPage] = useState(5); // Estado para la cantidad de usuarios por página
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const generateExcelFile = async (prospects) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Prospects");

    // Agregar encabezados
    worksheet.addRow([
      "Nombre",
      "Apellido",
      "Correo",
      "Teléfono",
      "Origen",
      "Fecha de Creación",
    ]);

    // Agregar datos de los prospectos
    prospects.forEach((prospect) => {
      worksheet.addRow([
        prospect.name,
        prospect.lastName,
        prospect.email,
        prospect.phoneNumber,
        prospect.source,
        prospect.createdAt instanceof Date
          ? prospect.createdAt.toLocaleDateString("es-ES")
          : "", // Formatear la fecha si es un objeto Date
      ]);
    });

    // Guardar el archivo y descargarlo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "prospects.xlsx");
  };

  useEffect(() => {
    const getProspects = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        };
        const response = await axios.get(`${API}${endpoint}`, config);
        setProspects(response.data.prospectos);
      } catch (error) {
        swal("Error", error.message, "error");
      }
    };

    getProspects();
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProspectsPerPageChange = (event) => {
    setProspectsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reiniciar la página al cambiar la cantidad de usuarios por página
  };

  const searchTermLowerCase = searchTerm.toLowerCase();

  const sortedProspects = [...prospects].sort((a, b) => {
    const compareValue = sortOrder === "asc" ? 1 : -1;
    if (sortKey === "phoneNumber") {
      return compareValue * (a[sortKey] - b[sortKey]);
    }

    const aValue = a[sortKey] || "";
    const bValue = b[sortKey] || "";

    return aValue.localeCompare(bValue) * compareValue;
  });

  const filteredProspects = sortedProspects.filter(
    (prospect) =>
      prospect.name.toLowerCase().includes(searchTermLowerCase) ||
      prospect.lastName.toLowerCase().includes(searchTermLowerCase) ||
      prospect.email.toLowerCase().includes(searchTermLowerCase) ||
      (prospect.phoneNumber &&
        prospect.phoneNumber.includes(searchTermLowerCase)) ||
      prospect.source.toLowerCase().includes(searchTermLowerCase) ||
      format(prospect.createdAt, "dd/MM/yy").includes(searchTermLowerCase)
  );

  const indexOfLastProspect = currentPage * prospectsPerPage;
  const indexOfFirstProspect = indexOfLastProspect - prospectsPerPage;
  const prospectsToShow = filteredProspects.slice(
    indexOfFirstProspect,
    indexOfLastProspect
  );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="flex justify-between items-center mb-4">
        {" "}
        {/* Añadir items-center para centrar verticalmente */}
        <h2 className="text-2xl font-semibold">Listado de Prospectos</h2>
        <div className="flex items-center space-x-2">
          {" "}
          {/* Agregar contenedor para el combo list */}
          <label htmlFor="perPage">Usuarios por página:</label>
          <select
            id="perPage"
            name="perPage"
            className="px-2 py-1 border rounded"
            onChange={handleProspectsPerPageChange}
            value={prospectsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <button
          onClick={() => generateExcelFile(prospectsToShow)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Descargar Excel
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Nombre
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("lastName")}
              >
                Apellido
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Correo
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("phoneNumber")}
              >
                Teléfono
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("source")}
              >
                Origen
              </th>
              <th
                className="py-2 px-4 text-left cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Fecha de Creación
              </th>
            </tr>
          </thead>
          <tbody>
            {prospectsToShow.map((prospect) => (
              <tr key={prospect._id} className="border-t">
                <td className="py-2 px-4">{prospect.name}</td>
                <td className="py-2 px-4">{prospect.lastName}</td>
                <td className="py-2 px-4">{prospect.email}</td>
                <td className="py-2 px-4">{prospect.phoneNumber}</td>
                <td className="py-2 px-4">{prospect.source}</td>
                <td className="py-2 px-4">
                  {format(new Date(prospect.createdAt), "dd/MM/yy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredProspects.length / prospectsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
