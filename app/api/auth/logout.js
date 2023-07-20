const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/";

  return;
};

export default logoutUser;
