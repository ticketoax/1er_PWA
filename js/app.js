
const coffeeProducts = [
  {
    title: "Café Americano",
    description: "Café intenso y equilibrado.",
    details: "Preparado con espresso y agua caliente. Ideal para disfrutar un sabor fuerte y limpio en cualquier momento del día.",
    ingredients: "Espresso doble y agua caliente.",
    temperature: "Caliente",
    origin: "Granos Arábica de Chiapas.",
    recommendation: "Perfecto para acompañar pan dulce, galletas o un desayuno ligero.",
    price: 45.0,
    image: "/imagenes/coffe1.jpg",
    alt: "Café Americano"
  },
  {
    title: "Café Latte",
    description: "Suave, cremoso y aromático.",
    details: "Una combinación de espresso, leche vaporizada y una fina capa de espuma. Perfecto para acompañar algo dulce.",
    ingredients: "Espresso, leche vaporizada y espuma de leche.",
    temperature: "Caliente",
    origin: "Granos Arábica de Veracruz.",
    recommendation: "Ideal para acompañar con un croissant, pastel de vainilla o galletas.",
    price: 55.0,
    image: "/imagenes/coffe2.jpg",
    alt: "Café Latte"
  },
  {
    title: "Cappuccino",
    description: "Espuma suave y sabor intenso.",
    details: "Equilibrio perfecto entre espresso, leche vaporizada y abundante espuma de leche.",
    ingredients: "Espresso, leche vaporizada y espuma.",
    temperature: "Caliente",
    origin: "Mezcla de granos mexicanos.",
    recommendation: "Excelente para iniciar el día acompañado de un muffin o pan artesanal.",
    price: 60.0,
    image: "/imagenes/coffe3.jpg",
    alt: "Cappuccino"
  },
  {
    title: "Café Mocha",
    description: "Café con un toque de chocolate.",
    details: "Espresso, leche vaporizada y chocolate se combinan para crear una bebida dulce y reconfortante.",
    ingredients: "Espresso, chocolate, leche vaporizada y crema batida.",
    temperature: "Caliente",
    origin: "Granos seleccionados de Oaxaca.",
    recommendation: "Ideal para quienes disfrutan bebidas dulces y postres.",
    price: 65.0,
    image: "/imagenes/coffe4.jpg",
    alt: "Café Mocha"
  },
  {
    title: "Espresso",
    description: "Pequeño, concentrado y potente.",
    details: "Un shot de café concentrado con aroma intenso y una delicada capa de crema.",
    ingredients: "100% café espresso.",
    temperature: "Caliente",
    origin: "Granos Arábica Premium.",
    recommendation: "Perfecto después de los alimentos o para un impulso de energía.",
    price: 50.0,
    image: "/imagenes/coffe5.jpg",
    alt: "Espresso"
  },
  {
    title: "Flat White",
    description: "Cremoso y balanceado.",
    details: "Espresso cubierto con leche texturizada y una fina capa de microespuma.",
    ingredients: "Espresso doble y leche texturizada.",
    temperature: "Caliente",
    origin: "Granos de altura de Chiapas.",
    recommendation: "Excelente con pan artesanal o tostadas.",
    price: 58.0,
    image: "/imagenes/coffe6.jpg",
    alt: "Flat White"
  },
  {
    title: "Macchiato",
    description: "Espresso con un toque de leche.",
    details: "Conserva toda la intensidad del espresso con una ligera espuma de leche.",
    ingredients: "Espresso y espuma de leche.",
    temperature: "Caliente",
    origin: "Café mexicano de especialidad.",
    recommendation: "Ideal para amantes del café fuerte y aromático.",
    price: 52.0,
    image: "/imagenes/coffe7.jpg",
    alt: "Macchiato"
  },
  {
    title: "Cold Brew",
    description: "Frío, suave y refrescante.",
    details: "Extraído lentamente en frío durante varias horas para lograr un sabor menos ácido.",
    ingredients: "Café de extracción en frío, agua y hielo.",
    temperature: "Frío",
    origin: "Granos Arábica seleccionados.",
    recommendation: "Perfecto para tardes calurosas y días de verano.",
    price: 62.0,
    image: "/imagenes/coffe8.jpg",
    alt: "Cold Brew"
  },
  {
    title: "Cold Brew",
    description: "Frío, suave y refrescante.",
    details: "Extraído lentamente en frío durante varias horas para lograr un sabor menos ácido.",
    ingredients: "Café de extracción en frío, agua y hielo.",
    temperature: "Frío",
    origin: "Granos Arábica seleccionados.",
    recommendation: "Perfecto para tardes calurosas y días de verano.",
    price: 62.0,
    image: "/imagenes/coffe9.jpg",
    alt: "Cold Brew"
  },
  {
    title: "Cold Brew",
    description: "Frío, suave y refrescante.",
    details: "Extraído lentamente en frío durante varias horas para lograr un sabor menos ácido.",
    ingredients: "Café de extracción en frío, agua y hielo.",
    temperature: "Frío",
    origin: "Granos Arábica seleccionados.",
    recommendation: "Perfecto para tardes calurosas y días de verano.",
    price: 62.0,
    image: "/imagenes/coffe10.jpeg",
    alt: "Cold Brew"
  }
];

