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
  
  // Clase para preguntas de texto
  class PreguntaTexto {
    constructor(categoria, textoAclarativo = "") {
      this.categoria = categoria;
      this.textoAclarativo = textoAclarativo;
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
  
      return container;
    }
  }  
  
  // Clase para preguntas de votación
  class PreguntaVotar {
    constructor(categoria, opciones) {
      this.categoria = categoria;
      this.opciones = opciones;
    }
  
    render() {
      const container = document.createElement("div");
      container.classList.add("question");
  
      const title = document.createElement("h2");
      title.textContent = this.categoria;
      container.appendChild(title);
  
      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("options-container");
  
      this.opciones.forEach((opcion, index) => {
        const option = document.createElement("div");
        option.classList.add("option");
        option.textContent = opcion.texto;
        option.style.backgroundImage = `url(${opcion.imagen})`;
  
        option.addEventListener("click", () => {
          document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
          option.classList.add("selected");
        });
  
        optionsContainer.appendChild(option);
      });
  
      container.appendChild(optionsContainer);
      return container;
    }
  }
  

// Crear y mostrar la primera pregunta al hacer clic en "Comenzar"
document.getElementById("start-button").addEventListener("click", () => {
  const mainScreen = document.getElementById("main-screen");
  const formScreen = document.getElementById("form-screen");

  const logo = document.getElementById("logo");
  logo.style.transform = "scale(2)";
  logo.style.opacity = "0";

  setTimeout(() => {
    mainScreen.classList.add("hidden");
    formScreen.classList.remove("hidden");

    // Mostrar la pregunta de clip favorito
    mostrarPreguntaClipFavorito();
  }, 1000);
});

// Función para mostrar la pregunta de clip favorito
function mostrarPreguntaClipFavorito() {
  const questionContainer = document.getElementById("question-container");
  const preguntaTexto = new PreguntaTexto(
    "Clip favorito del canal",
    "Pon aquí el título y LINK para tu clip favorito"
  );
  questionContainer.appendChild(preguntaTexto.render());
}