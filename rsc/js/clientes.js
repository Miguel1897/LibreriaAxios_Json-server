// Var global para almacenar el ID seleccionado
let Id = 0;

const MostrarClientes = () => {
  try {

    // get para obtener datos de clientes
    axios.get("http://localhost:3001/clientes")
      .then(resp => {

        // Limpia el contenido actual del elemento con ID _clientess
        document.getElementById("_clientes").innerHTML = "";

        // Mapea los datos de clientes y los agrega a la tabla
        resp.data.map(clientes => {
          document.getElementById("_clientes").innerHTML += `<tr>
            <th scope="row" id="id">${clientes.id}</th>
            <td>${clientes.userClientes}</td>
            <td>${clientes.emailClientes}</td>

           <td> 
              <button type="submit" class="btn btn-dark" onclick="traerDatos(${clientes.id},'${clientes.userClientes}','${clientes.emailClientes}')">
                <i class="fa-solid fa-pen-to-square">Editar</i>
              </button>
              <button type="submit" class="btn btn-danger" onclick="eliminarClientes(${clientes.id})">
                <i class="fa-solid fa-trash-can">Borrar</i>
              </button>
              </td>
          </tr>`;
        })
      })
      .catch(error => console.log("Error al mostrar clientes", error))
  }

  catch (error) {
    console.log("Error al mostrar clientes", error);
  }
}

const ListarUser = () => {
  try {
    axios.get("http://localhost:3001/clientes").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(clientes => {
        document.getElementById("userClientes").innerHTML += `
                        <option value="${clientes.userClientes}">${clientes.userClientes}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

const ListarEmail = () => {
  try {
    axios.get("http://localhost:3001/clientes").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(clientes => {
        document.getElementById("emailClientes").innerHTML += `
                        <option value="${clientes.emailClientes}">${clientes.emailClientes}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

// Llama a la función para mostrar clientes al cargar la página
MostrarClientes();
ListarUser();
ListarEmail();

// Función para agregar clientes
const AgregarClientes = async () => {
  // Obtiene valores de los campos
  let user = document.getElementById("userClientes").value;
  let email = document.getElementById("emailClientes").value;

  // Validación
  if (!validarDatos(user, email)) {
    return false;
  }

  // Genera un ID único de cuatro dígitos
  let id = generarIdUnico();

  // Realiza una solicitud GET para verificar si el ID ya existe
  try {
    const response = await axios.get(`http://localhost:3001/clientes/${id}`);
    // Si el ID ya existe, genera uno nuevo y verifica nuevamente
    if (response.data) {
      id = generarIdUnico();
    }
  } catch (error) {
    // Si ocurre un error (p. ej., el ID no existe), no hagas nada
  }

  // Realiza la solicitud POST para agregar clientes
  try {
    await axios.post("http://localhost:3001/clientes", {
      id: id,
      userClientes: user,
      emailClientes: email,
    });
    // Si se agrega correctamente, actualiza la tabla de clientes
    MostrarClientes();
  } catch (error) {
    console.error(error.message);
  }
};

// Función para generar un ID único de cuatro dígitos
const generarIdUnico = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
// agrega un event listener al botón "agregar" para llamar a la función AgregarInternacion
document.getElementById("agregar").addEventListener("click", AgregarClientes);

// trae los datos de cliente para editar
const traerDatos = (id, user, email) => {

  // Almacena el ID seleccionado
  Id = id;

  // actualiza los valores en los campos de edición
  document.getElementById("userClientes").value = user;
  document.getElementById("emailClientes").value = email;

  // muestrra btn de edición y oculta el btn de agregar
  document.getElementById("editar").style.display = "block";
  document.getElementById("agregar").style.display = "none";
};

// funciion para editar un cliente
const editarClientes = () => {

  // Obtiene valores de los campos de edicion
  const user = document.getElementById("userClientes").value;
  const email = document.getElementById("emailClientes").value;

  // validacion de datos ingresados
  if (!validarDatos(user, email)) {
    alert("Campos vacios")
  };
  axios.put("http://localhost:3001/clientes/" + Id, {
    userClientes: user,
    emailClientes: email,
  })
    .then(() => {

      // actualiza despues de de editar
      MostrarClientes();
    })
    .catch((error) => {
      console.error("Error al editar clientes", error.message);
    });
}

// Agrega un event listener al botón "editar" para llamar a la función editar clientes
document.getElementById("editar").addEventListener("click", editarClientes);

// funcion para eliminar una clientes
const eliminarClientes = (id) => {

  axios.delete("http://localhost:3001/clientes/" + id)
    .then(() => {

      // Actualiza la tabla de clientes después de eliminar
      MostrarClientes();
    })
    .catch((error) => {
      console.error("Error al eliminar clientes", error.message);
  });
}

function validarDatos(user, email) {

  // validacion campos vacios
  if (user.trim() === '' || email.trim() === '') {
    alert("Campos vacíos");
    return false;
  }
  
  // Aquí corrige la comparación
  if (user === userClientes.user || email.trim() === emailClientes.email) {
    alert("Duplicado");
    return false;
  }

  // Expresión regular para validar el formato de email
  var emailGeteado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // verifica formato de email
  if (!emailGeteado.test(email)) {
    alert("Correo electrónico en formato incorrecto");
    return false;
  }
  return true;
}
