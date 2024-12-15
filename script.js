// Pantalla principal y navegación básica
document.getElementById("start-button").addEventListener("click", () => {
    const mainScreen = document.getElementById("main-screen");
    const formScreen = document.getElementById("form-screen");
  
    // Transición del logo
    const logo = document.getElementById("logo");
    logo.style.transform = "scale(2)";
    logo.style.opacity = "0";
  
    setTimeout(() => {
      mainScreen.classList.add("hidden");
      formScreen.classList.remove("hidden");
    }, 1000);
  });
  
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
  

// Crear y mostrar la primera pregunta
document.getElementById("start-button").addEventListener("click", () => {
  const mainScreen = document.getElementById("main-screen");
  const formScreen = document.getElementById("form-screen");
  const questionContainer = document.getElementById("question-container");

  // Transición de pantalla principal
  const logo = document.getElementById("logo");
  logo.style.transform = "scale(2)";
  logo.style.opacity = "0";

  setTimeout(() => {
    mainScreen.classList.add("hidden");
    formScreen.classList.remove("hidden");

    // Renderizar la primera pregunta
    const preguntaTexto = new PreguntaTexto(
      "Clip favorito del canal",
      "Pon aquí el título y LINK para tu clip favorito"
    );
    questionContainer.appendChild(preguntaTexto.render());
  }, 1000);
});
