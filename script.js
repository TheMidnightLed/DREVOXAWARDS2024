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
  constructor(categoria, opciones, questionId, textoAclarativo) { // Agregado textoAclarativo como parámetro
    this.categoria = categoria;
    this.opciones = opciones;       // Array de objetos { texto: "nombre", imagen: "ruta" }
    this.questionId = questionId;
    this.textoAclarativo = textoAclarativo; // Asignar el parámetro a la propiedad de la clase
  }

  render(onNext, onPrevious) {
    const container = document.createElement("div");
    container.classList.add("question");

    // Título de la pregunta
    const title = document.createElement("h2");
    title.textContent = this.categoria;
    container.appendChild(title);

    // Texto aclarativo (si existe)
    if (this.textoAclarativo) {
      const aclarativo = document.createElement("p");
      aclarativo.classList.add("texto-aclarativo");
      aclarativo.textContent = this.textoAclarativo;
      container.appendChild(aclarativo);
    }

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
    { texto: "Que gracioso eres sobrino", imagen: "FORMULARIO/meme_1.png" },
    { texto: "Drevox sueño", imagen: "FORMULARIO/meme_2.png" },
    { texto: "DrevoxCrazy", imagen: "FORMULARIO/meme_3.gif" },
    { texto: "EllayaEntroYo", imagen: "FORMULARIO/meme_4.png" },
    { texto: "Nai Nai Nai", imagen: "FORMULARIO/meme_5.png" },
    { texto: "Drevoxhunter", imagen: "FORMULARIO/meme_6.png" },
  ];

  const textoAclarativo = "Frase, referencia o tontería que solo entiende la comunidad"

  mostrarPregunta(
    new PreguntaOpcionMultiple(
      "El Meme más Icónico del Canal", 
      opciones, 
      "entry.219126118",
      textoAclarativo
    ), 
    mostrarPreguntaMejorColaboracion, 
    mostrarPreguntaEventoIconico);
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

  const textoAclarativo = "El que se excedio pasandose de gracioso causando ban al canal"

  mostrarPregunta(new PreguntaOpcionMultiple("El Baneado Favorito del Canal", opciones, "entry.383688201", textoAclarativo), mostrarPreguntaViewerMasFiel, mostrarPreguntaMejorColaboracion);
}

function mostrarPreguntaViewerMasFiel() {
  const opciones = [
    { texto: "LIFENATURAL", imagen: "FORMULARIO/viewer_1.png" },
    { texto: "FELIPE", imagen: "FORMULARIO/viewer_2.jpeg" },
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/viewer_3.png" },
    { texto: "V0LTA", imagen: "FORMULARIO/viewer_4.jpeg" },
    { texto: "THXA67", imagen: "FORMULARIO/viewer_5.png" },
    { texto: "JOSHUA_OUO", imagen: "FORMULARIO/viewer_6.png" },
    { texto: "ELGATU", imagen: "FORMULARIO/viewer_7.jpg"},
  ];

  const textoAclarativo = "El que siempre está en los directos y es 100% leal"

  mostrarPregunta(new PreguntaOpcionMultiple("Viewer más Fiel del Canal", opciones, "entry.136252067", textoAclarativo), mostrarPreguntaMejorApoyo, mostrarPreguntaBaneadoFavorito);
}

function mostrarPreguntaMejorApoyo() {
  const opciones = [
    { texto: "JAXZZER", imagen: "FORMULARIO/apoyo_1.png"},
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/apoyo_2.png"},
    { texto: "DAVID", imagen: "FORMULARIO/apoyo_3.png"},
  ];

  const textoAclarativo = "Quien brindo más apoyo en el canal con su diversidad cultural (dibujos, participación, se entregó al chow xd)"

  mostrarPregunta(new PreguntaOpcionMultiple("Viewer que más Apoyó al Canal", opciones, "entry.1823896014", textoAclarativo), mostrarPreguntaMejorVIP, mostrarPreguntaViewerMasFiel)
}

