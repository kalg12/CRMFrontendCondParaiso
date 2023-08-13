import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { format } from "date-fns";

const API = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/api/prospects";

const List = () => {
  const [prospects, setProspects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prospectsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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
