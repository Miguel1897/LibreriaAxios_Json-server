const login = async () => {
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!user || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const adminResponse = await axios.get("http://localhost:3001/admin");
    const clientResponse = await axios.get("http://localhost:3001/clientes"); // Cambio aquí

    if (adminResponse.data && Array.isArray(adminResponse.data) && adminResponse.data.length > 0) {
      const adminValidUser = adminResponse.data.find((U) => user === U.user && password === U.password);
      if (adminValidUser) {
        window.location.href = "./view.html";
        return;
      }
    }

    if (clientResponse.data && Array.isArray(clientResponse.data) && clientResponse.data.length > 0) {
      // Aquí ajustamos para buscar por email y password
      const clientValidUser = clientResponse.data.find((U) => user === U.emailClientes && password === U.password); // Cambio aquí
      if (clientValidUser) {
        window.location.href = "./catalogo.html"; // Redirect to catalog page for clients
        return;
      }
    }

    alert("Usuario o contraseña incorrectos.");
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
  }
};
