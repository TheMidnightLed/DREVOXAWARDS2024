// Objeto para almacenar las respuestas localmente
const respuestas = {};

// Clase para preguntas de texto
class PreguntaTexto {
  constructor(categoria, textoAclarativo = "", questionId) {
    this.categoria = categoria;
    this.textoAclarativo = textoAclarativo;
    this.questionId = questionId;
  }

  render(onNext, onPrevious) {
    const container = document.createElement("div");
    container.classList.add("question");

    // Título de la pregunta
    const title = document.createElement("h2");
    title.textContent = this.categoria;
    container.appendChild(title);

    // Texto aclarativo
    if (this.textoAclarativo) {
      const aclarativo = document.createElement("p");
      aclarativo.textContent = this.textoAclarativo;
      aclarativo.classList.add("texto-aclarativo");
      container.appendChild(aclarativo);
    }

    // Barra para escribir
    const input = document.createElement("textarea");
    input.setAttribute("placeholder", "Escribe tu respuesta aquí...");
    input.value = respuestas[this.questionId] || ""; // Cargar respuesta guardada
    input.addEventListener("input", () => {
      respuestas[this.questionId] = input.value; // Guardar respuesta en memoria local
    });
    container.appendChild(input);

    // Botones de navegación
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("navigation-buttons");

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.addEventListener("click", onNext);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.addEventListener("click", onPrevious);

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    container.appendChild(buttonContainer);

    return container;
  }
}

// Funciones para mostrar preguntas
function mostrarPreguntaClipFavorito() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const pregunta = new PreguntaTexto(
    "Clip favorito del canal",
    "Pon aquí el título y LINK para tu clip favorito",
    "entry.1976024462"
  );
  questionContainer.appendChild(pregunta.render(mostrarPreguntaClipCringe, () => {}));
}

function mostrarPreguntaClipCringe() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const pregunta = new PreguntaTexto(
    "Clip más cringe del canal",
    "Pon aquí el título y LINK para tu clip cringe",
    "entry.813796303"
  );
  questionContainer.appendChild(pregunta.render(mostrarPreguntaEventoIconico, mostrarPreguntaClipFavorito));
}

function mostrarPreguntaEventoIconico() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const pregunta = new PreguntaTexto(
    "Evento más icónico de la comunidad (o del chat)",
    "Un evento que haya unido al chat",
    "entry.947596321"
  );
  questionContainer.appendChild(pregunta.render(mostrarPreguntaMemeIconico, mostrarPreguntaClipCringe));
}

// Clase para preguntas de opción múltiple
class PreguntaOpcionMultiple {
  constructor(categoria, opciones, questionId) {
    this.categoria = categoria;
    this.opciones = opciones; // Array de objetos { texto: "nombre", imagen: "ruta" }
    this.questionId = questionId;
  }

  render(onNext, onPrevious) {
    const container = document.createElement("div");
    container.classList.add("question");

    // Título de la pregunta
    const title = document.createElement("h2");
    title.textContent = this.categoria;
    container.appendChild(title);

    // Contenedor para las opciones
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    this.opciones.forEach((opcion, index) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");

      // Imagen de la opción
      const img = document.createElement("img");
      img.src = opcion.imagen;
      img.alt = opcion.texto;

      // Texto de la opción
      const label = document.createElement("p");
      label.textContent = opcion.texto;

      // Comprobar si esta opción ya fue seleccionada
      if (respuestas[this.questionId] === opcion.texto) {
        optionElement.classList.add("selected");
      }

      // Guardar la selección al hacer clic
      optionElement.addEventListener("click", () => {
        respuestas[this.questionId] = opcion.texto;
        document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
        optionElement.classList.add("selected");
      });

      optionElement.appendChild(img);
      optionElement.appendChild(label);
      optionsContainer.appendChild(optionElement);
    });

    container.appendChild(optionsContainer);

    // Botones de navegación
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("navigation-buttons");

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.addEventListener("click", onNext);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.addEventListener("click", onPrevious);

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    container.appendChild(buttonContainer);

    return container;
  }
}

