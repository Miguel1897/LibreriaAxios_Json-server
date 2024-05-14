const login = async () => {
  const user = document.getElementById("user").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!user || !password) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    const response = await axios.get("http://localhost:3001/admin");

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      const usuarioValido = response.data.find((U) => user === U.user && password === U.password);

      if (usuarioValido) {
        window.location.href = "/tp final biblio/rsc/paginas/view.html";
      } else {
        alert("Usuario o contraseña incorrectos.");
      }
    } else {
      alert("No se encontraron usuarios en la base de datos.");
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
  }
};

