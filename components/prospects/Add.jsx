import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { City } from "country-state-city";

const API = process.env.NEXT_PUBLIC_API_URL;
const endpoint = "/api/prospects";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    source: "",
    status: "",
    assignedTo: "",
    notes: "",
    demographics: {
      age: "",
      gender: "",
      location: "",
    },
  });
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [sendingForm, setSendingForm] = useState(false);

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
    if (isValidPhoneNumber(formData.phoneNumber)) {
      handleAddProspect();
    } else {
      swal({
        icon: "error",
        title: "Error",
        text: "El número telefónico debe tener 10 dígitos",
      });
    }
  };

  const handleAddProspect = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      };

      setSendingForm(true);

      await axios.post(`${API}${endpoint}`, formData, config);

      // Mostrar SweetAlert de éxito y limpiar el formulario
      swal({
        icon: "success",
        title: "Éxito",
        text: "Prospecto agregado exitosamente",
      }).then(() => {
        setSendingForm(false); // Restablecer el estado de sendingForm a false
        setFormData({
          name: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          source: "Facebook",
          status: "Contactado",
          assignedTo: "",
          notes: "",
          demographics: {
            age: "",
            gender: "Otro",
            location: "",
          },
        });
      });
    } catch (error) {
      // Verificar si el error se debe a un correo electrónico duplicado
      if (error.response.data.error.includes("duplicate key error")) {
        const duplicateEmail = error.response.data.error.match(/\"(.+?)\"/)[1];
        swal({
          icon: "error",
          title: "Error",
          text: `El correo electrónico ${duplicateEmail} ya está registrado`,
        });
      } else {
        swal({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al agregar el prospecto",
        });
      }
    }
  };

  /* Cities Handles */

  const handleLocationChange = (e) => {
    const { value } = e.target;
    const suggestions = City.getCitiesOfCountry("MX").filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    setLocationSuggestions(suggestions);
    handleDemographicsChange(e); // Actualizar el estado demographics
  };

  const handleLocationSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      demographics: {
        ...prevData.demographics,
        location: value,
      },
    }));
    setLocationSuggestions([]); // Limpiar sugerencias
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Validar que el número tenga 10 dígitos
    return /^\d{10}$/.test(phoneNumber);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        };

        const response = await axios.get(`${API}/api/employeds`, config);
        setEmployees(response.data);
        setIsLoadingEmployees(false); // Marcar que los empleados han terminado de cargar
      } catch (error) {
        setIsLoadingEmployees(false); // Manejar el error y marcar que los empleados han terminado de cargar
      }
    };

    fetchEmployees();
  }, []);

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
              <option value="" disabled>
                Elegir opción...
              </option>
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
              <option value="" disabled>
                Elegir opción...
              </option>
              <option value="Contactado">Contactado</option>
              <option value="Interesado">Interesado</option>
              <option value="En proceso">En proceso</option>
              <option value="Cerrado">Cerrado</option>
              <option value="Descartado">Descartado</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="assignedTo">Asignado a:</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
              disabled={isLoadingEmployees} // Deshabilitar el menú mientras se cargan los empleados
            >
              <option value="">Seleccionar empleado...</option>
              {isLoadingEmployees ? (
                <option value="" disabled>
                  Loading...
                </option> // Mostrar mensaje de carga mientras se cargan los empleados
              ) : (
                employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name} {employee.lastName}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="notes">Notas:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 w-full"
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
              value={formData.demographics.gender}
              onChange={handleDemographicsChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            >
              <option value="" disabled>
                Elegir opción...
              </option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="location">Ubicación:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.demographics.location}
              onChange={handleLocationChange}
              className="border border-gray-300 px-3 py-2 w-full"
              required
            />
            {locationSuggestions.length > 0 && (
              <ul className="bg-white border border-gray-300 mt-2">
                {locationSuggestions.map((city) => (
                  <li
                    key={city.id}
                    className="cursor-pointer px-3 py-1 hover:bg-gray-100"
                    onClick={() => handleLocationSelect(city.name)}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isLoadingEmployees || sendingForm} // Deshabilitar el botón mientras se cargan los empleados o se envía el formulario
            >
              {sendingForm ? "Cargando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