// Funciones para mostrar cada pregunta de opción múltiple
function mostrarPreguntaMemeIconico() {
  const opciones = [
    { texto: "Bien hecho sobrino hoy te kcho el doble", imagen: "FORMULARIO/meme_1.png" },
    { texto: "Drevox sueño", imagen: "FORMULARIO/meme_2.png" },
    { texto: "DrevoxCrazy", imagen: "FORMULARIO/MegoPunch.gif" },
    { texto: "EllayaEntroYo", imagen: "FORMULARIO/meme_4.png" },
    { texto: "Nai Nai Nai", imagen: "FORMULARIO/meme_5.png" },
    { texto: "Drevoxhunter", imagen: "FORMULARIO/meme_6.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("El Meme más Icónico del Canal", opciones, "entry.219126118"), mostrarPreguntaMejorColaboracion, mostrarPreguntaEventoIconico);
}

function mostrarPreguntaMejorColaboracion() {
  const opciones = [
    { texto: "Cera caliente (Drevox y la señorita)", imagen: "FORMULARIO/colaboracion_1.png" },
    { texto: "Cospobre (Drevox y Armando)", imagen: "FORMULARIO/colaboracion_2.png" },
    { texto: "Collab de Slots (Drevox, Ganchos y JhessCC)", imagen: "FORMULARIO/colaboracion_3.png" },
    { texto: "LaGatoPe x Hardcore", imagen: "FORMULARIO/colaboracion_4.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Colaboración del Canal", opciones, "entry.1820309658"), mostrarPreguntaBaneadoFavorito, mostrarPreguntaMemeIconico);
}

function mostrarPreguntaBaneadoFavorito() {
  const opciones = [
    { texto: "Astronita", imagen: "FORMULARIO/baneado_1.png" },
    { texto: "Zapatitos Amarillos", imagen: "FORMULARIO/baneado_2.png" },
    { texto: "Vanessa", imagen: "FORMULARIO/baneado_3.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("El Baneado Favorito del Canal", opciones, "entry.383688201"), mostrarPreguntaViewerMasFiel, mostrarPreguntaMejorColaboracion);
}

function mostrarPreguntaViewerMasFiel() {
  const opciones = [
    { texto: "LIFENATURAL", imagen: "FORMULARIO/viewer_1.png" },
    { texto: "FELIPE", imagen: "FORMULARIO/viewer_2.jpeg" },
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/viewer_3.png" },
    { texto: "V0LTA", imagen: "FORMULARIO/viewer_4.jpeg" },
    { texto: "THXA67", imagen: "FORMULARIO/viewer_5.png" },
    { texto: "JOSHUA_OUO", imagen: "FORMULARIO/viewer_6.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Viewer más Fiel del Canal", opciones, "entry.136252067"), mostrarPreguntaMejorApoyo, mostrarPreguntaBaneadoFavorito);
}

function mostrarPreguntaMejorApoyo() {
  const opciones = [
    { texto: "JAXZZER", imagen: "FORMULARIO/apoyo_1.png"},
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/apoyo_2.png"},
    { texto: "DAVID", imagen: "FORMULARIO/apoyo_3.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Viewer que más Apoyó al Canal", opciones, "entry.1823896014"), mostrarPreguntaMejorVIP, mostrarPreguntaViewerMasFiel)
}

function mostrarPreguntaMejorVIP() {
  const opciones = [
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/vip_1.png"},
    { texto: "FELIPE", imagen: "FORMULARIO/vip_2.jpeg"},
    { texto: "V0LTA", imagen: "FORMULARIO/vip_3.jpeg"},
    { texto: "ELGANCHOS", imagen: "FORMULARIO/vip_4.png"},
    { texto: "DAVID", imagen: "FORMULARIO/vip_5.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor VIP del Canal", opciones, "entry.170597404"), mostrarPreguntaModFavorito, mostrarPreguntaMejorApoyo)
}

function mostrarPreguntaModFavorito() {
  const opciones = [
    { texto: "RAII", imagen: "FORMULARIO/mod_1.png"},
    { texto: "MEMAS", imagen: "FORMULARIO/mod_2.png"},
    { texto: "MICACHERAZO", imagen: "FORMULARIO/mod_3.png"},
    { texto: "YVONNE_OUO", imagen: "FORMULARIO/mod_4.png"},
    { texto: "AQUISIU", imagen: "FORMULARIO/mod_5.png"},
    { texto: "ALEXANDRA", imagen: "FORMULARIO/mod_6.png"},
    { texto: "D3YVI", imagen: "FORMULARIO/mod_7.png"},
    { texto: "RENZO", imagen: "FORMULARIO/mod_8.png"},
  ];
  
  mostrarPregunta(new PreguntaOpcionMultiple("Mod Favorito del Canal", opciones, "entry.1941000340"), mostrarPreguntaModLFavorito, mostrarPreguntaMejorVIP)
}

function mostrarPreguntaModLFavorito() {
  const opciones = [
    { texto: "RAII", imagen: "FORMULARIO/mod_1.png"},
    { texto: "MEMAS", imagen: "FORMULARIO/mod_2.png"},
    { texto: "MICACHERAZO", imagen: "FORMULARIO/mod_3.png"},
    { texto: "YVONNE_OUO", imagen: "FORMULARIO/mod_4.png"},
    { texto: "AQUISIU", imagen: "FORMULARIO/mod_5.png"},
    { texto: "ALEXANDRA", imagen: "FORMULARIO/mod_6.png"},
    { texto: "D3YVI", imagen: "FORMULARIO/mod_7.png"},
    { texto: "RENZO", imagen: "FORMULARIO/mod_8.png"},
  ];
  
  mostrarPregunta(new PreguntaOpcionMultiple("Mod menos Favorito del Canal", opciones, "entry.1154734700"), mostrarPreguntaModAplicado, mostrarPreguntaModFavorito)
}

function mostrarPreguntaModAplicado() {
  const opciones = [
    { texto: "D3YVI", imagen: "FORMULARIO/mod_7.png"},
    { texto: "MEMAS", imagen: "FORMULARIO/mod_2.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mod más Aplicado del Canal", opciones, "entry.699149284"), mostrarPreguntaShipIconico, mostrarPreguntaModLFavorito)
}

function mostrarPreguntaShipIconico() {
  const opciones = [
    { texto: "ROICKXANDRA (ROICK x ALEXANDRA)", imagen: "FORMULARIO/ship_1.png"},
    { texto: "JHESSVROX (JHESS x DREVOX)", imagen: "FORMULARIO/ship_2.png"},
    { texto: "RAIIXANDRA (RAII x ALEXANDRA)", imagen: "FORMULARIO/ship_3.png"},
    { texto: "ALEXAVYXD (ALEXANDRA x D3IVY)", imagen: "FORMULARIO/ship_4.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Ship más Icónico del Canal", opciones, "entry.2080205506"), mostrarPreguntaMayorRobo, mostrarPreguntaModAplicado)
}

function mostrarPreguntaMayorRobo() {
  const opciones = [
    { texto: "Premio al GOTY para Astromrd", imagen: "FORMULARIO/robo_1.png"},
    { texto: "Horas comidas del extensible", imagen: "FORMULARIO/robo_2.jpg"},
    { texto: "Incidente: Pax y el cuarto de pollo", imagen: "FORMULARIO/robo_3.jpg"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Robo del Año", opciones, "entry.491190079"), mostrarPreguntaJuegoQuemado, mostrarPreguntaShipIconico)
}

function mostrarPreguntaJuegoQuemado() {
  const opciones = [
    { texto: "FORTNITE", imagen: "FORMULARIO/juego_1.png"},
    { texto: "VALORANT", imagen: "FORMULARIO/juego_2.jpeg"},
    { texto: "LOL (LEAGUE OF LEGENDS)", imagen: "FORMULARIO/juego_3.jpeg"},
    { texto: "LEFT 4 DEAD 2", imagen: "FORMULARIO/juego_4.jpg"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Juego más Quemado del Año", opciones, "entry.674454907"), mostrarPantallaConfirmacion, mostrarPreguntaMayorRobo)
}

// Función para mostrar una pregunta genérica
function mostrarPregunta(pregunta, onNext, onPrevious) {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";
  questionContainer.appendChild(pregunta.render(onNext, onPrevious));
}

// Mostrar pantalla de confirmación
function mostrarPantallaConfirmacion() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("confirmation-screen");

  const title = document.createElement("h2");
  title.textContent = "Revisar manualmente las respuestas";
  container.appendChild(title);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("navigation-buttons");

  const sendButton = document.createElement("button");
  sendButton.textContent = "Revisar";
  sendButton.addEventListener("click", enviarRespuestas);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.addEventListener("click", mostrarPreguntaViewerMasFiel);

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(sendButton);
  container.appendChild(buttonContainer);

  questionContainer.appendChild(container);
}

// Función para enviar respuestas construyendo la URL con parámetros pre-rellenados
function enviarRespuestas() {
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSctHh8gSn-jjQLz6hrfg-S1Cv6-TZ6HgKWRMc-TAajYrjC-gQ/viewform";

  const params = new URLSearchParams();
  params.append("entry.1976024462", respuestas["entry.1976024462"] || "");
  params.append("entry.813796303", respuestas["entry.813796303"] || "");
  params.append("entry.947596321", respuestas["entry.947596321"] || "");
  params.append("entry.219126118", respuestas["entry.219126118"] || "");
  params.append("entry.1820309658", respuestas["entry.1820309658"] || "");
  params.append("entry.383688201", respuestas["entry.383688201"] || "");
  params.append("entry.136252067", respuestas["entry.136252067"] || "");

  const finalUrl = `${baseUrl}?${params.toString()}`;
  console.log("Redirigiendo a:", finalUrl);
  window.location.href = finalUrl;
}

// Nueva función para mostrar la pantalla de agradecimiento
function mostrarPantallaAgradecimiento() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("thank-you-screen");

  const title = document.createElement("h2");
  title.textContent = "¡Gracias por participar!";
  container.appendChild(title);

  const message = document.createElement("p");
  message.textContent = "Tus respuestas han sido enviadas con éxito.";
  container.appendChild(message);

  questionContainer.appendChild(container);

  // Opcional: Ocultar cualquier footer-bar o botones
  document.getElementById("footer-bar").classList.add("hidden");
}

// Transición inicial al hacer clic en "Comenzar"
document.getElementById("start-button").addEventListener("click", () => {
  if (localStorage.getItem("votoRealizado")) {
    alert("Ya has participado en esta encuesta. ¡Gracias!");
    return;
  }

  const logo = document.getElementById("logo");
  const mainScreen = document.getElementById("main-screen");
  const formScreen = document.getElementById("form-screen");

  // Animación de logo (zoom + opacidad)
  logo.style.transform = "scale(2)";
  logo.style.opacity = "0";

  setTimeout(() => {
    mainScreen.classList.add("hidden");
    formScreen.classList.remove("hidden");

    // Mostrar la primera pregunta
    mostrarPreguntaClipFavorito();
  }, 1000);
});
