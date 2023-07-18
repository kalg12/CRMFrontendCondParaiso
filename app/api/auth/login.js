import axios from "axios";
const endPoint = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";
console.log(endPoint);

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(endPoint, {
      email,
      password,
    });
    /* Agregamos lógica para redireccionar si el status es 201 a http://localhost:3000/admin */
    if (response.status === 201) {
      window.location.href = "http://localhost:3000/admin";
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default loginUser;
