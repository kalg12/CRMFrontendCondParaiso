const getSaludo = () => {
  const horaActual = new Date().getHours();
  let saludo = "";

  if (horaActual >= 5 && horaActual < 12) {
    saludo = "Buenos días";
  } else if (horaActual >= 12 && horaActual < 18) {
    saludo = "Buenas tardes";
  } else if (horaActual >= 18 && horaActual < 24) {
    saludo = "Buenas noches";
  } else {
    saludo = "Buenas madrugadas";
  }

  return saludo;
};

module.exports = getSaludo;
