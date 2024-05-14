// Var global para almacenar el ID seleccionado
let Id = 0;
const generatedIds = new Set();
const MostrarLibros = () => {
  try {

    // Realiza un get para obtener datos de libros
    axios.get("http://localhost:3001/libros")
      .then(resp => {

        // Limpia el contenido actual del elemento con ID _libros
        document.getElementById("_libros").innerHTML = "";

        // Mapea los datos de libros y los agrega a la tabla
        resp.data.map(libros => {
          const idLibro = `id_libro_${libros.id}`;
          // Agrega los datos del libro a la tabla
          document.getElementById("_libros").innerHTML += `<tr>
            <td id="${idLibro}">${libros.id}</td>
            <td>${libros.nombreLibros}</td>
            <td>${libros.autorLibros}</td>
            <td>${libros.generoLibros}</td>
            <td>${libros.añoLibros}</td>
            <td> 
              <button type="submit" class="btn btn-dark" onclick="traerDatos(${libros.id},'${libros.nombreLibros}','${libros.autorLibros}','${libros.generoLibros}','${libros.añoLibros}')">
                <i class="fa-solid fa-pen-to-square">Editar</i>
              </button>
              <button type="submit" class="btn btn-danger" onclick="eliminarLibros(${libros.id})">
                <i class="fa-solid fa-trash-can">Borrar</i>
              </button>
            </td>
          </tr>`;
        })
      })
      .catch(error => console.log("Error al mostrar libros", error))
  }

  catch (error) {
    console.log("Error al mostrar libros", error);
  }
}


const ListarNombres = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("nombreLibros").innerHTML += `
                        <option value="${libros.id},'${libros.nombreLibros}','${libros.autorLibros}','${libros.generoLibros}','${libros.añoLibros}">${libros.nombreLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

const ListarAutor = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("autorLibros").innerHTML += `
                        <option value="${libros.id},'${libros.nombreLibros}','${libros.autorLibros}','${libros.generoLibros}','${libros.añoLibros}">${libros.autorLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}
const ListarGenero = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("generoLibros").innerHTML += `
                        <option value="${libros.id},'${libros.nombreLibros}','${libros.autorLibros}','${libros.generoLibros}','${libros.añoLibros}">${libros.generoLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}
const ListarAño = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("añoLibros").innerHTML += `
                        <option value="${libros.id},'${libros.nombreLibros}','${libros.autorLibros}','${libros.generoLibros}','${libros.añoLibros}">${libros.añoLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

// Llama a la función para mostrar el libro al cargar la página
MostrarLibros();
ListarNombres();
ListarAutor();
ListarGenero();
ListarAño();


// Función agregar libros
const AgregarLibros = () => {
  // Obtiene valores de los campos
  let nombre = document.getElementById("nombreLibros").value;
  let autor = document.getElementById("autorLibros").value;
  let genero = document.getElementById("generoLibros").value;
  let año = document.getElementById("añoLibros").value;

  // Genera un ID aleatorio de cuatro dígitos como una cadena
  let id = Math.floor(1000 + Math.random() * 9000).toString();

  // Valida los datos ingresados
  if (!validarDatos(nombre, autor)) {
    alert("Campos vacíos");
    return false;
  }

  // Hace solicitud POST para agregar libros
  axios.post("http://localhost:3001/libros", {
    id: id, // Asigna el ID generado
    nombreLibros: nombre,
    autorLibros: autor,
    generoLibros: genero,
    añoLibros: año
  })
    .then(() => {
      MostrarLibros();
    })
    .catch((error) => {
      console.error(error.message);
    });
};


// Función para generar un ID aleatorio de cuatro dígitos
const generarId = () => {
  return Math.floor(1000 + Math.random() * 9000); // Genera un número aleatorio entre 1000 y 9999
};

// Función para verificar si un ID de libro existe en la base de datos
const existeIdLibro = async (id) => {
  try {
    const resp = await axios.get(`http://localhost:3001/libros/${id}`);
    return resp.data !== null; // Retorna true si el ID existe, false si no existe
  } catch (error) {
    return false; // Si ocurre un error, asumimos que el ID no existe
  }
};

// Agrega un event listener al botón "agregar" para llamar a la función AgregarLibros
document.getElementById("agregar").addEventListener("click", AgregarLibros);

// Función para traer datos de libros para editar
const traerDatos = (id, nombre, autor, genero, año) => {

  // Almacena el ID seleccionado
  Id = id;

  // Actualiza los valores en los campos de edición
  document.getElementById("nombreLibros").value = nombre;
  document.getElementById("autorLibros").value = autor;
  document.getElementById("generoLibros").value = genero;
  document.getElementById("añoLibros").value = año;

  // Muestra el btn de edición y oculta el btn de agregar
  document.getElementById("editar").style.display = "block";
  document.getElementById("agregar").style.display = "none";
};

// Función para editar un libro
const editarLibros = () => {

  // Obtiene valores de los campos de edición
  const nombre = document.getElementById("nombreLibros").value;
  const autor = document.getElementById("autorLibros").value;
  const genero = document.getElementById("generoLibros").value;
  const año = document.getElementById("añoLibros").value;

  // Valida los datos ingresados
  if (!validarDatos(nombre, autor)) {
    alert("Campos vacíos");
    return false;
  }

  axios.put("http://localhost:3001/libros/" + Id, {
    nombreLibros: nombre,
    autorLibros: autor,
    generoLibros: genero,
    añoLibros: año
  })
    .then(() => {
      // Actualiza la tabla de libros después de editar
      MostrarLibros();
    })
    .catch((error) => {
      console.error("Error al editar libros", error.message);
    });
}

// Agrega un event listener al botón "editar" para llamar a la función editarLibros
document.getElementById("editar").addEventListener("click", editarLibros);

// Función para eliminar un libro
const eliminarLibros = (id) => {

  axios.delete("http://localhost:3001/libros/" + id)
    .then(() => {
      // Actualiza la tabla de libros después de eliminar
      MostrarLibros();
    })
    .catch((error) => {
      console.error("Error al eliminar libros", error.message);
    });
}

// Función para validar datos ingresados
const validarDatos = (nombre, autor) => {
  if (nombre === "" || autor === "") {
    return false;
  }
  return true;
};
