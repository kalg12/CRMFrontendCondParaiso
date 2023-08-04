import React, { useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/api/prospects";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    source: "Facebook",
    status: "Contactado",
    assignedTo: "",
    demographics: {
      age: "",
      gender: "Otro",
      location: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDemographicsChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      demographics: {
        ...formData.demographics,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProspect();
  };

  const handleAddProspect = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      };

      const response = await axios.post(`${API}${endpoint}`, formData, config);
      // Manejar la respuesta si es necesario
      console.log(response.data);
    } catch (error) {
      // Manejar el error si ocurre
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Agregar Prospecto</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber">Teléfono:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="source">Fuente:</label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            >
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="TikTok">TikTok</option>
              <option value="Físicamente">Físicamente</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status">Estado:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            >
              <option value="Contactado">Contactado</option>
              <option value="Interesado">Interesado</option>
              <option value="En proceso">En proceso</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Descartado">Descartado</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo">Asignado a:</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.demographics.age}
              onChange={handleDemographicsChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender">Género:</label>
            <select
              id="gender"
              name="gender"
              value={formData.demographics.location}
              onChange={handleDemographicsChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="location">Ubicación:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.demographics.location}
              onChange={handleDemographicsChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Prospecto
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
