// Var global para almacenar el ID 
let Id = 0;

// Función para mostrar las alq
const MostrarAlquileres = () => {
  try {

    // realiza una solicitud get para obtener datos de alquileres
    axios.get("http://localhost:3001/alquileres")
      .then(resp => {

        // Liimpia el contenido actual del elemento con ID _alquiler
        document.getElementById("_alquiler").innerHTML = "";

        // mapea los datos de internaciones y los agrega a la tabla
        resp.data.map(alquileres => {
          document.getElementById("_alquiler").innerHTML += `<tr>
            <th scope="row" id="id">${alquileres.id}</th>
            <td>${alquileres.fechaAlquiler}</td>
            <td>${alquileres.userCliente}</td>
            <td>${alquileres.nombreLibro}</td>
           <td> 
              <button type="submit" class="btn btn-dark" onclick="traerDatos(${alquileres.id},'${alquileres.fechaAlquiler}','${alquileres.userCliente}','${alquileres.nombreLibro}')">
                <i class="fa-solid fa-pen-to-square">Editar</i>
              </button>
              <button type="submit" class="btn btn-danger" onclick="eliminarAlquiler(${alquileres.id})">
                <i class="fa-solid fa-trash-can">Borrar</i>
              </button>
              </td>
          </tr>`;
        })
      })
      .catch(error => console.log("Error al mostrar alquiler", error))
  }

  catch (error) {
    console.log("Error al mostrar alquiler", error);
  }
}

const ListarClientes = () => {
  try {
    axios.get("http://localhost:3001/clientes").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(clientes => {
        document.getElementById("cboClientes").innerHTML += `
                        <option value="${clientes.userClientes}">${clientes.userClientes}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}
const ListarLibros = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("cboLibros").innerHTML += `
                        <option value="${libros.nombreLibros}">${libros.nombreLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

// llama a la función para mostrar internaciones al cargar la página
MostrarAlquileres();
ListarClientes();
ListarLibros();

// Funcion para agregar alqu
const AgregarAlquiler = async () => {
  // Obtiene valores de los campos
  let fechaAlquiler = document.getElementById("fechaAlquiler").value;
  let clientes = document.getElementById("cboClientes").value;
  let libros = document.getElementById("cboLibros").value;

  // Valida los datos ingresados
  if (!validarDatos(fechaAlquiler, clientes, libros)) {
    alert("Campos vacíos");
    return false;
  }

  // Genera un ID único de cuatro dígitos
  let id = generarIdUnico();

  // Realiza una solicitud GET para verificar si el ID ya existe
  try {
    const response = await axios.get(`http://localhost:3001/alquileres/${id}`);
    // Si el ID ya existe, genera uno nuevo y verifica nuevamente
    if (response.data) {
      id = generarIdUnico();
    }
  } catch (error) {
    // Si ocurre un error (p. ej., el ID no existe), no hagas nada
  }

  // Realiza la solicitud POST para agregar alquileres
  try {
    await axios.post("http://localhost:3001/alquileres", {
      id: id,
      fechaAlquiler: fechaAlquiler,
      userCliente: clientes,
      nombreLibro: libros,
    });
    // Si se agrega correctamente, actualiza la tabla de alquileres
    MostrarAlquileres();
  } catch (error) {
    console.error(error.message);
  }
};

// Función para generar un ID único de cuatro dígitos
const generarIdUnico = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};


// agrega un event listener al botón "agregar" para llamar a la función AgregarAlquiler
document.getElementById("agregar").addEventListener("click", AgregarAlquiler);

// funcion para traer datos de una internación para editar
const traerDatos = (id, fechaAlquiler, clientes, libros) => {

  // almacena el id seleccionado
  Id = id;

  // Actualiza los valores en los campos de edicion
  document.getElementById("fechaAlquiler").value = fechaAlquiler;
  document.getElementById("cboClientes").value = clientes;
  document.getElementById("cboLibros").value = libros;

  // muestra el botón de edición y oculta el botón de agregar
  document.getElementById("editar").style.display = "block";
  document.getElementById("agregar").style.display = "none";
};

// funcion para editar una alquiler
const editarAlquiler = () => {

  // Obtiene valores de los campos de edicion
  const fechaAlquiler = document.getElementById("fechaAlquiler").value;
  const clientes = document.getElementById("cboClientes").value;
  const libros = document.getElementById("cboLibros").value;

  // valida los datos 
  if (!validarDatos(fechaAlquiler, clientes, libros)) {
    alert("Campos vacios")
    return false;
  };
  axios.put("http://localhost:3001/alquileres/" + Id, {
    fechaAlquiler: fechaAlquiler,
    userCliente: clientes,
    nombreLibro: libros,
  })
    .then(() => {

      // Actualiza la tabla 
      MostrarAlquileres();
    })
    .catch((error) => {
      console.error("Error al editar alquiler", error.message);
    });
}

// agrega un event listener(es una función que espera a que ocurra un evento específico y 
//luego responde a ese evento ) al botón "editar" para llamar a la función editarAlquiler
document.getElementById("editar").addEventListener("click", editarAlquiler);

// funcion para eliminar una alquiler
const eliminarAlquiler = (id) => {

  axios.delete("http://localhost:3001/alquileres/" + id)
    .then(() => {

      // actualiza la tabla  despues de eliminar
      MostrarAlquileres();
    })
    .catch((error) => {
      console.error("Error al eliminar alquiler", error.message);
    });
}

//funcion para validar datos ingresados
const validarDatos = (fechaAlquiler, clientes, libros) => {
  if (fechaAlquiler === "" || clientes === "" || libros === "") {
    return false;
  };
  return true;
};




