// Crea un json que contendrá un listado de objetos película, dónde cada película
// tiene un nombre y un precio LISTO

// Deberás generar automáticamente:
// - Importar el json creado (usando fetch) y usar sus valores para crear las opciones y modificar los precios
// - La creación de las filas y asientos: <div class="seat"></div>
// - Algunos asientos de manera aleatoria estarán ocupados

// Ampliación: Crear un input para crear filas de asientos dinámicas
// Ampliación: Posicionar en la pantalla del cine, una imágen de la película seleccionada



document.addEventListener("DOMContentLoaded", function () {
  const movieSelect = document.getElementById("movie");
  const container = document.querySelector(".container");
  const asientosSeleccionados = document.getElementById("count");
  const total = document.getElementById("total");

  let selectedSeats = 0;
//aqui llamamos al json como si fuese una api y sacamos los valores que buscamos
  fetch("./peliculas.json")
    .then((response) => response.json())
    .then((movies) => {
      movies.peliculas.forEach((pelicula) => {
        const option = document.createElement("option");
        option.value = pelicula.precio;
        option.textContent = `${pelicula.nombre} ($${pelicula.precio.toFixed(2)})`;
        movieSelect.appendChild(option);
      });
    });

  movieSelect.addEventListener("change", updateTotal);

  //Aqui creamos tanto las filas como las columnas
  for (let row = 1; row <= 6; row++) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");

    for (let seat = 1; seat <= 8; seat++) {
      const newSeat = document.createElement("div");
      newSeat.classList.add("seat");
      newRow.appendChild(newSeat);

      newSeat.addEventListener("click", () => selectSeat(newSeat));
    }

    container.appendChild(newRow);
  }

  //aqui ponemos que los numeros tengan dos cifras y que se actualice 
  //el valor del las entradas segun cuantas sean 
  function updateTotal() {
    const selectedPrice = parseFloat(movieSelect.value);
    const newTotal = selectedPrice * selectedSeats;

    asientosSeleccionados.textContent = selectedSeats;
    total.textContent = newTotal.toFixed(2);
  }
//agregamos al sitio seleccionado la calse selected y se suman los precios gracias a la anterior funcion
  function selectSeat(seat) {
    if (seat && !seat.classList.contains("occupied")) {
      seat.classList.toggle("selected");
      selectedSeats = document.querySelectorAll(".row .seat.selected").length;

      updateTotal();
    }
  }

  //aqui se crean los asientos ya ocupados
  const seats = document.querySelectorAll(".row .seat");
  const sitiosOcupados = Math.floor(Math.random() * seats.length / 2);

  for (let i = 0; i < sitiosOcupados; i++) {
    const randomIndex = Math.floor(Math.random() * seats.length);
    seats[randomIndex].classList.add("occupied");
  }
});
