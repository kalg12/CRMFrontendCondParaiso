import axios from "axios";
const endPoint = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";
console.log(endPoint);

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(endPoint, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    if (response.status === 201) {
      window.location.href = "http://localhost:3000/admin";
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default loginUser;
