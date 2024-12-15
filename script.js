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
    constructor(categoria) {
      this.categoria = categoria;
    }
  
    render() {
      const container = document.createElement("div");
      container.classList.add("question");
  
      const title = document.createElement("h2");
      title.textContent = this.categoria;
      container.appendChild(title);
  
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
  