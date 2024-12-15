// Objeto para almacenar las respuestas localmente
const respuestas = {};

// Función para manejar la respuesta del inicio de sesión de Google
function handleCredentialResponse(response) {
  const jwt = response.credential;
  console.log("JWT Token:", jwt);
  
  // Decodificar el JWT para obtener información del usuario
  const userInfo = parseJwt(jwt);
  console.log("User Info:", userInfo);

  // Ocultar la pantalla de inicio de sesión y mostrar la pantalla principal
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("main-screen").classList.remove("hidden");
}

// Función para decodificar el JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

// Inicializar Google Sign-In
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "941085287977-3dquirrdvrk5krrq75a9sm10a2n6svnr.apps.googleusercontent.com", // Reemplaza con tu Client ID
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("google-signin-button"),
    { theme: "outline", size: "large" } // Personaliza el botón
  );
};

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
    "entry.1976024462" // Reemplaza con el ID real de la pregunta en Google Forms
  );
  questionContainer.appendChild(pregunta.render(mostrarPreguntaClipCringe, () => {}));
}

function mostrarPreguntaClipCringe() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const pregunta = new PreguntaTexto(
    "Clip más cringe del canal",
    "Pon aquí el título y LINK para tu clip cringe",
    "entry.813796303" // Reemplaza con el ID real de la pregunta en Google Forms
  );
  questionContainer.appendChild(pregunta.render(mostrarPreguntaEventoIconico, mostrarPreguntaClipFavorito));
}

function mostrarPreguntaEventoIconico() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";

  const pregunta = new PreguntaTexto(
    "Evento más icónico de la comunidad (o del chat)",
    "Un evento que haya unido al chat",
    "entry.947596321" // Reemplaza con el ID real de la pregunta en Google Forms
  );
  questionContainer.appendChild(pregunta.render(mostrarPantallaConfirmacion, mostrarPreguntaClipCringe));
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
  prevButton.addEventListener("click", mostrarPreguntaEventoIconico);

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(sendButton);
  container.appendChild(buttonContainer);

  questionContainer.appendChild(container);
}

// Enviar todas las respuestas al formulario
function enviarRespuestas() {
  for (const [questionId, respuesta] of Object.entries(respuestas)) {
    enviarRespuestaGoogleForms(questionId, respuesta);
  }
  mostrarPantallaAgradecimiento();
}

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
