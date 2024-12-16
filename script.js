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
    { texto: "DrevoxCrazy", imagen: "FORMULARIO/meme_3.png" },
    { texto: "EllayaEntroYo", imagen: "FORMULARIO/meme_4.png" },
    { texto: "Nai Nai Nai", imagen: "FORMULARIO/meme_5.png" },
    { texto: "Drevoxhunter", imagen: "FORMULARIO/meme_6.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("El Meme más Icónico", opciones, "entry.219126118"), mostrarPreguntaMejorColaboracion, mostrarPreguntaEventoIconico);
}

function mostrarPreguntaMejorColaboracion() {
  const opciones = [
    { texto: "Cera caliente (Drevox y la señorita)", imagen: "FORMULARIO/colaboracion_1.png" },
    { texto: "Cospobre (Drevox y Armando)", imagen: "FORMULARIO/colaboracion_2.png" },
    { texto: "Collab de Slots (Drevox, Ganchos y JhessCC)", imagen: "FORMULARIO/colaboracion_3.png" },
    { texto: "LaGatoPe x Minecraft Hardcore", imagen: "FORMULARIO/colaboracion_4.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Colaboración", opciones, "entry.1820309658"), mostrarPreguntaBaneadoFavorito, mostrarPreguntaMemeIconico);
}

function mostrarPreguntaBaneadoFavorito() {
  const opciones = [
    { texto: "Astronita", imagen: "FORMULARIO/baneado_1.png" },
    { texto: "Zapatitos Amarillos", imagen: "FORMULARIO/baneado_2.png" },
    { texto: "Vanessa", imagen: "FORMULARIO/baneado_3.png" },
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("El Baneado Favorito", opciones, "entry.383688201"), mostrarPreguntaViewerMasFiel, mostrarPreguntaMejorColaboracion);
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

  mostrarPregunta(new PreguntaOpcionMultiple("Viewer más Fiel del Canal", opciones, "entry.136252067"), mostrarPantallaConfirmacion, mostrarPreguntaBaneadoFavorito);
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
  title.textContent = "¿Enviar respuestas?";
  container.appendChild(title);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("navigation-buttons");

  const sendButton = document.createElement("button");
  sendButton.textContent = "Enviar";
  sendButton.addEventListener("click", enviarRespuestas);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Anterior";
  prevButton.addEventListener("click", mostrarPreguntaViewerMasFiel);

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(sendButton);
  container.appendChild(buttonContainer);

  questionContainer.appendChild(container);
}

function enviarRespuestas() {
  const formData = new FormData();

  // Añadir todas las respuestas al formData
  for (const [questionId, respuesta] of Object.entries(respuestas)) {
    if (respuesta.trim() !== "") {
      formData.append(questionId, respuesta);
    }
  }

  // Verificar si hay respuestas antes de enviar
  if (formData.entries().next().done) {
    alert("No puedes enviar respuestas vacías.");
    return;
  }

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }  

  // Enviar los datos a Google Forms
  fetch("https://docs.google.com/forms/d/e/1FAIpQLSctHh8gSn-jjQLz6hrfg-S1Cv6-TZ6HgKWRMc-TAajYrjC-gQ/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
  .then(() => {
    console.log("Respuestas enviadas exitosamente.");
    mostrarPantallaAgradecimiento();
    // Marcar en localStorage que ya se votó
    localStorage.setItem("votoRealizado", "true");
  })
  .catch(err => console.error("Error al enviar respuestas: ", err));
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