const coffeeList = document.getElementById("coffee-list");
const detailPage = document.getElementById("detalle-producto");

let deferredInstallPrompt;

const installButton = document.getElementById("install-button");

// Instalación de Coffee PWA
if (installButton) {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    deferredInstallPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();

    const { outcome } = await deferredInstallPrompt.userChoice;

    deferredInstallPrompt = null;

    if (outcome === "accepted") {
      installButton.hidden = true;
    }
  });

  window.addEventListener("appinstalled", () => {
    installButton.hidden = true;
    deferredInstallPrompt = null;
  });
}

function renderProducts() {
  if (!coffeeList) return;

  coffeeList.innerHTML = coffeeProducts.map((product, index) => `
    <article class="card">
      <img src="${product.image}" alt="${product.alt}" loading="lazy">

      <div class="card-info">
        <h2>${product.title}</h2>

        <p>${product.description}</p>

        <span>$${product.price.toFixed(2)}</span>

        <a class="view-more" href="/detalle.html?product=${index}">
          Ver más
        </a>
      </div>
    </article>
  `).join("");

  // Inicializar la sección de Pokémon si está disponible
  if (document.getElementById("pokemon-list") && window.PokemonUI) {
    window.PokemonUI.initHome("pokemon-list");
  }
}

function renderProductDetailPage() {
  if (!detailPage) return;

  const urlParams = new URLSearchParams(window.location.search);
  const pokemonId = urlParams.get("pokemon");

  // Mostrar detalles de Pokémon cuando corresponda
  if (pokemonId) {
    if (window.PokemonUI) {
      window.PokemonUI.initDetail(pokemonId, "detalle-producto");
    }
    return;
  }

  // Mostrar detalles del café seleccionado
  const productIndex = Number(urlParams.get("product"));
  const product = coffeeProducts[productIndex];

  if (!product) {
    window.location.href = "/index.html";
    return;
  }

  detailPage.innerHTML = `
    <article class="detail-content">

      <a class="back-button" href="/index.html">
        ← Volver al menú
      </a>

      <img src="${product.image}" alt="${product.alt}">

      <div class="detail-info">

        <h2>${product.title}</h2>

        <span>$${product.price.toFixed(2)}</span>

        <p>${product.description}</p>

        <p>${product.details}</p>

        <div class="product-extra">

          <h3>Información del producto</h3>

          <p><strong>🥛 Ingredientes:</strong> ${product.ingredients}</p>

          <p><strong>🌡 Temperatura:</strong> ${product.temperature}</p>

          <p><strong>🌎 Origen:</strong> ${product.origin}</p>

          <p><strong>🍰 Recomendación:</strong> ${product.recommendation}</p>

        </div>

      </div>

    </article>
  `;
}

renderProducts();
renderProductDetailPage();

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then((registration) => {
        console.log(
          "Service Worker registrado con éxito:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Error al registrar el Service Worker:",
          error
        );
      });
  });
} else {
  console.log("Este navegador no soporta Service Workers.");
}
