// Variables globales para almacenar respuestas
let respuestas = {};

// Transición inicial al hacer clic en "Comenzar"
document.getElementById("start-button").addEventListener("click", () => {
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

// Sincronización con Google Forms
function enviarRespuestaGoogleForms(questionId, respuesta) {
  const formData = new FormData();
  formData.append(questionId, respuesta);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSctHh8gSn-jjQLz6hrfg-S1Cv6-TZ6HgKWRMc-TAajYrjC-gQ/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
    .then(() => console.log("Respuesta enviada: ", respuesta))
    .catch(err => console.error("Error al enviar respuesta: ", err));
}

// Función para almacenar respuestas en localStorage
function guardarRespuesta(questionId, respuesta) {
  respuestas[questionId] = respuesta;
  localStorage.setItem('respuestas', JSON.stringify(respuestas));
}

// Función para recuperar respuestas guardadas de localStorage
function recuperarRespuestas() {
  const storedRespuestas = localStorage.getItem('respuestas');
  return storedRespuestas ? JSON.parse(storedRespuestas) : {};
}

// Clase para preguntas de texto
class PreguntaTexto {
  constructor(categoria, textoAclarativo = "", questionId) {
    this.categoria = categoria;
    this.textoAclarativo = textoAclarativo;
    this.questionId = questionId;
  }

  render() {
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
    container.appendChild(input);

    // Si hay respuesta guardada, mostrarla
    const storedRespuestas = recuperarRespuestas();
    if (storedRespuestas[this.questionId]) {
      input.value = storedRespuestas[this.questionId];
    }

    input.addEventListener("input", () => {
      guardarRespuesta(this.questionId, input.value);
    });

    // Botones de navegación
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("navigation-buttons");

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.addEventListener("click", () => {
      
      mostrarPreguntaClipCringe();
    });

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.addEventListener("click", () => {
      
      mostrarPreguntaClipFavorito(true);
    });

    buttonContainer.appendChild(prevButton);
    buttonContainer.appendChild(nextButton);
    container.appendChild(buttonContainer);

    return container;
  }
}

// Mostrar la pregunta de "Clip favorito del canal"
function mostrarPreguntaClipFavorito(isReturning = false) {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const preguntaTexto = new PreguntaTexto(
    "Clip favorito del canal",
    "Pon aquí el título y LINK para tu clip favorito",
    "entry.1976024462" // Reemplaza con el ID real de la pregunta en Google Forms
  );

  const questionElement = preguntaTexto.render();
  questionElement.classList.add(isReturning ? "slide-right" : "slide-left");
  questionContainer.appendChild(questionElement);
}

// Mostrar la pregunta de "Clip más cringe del canal"
function mostrarPreguntaClipCringe() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const preguntaTexto = new PreguntaTexto(
    "Clip más cringe del canal",
    "Pon aquí el título y LINK para tu clip cringe",
    "entry.813796303" // Reemplaza con el ID real de la pregunta en Google Forms
  );

  const questionElement = preguntaTexto.render();
  questionElement.classList.add("slide-left");
  questionContainer.appendChild(questionElement);
}