function mostrarPreguntaMejorVIP() {
  const opciones = [
    { texto: "THEMIDNIGHTLED", imagen: "FORMULARIO/vip_1.png"},
    { texto: "FELIPE", imagen: "FORMULARIO/vip_2.jpeg"},
    { texto: "V0LTA", imagen: "FORMULARIO/vip_3.jpeg"},
    { texto: "ELGANCHOS", imagen: "FORMULARIO/vip_4.png"},
    { texto: "DAVID", imagen: "FORMULARIO/vip_5.png"},
    { texto: "LIFENATURAL", imagen: "FORMULARIO/vip_6.png"},
  ];

  const textoAclarativo = "Vip más chévere del año (elegido según observación de un mod)"

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor VIP del Canal", opciones, "entry.170597404", textoAclarativo), mostrarPreguntaModFavorito, mostrarPreguntaMejorApoyo)
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
    { texto: "ELGATU", imagen: "FORMULARIO/mod_9.jpg"},
  ];
  
  const textoAclarativo = "El que hace su trabajo, le cae bien a la gente es chévere y hace reír"

  mostrarPregunta(new PreguntaOpcionMultiple("Mod Favorito del Canal", opciones, "entry.1941000340", textoAclarativo), mostrarPreguntaModLFavorito, mostrarPreguntaMejorVIP)
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
    { texto: "ELGATU", imagen: "FORMULARIO/mod_9.jpg"},
  ];
  
  const textoAclarativo = "El que para hueveando y no merece mod"

  mostrarPregunta(new PreguntaOpcionMultiple("Mod menos Favorito del Canal", opciones, "entry.1154734700", textoAclarativo), mostrarPreguntaShipIconico, mostrarPreguntaModFavorito)
}

function mostrarPreguntaShipIconico() {
  const opciones = [
    { texto: "ROICKXANDRA (ROICK x ALEXANDRA)", imagen: "FORMULARIO/ship_1.png"},
    { texto: "JHESSVROX (JHESS x DREVOX)", imagen: "FORMULARIO/ship_2.png"},
    { texto: "RAIIXANDRA (RAII x ALEXANDRA)", imagen: "FORMULARIO/ship_3.png"},
    { texto: "ALEXAVYXD (ALEXANDRA x D3IVY)", imagen: "FORMULARIO/ship_4.png"},
    { texto: "CLAVOX (SEÑORA CLARA x DREVOX)", imagen: "FORMULARIO/ship_5.png"},
  ];

  const textoAclarativo = "(Ship = Emparejar a dos personas del chat donde crean que haya tensión)"

  mostrarPregunta(new PreguntaOpcionMultiple("Ship más Icónico del Canal", opciones, "entry.2080205506", textoAclarativo), mostrarPreguntaMayorRobo, mostrarPreguntaModLFavorito)
}

function mostrarPreguntaMayorRobo() {
  const opciones = [
    { texto: "Premio al GOTY para Astromrd", imagen: "FORMULARIO/robo_1.png"},
    { texto: "Horas comidas del extensible", imagen: "FORMULARIO/robo_2.jpg"},
    { texto: "Incidente: Pax y el cuarto de pollo", imagen: "FORMULARIO/robo_3.jpg"},
    { texto: "Los 200 soles perdidos en Slots", imagen: "FORMULARIO/robo_4.jpeg"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Robo del Año", opciones, "entry.491190079"), mostrarPreguntaJuegoQuemado, mostrarPreguntaShipIconico)
}

function mostrarPreguntaJuegoQuemado() {
  const opciones = [
    { texto: "FORTNITE", imagen: "FORMULARIO/juego_1.png"},
    { texto: "VALORANT", imagen: "FORMULARIO/juego_2.jpeg"},
    { texto: "LOL (LEAGUE OF LEGENDS)", imagen: "FORMULARIO/juego_3.jpeg"},
    { texto: "LEFT 4 DEAD 2", imagen: "FORMULARIO/juego_4.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Juego más Quemado del Año", opciones, "entry.674454907"), mostrarPreguntaCampañaDeseada, mostrarPreguntaMayorRobo)
}

function mostrarPreguntaCampañaDeseada() {
  const opciones = [
    { texto: "SILENT HILL 2", imagen: "FORMULARIO/campaña_1.png"},
    { texto: "INDIANA JONES", imagen: "FORMULARIO/campaña_2.png"},
    { texto: "GOD OF WAR", imagen: "FORMULARIO/campaña_3.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Campaña más Deseada del Año", opciones, "entry.2057661012"), mostrarPreguntaMejorSerie, mostrarPreguntaJuegoQuemado)
}

function mostrarPreguntaMejorSerie() {
  const opciones = [
    { texto: "GRAVITY FALLS", imagen: "FORMULARIO/serie_1.png"},
    { texto: "ONE PIECE", imagen: "FORMULARIO/serie_2.png"},
    { texto: "DRAGON BALL DAIMA", imagen: "FORMULARIO/serie_3.png"},
    { texto: "CYBERPUNK: EDGERUNNERS", imagen: "FORMULARIO/serie_4.png"},
    { texto: "INVINCIBLE", imagen: "FORMULARIO/serie_5.png"},
    { texto: "ARCANE", imagen: "FORMULARIO/serie_6.png"},
  ];

  const textoAclarativo = "Campaña que te hubiera gustado ver pero la mamalona no puso de su parte"

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Serie del Año", opciones, "entry.1052283597", textoAclarativo), mostrarPreguntaMejorDonador, mostrarPreguntaCampañaDeseada)
}

function mostrarPreguntaMejorDonador() {
  const opciones = [
    { texto: "MICACHERAZO", imagen: "FORMULARIO/donador_1.png"},
    { texto: "DAVID", imagen: "FORMULARIO/donador_2.png"},
    { texto: "MILANESA", imagen: "FORMULARIO/donador_3.png"},
    { texto: "GYBRAM", imagen: "FORMULARIO/donador_4.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Donador del Canal", opciones, "entry.1944514333"), mostrarPreguntaMejorDinamica, mostrarPreguntaMejorSerie)
}

function mostrarPreguntaMejorDinamica() {
  const opciones = [
    { texto: "MOCACHIMBA RACER", imagen: "FORMULARIO/dinamica_1.png"},
    { texto: "SI ME HACES REIR", imagen: "FORMULARIO/dinamica_2.png"},
    { texto: "SPOTIFY WRAPPED", imagen: "FORMULARIO/dinamica_3.png"},
    { texto: "TWITCH RECAP", imagen: "FORMULARIO/dinamica_4.png"},
    { texto: "KARAOKE", imagen: "FORMULARIO/dinamica_5.png"},
    { texto: "CONFESATORIO CON LA DREVOXITA", imagen: "FORMULARIO/dinamica_6.png"}
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Dinámica del Canal", opciones, "entry.1246182248"), mostrarPreguntaMejorCampaña, mostrarPreguntaMejorDonador)
}

function mostrarPreguntaMejorCampaña() {
  const opciones = [
    { texto: "BLACK MYTH: WUKONG", imagen: "FORMULARIO/mcampaña_1.png"},
    { texto: "DARK SOULS III", imagen: "FORMULARIO/mcampaña_2.png"},
    { texto: "SOUTH PARK: THE FRACTURED BUT WHOLE", imagen: "FORMULARIO/mcampaña_3.png"},
    { texto: "CATHERINE CLASSIC", imagen: "FORMULARIO/mcampaña_4.png"},
    { texto: "FNAF: INTO THE PIT", imagen: "FORMULARIO/mcampaña_5.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mejor Campaña del Canal", opciones, "entry.1996664871"), mostrarPreguntaRevientahigados, mostrarPreguntaMejorDinamica)
}

function mostrarPreguntaRevientahigados() {
  const opciones = [
    { texto: "ALTRIX", imagen: "FORMULARIO/higado_1.png"},
    { texto: "LEGOLAZ", imagen: "FORMULARIO/higado_2.png"},
    { texto: "LEGEND", imagen: "FORMULARIO/higado_3.png"},
    { texto: "FELIPE", imagen: "FORMULARIO/higado_4.jpeg"},
    { texto: "CARLPOLL", imagen: "FORMULARIO/higado_5.png"},
  ];

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Reventador de Higados del Canal", opciones, "entry.670098138"), mostrarPreguntaMechaCorta, mostrarPreguntaMejorCampaña)
}

function mostrarPreguntaMechaCorta() {
  const opciones = [
    { texto: "RAWDED", imagen: "FORMULARIO/mecha_1.png"},
    { texto: "DARKNESS", imagen: "FORMULARIO/mecha_2.png"},
    { texto: "JEFFRY", imagen: "FORMULARIO/mecha_3.png"},
    { texto: "TONY", imagen: "FORMULARIO/mecha_4.png"},
  ];

  const textoAclarativo = "Persona que no tiene paciencia al jugar en equipo y lo termina gritando"

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Mecha Corta del Canal", opciones, "entry.1726250007", textoAclarativo), mostrarPreguntaVillanoHater, mostrarPreguntaRevientahigados)
}

function mostrarPreguntaVillanoHater() {
  const opciones = [
    { texto: "TONY", imagen: "FORMULARIO/villano_1.png"},
    { texto: "SONXDARK", imagen: "FORMULARIO/villano_2.png"},
    { texto: "DARKNESS", imagen: "FORMULARIO/villano_3.png"},
    { texto: "ROICK", imagen: "FORMULARIO/villano_4.png"},
  ];

  const textoAclarativo = "Quien siempre tira hate de broma o arma debates polémicos"

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Villano/Hater del Canal", opciones, "entry.1212348438", textoAclarativo), mostrarPreguntaTryhard, mostrarPreguntaMechaCorta)
}

function mostrarPreguntaTryhard() {
  const opciones = [
    { texto: "JEFFRY", imagen: "FORMULARIO/tryhard_1.png"},
    { texto: "DARKNESS", imagen: "FORMULARIO/tryhard_2.png"},
    { texto: "SONXDARK", imagen: "FORMULARIO/tryhard_3.png"},
  ];

  const textoAclarativo = "El mejor jugador de L4D2 en todo el año"

  mostrarPregunta(new PreguntaOpcionMultiple("Mayor Tryhard del Canal", opciones, "entry.1947741075", textoAclarativo), mostrarPantallaConfirmacion, mostrarPreguntaVillanoHater)
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
  alert("Gracias por participar, a continuación serás enviado a un Google Forms para que confirmes tus respuestas manualmente.");
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSctHh8gSn-jjQLz6hrfg-S1Cv6-TZ6HgKWRMc-TAajYrjC-gQ/viewform";

  const params = new URLSearchParams();
  params.append("entry.1976024462", respuestas["entry.1976024462"] || "");  //clip
  params.append("entry.813796303", respuestas["entry.813796303"] || "");    //clip
  params.append("entry.947596321", respuestas["entry.947596321"] || "");    //evento
  params.append("entry.219126118", respuestas["entry.219126118"] || "");    //meme
  params.append("entry.1820309658", respuestas["entry.1820309658"] || "");  //colab
  params.append("entry.383688201", respuestas["entry.383688201"] || "");    //ban
  params.append("entry.136252067", respuestas["entry.136252067"] || "");    //viewer
  params.append("entry.1823896014", respuestas["entry.1823896014"] || "");  //apoyo
  params.append("entry.170597404", respuestas["entry.170597404"] || "");    //vip
  params.append("entry.1941000340", respuestas["entry.1941000340"] || "");  //mod
  params.append("entry.1154734700", respuestas["entry.1154734700"] || "");  //lmod
  params.append("entry.2080205506", respuestas["entry.2080205506"] || "");  //ship
  params.append("entry.491190079", respuestas["entry.491190079"] || "");    //robo
  params.append("entry.674454907", respuestas["entry.674454907"] || "");    //juego
  params.append("entry.2057661012", respuestas["entry.2057661012"] || "");  //camp
  params.append("entry.1052283597", respuestas["entry.1052283597"] || "");  //serie
  params.append("entry.1944514333", respuestas["entry.1944514333"] || "");  //donador
  params.append("entry.1246182248", respuestas["entry.1246182248"] || "");  //dinamica
  params.append("entry.1996664871", respuestas["entry.1996664871"] || "");  //mcamp
  params.append("entry.670098138", respuestas["entry.670098138"] || "");    //higado
  params.append("entry.1726250007", respuestas["entry.1726250007"] || "");  //mecha
  params.append("entry.1212348438", respuestas["entry.1212348438"] || "");  //villano
  params.append("entry.1947741075", respuestas["entry.1947741075"] || "");  //tryhard

  const finalUrl = `${baseUrl}?${params.toString()}`;
  console.log("Redirigiendo a:", finalUrl);
  window.location.href = finalUrl;
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
  logo.style.transform = "scale(4)";
  logo.style.opacity = "0";

  setTimeout(() => {
    mainScreen.classList.add("hidden");
    formScreen.classList.remove("hidden");

    // Mostrar la primera pregunta
    mostrarPreguntaClipFavorito();
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  const particleContainer = document.getElementById("particles-js");
  let isBeat = false;

  // Controlar el volumen del audio (ajústalo a tu preferencia)
  audio.volume = 0;

  // Configurar el intervalo para el tempo de 90 BPM (666.67 ms por beat)
  setInterval(() => {
    isBeat = !isBeat;
    animateParticles(isBeat);
  }, 666.67);

  // Función para animar las partículas en el beat
  function animateParticles(isBeat) {
    if (isBeat) {
      // Aumentar tamaño de partículas rápidamente
      particleContainer.style.transform = "scale(1.25)";
      particleContainer.style.opacity = "0.6"
    } else {
      // Reducir tamaño a la normalidad
      particleContainer.style.transform = "scale(1)";
      particleContainer.style.opacity = "0.2"
    }
  }
});

document.getElementById("start-button").addEventListener("click", () => {
  const audio = document.getElementById("background-music");
  audio.play(); // Inicia la música cuando se hace clic en el botón
});

