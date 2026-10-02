const cafes = [
    {
        nombre: "Café Americano",
        imagen: "imagenes/coffe1.jpg",
        precio: "$45.00",
        descripcion: "Café de sabor fuerte y equilibrado.",
        detalles: "El café americano se prepara agregando agua caliente a un espresso. Es una bebida suave y conserva el sabor del café."
    },
    {
        nombre: "Café Latte",
        imagen: "imagenes/coffe2.jpg",
        precio: "$55.00",
        descripcion: "Café suave y cremoso.",
        detalles: "El café latte combina espresso con leche vaporizada. Tiene una textura cremosa y un sabor suave."
    },
    {
        nombre: "Cappuccino",
        imagen: "imagenes/coffe3.jpg",
        precio: "$60.00",
        descripcion: "Café con leche y espuma.",
        detalles: "El cappuccino está preparado con espresso, leche vaporizada y espuma de leche."
    },
    {
        nombre: "Café Mocha",
        imagen: "imagenes/coffe4.jpg",
        precio: "$65.00",
        descripcion: "Café con chocolate y leche.",
        detalles: "El café mocha combina espresso, leche y chocolate."
    },
    {
        nombre: "Espresso",
        imagen: "imagenes/coffe5.jpg",
        precio: "$50.00",
        descripcion: "Café concentrado de sabor intenso.",
        detalles: "El espresso es un café concentrado preparado con agua caliente a presión."
    },
    {
        nombre: "Flat White",
        imagen: "imagenes/coffe6.jpg",
        precio: "$58.00",
        descripcion: "Café intenso con leche cremosa.",
        detalles: "El Flat White combina espresso con leche vaporizada."
    },
    {
        nombre: "Macchiato",
        imagen: "imagenes/coffe7.jpg",
        precio: "$52.00",
        descripcion: "Espresso con un toque de leche.",
        detalles: "El Macchiato es un espresso con una pequeña cantidad de leche."
    },
    {
        nombre: "Cold Brew",
        imagen: "imagenes/coffe8.jpg",
        precio: "$62.00",
        descripcion: "Café frío preparado lentamente.",
        detalles: "El Cold Brew se prepara dejando café molido en agua fría durante varias horas."
    }
];

const listaCafes = document.getElementById("lista-cafes");
const detalleProducto = document.getElementById("detalle-producto");
const botonInstalar = document.getElementById("boton-instalar");

let deferredPrompt = null;
const esPaginaDetalle = window.location.pathname.toLowerCase().endsWith("detalle.html");

function renderDetalle(cafe) {
    if (!detalleProducto) {
        return;
    }

    detalleProducto.innerHTML = `
        <div class="producto-detalle">
            <img src="${cafe.imagen}" alt="${cafe.nombre}">

            <div class="producto-meta">
                <h2>${cafe.nombre}</h2>
                <div class="precio-detalle">${cafe.precio}</div>
            </div>

            <span class="badge">Especial del día</span>
            <p>${cafe.descripcion}</p>
            <p>${cafe.detalles}</p>

            <div class="acciones-detalle">
                <button type="button" class="btn-volver">Volver a la lista</button>
                <button type="button" class="btn-ordenar">Ordenar ahora</button>
            </div>
        </div>
    `;

    const btnVolver = detalleProducto.querySelector(".btn-volver");
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
}

function renderListaCafes() {
    if (!listaCafes) {
        return;
    }

    cafes.forEach((cafe, indice) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${cafe.imagen}" alt="${cafe.nombre}">
            <div class="card-info">
                <h2>${cafe.nombre}</h2>
                <p>${cafe.descripcion}</p>
                <span>${cafe.precio}</span>
                <button type="button" data-indice="${indice}">Ver más</button>
            </div>
        `;

        const boton = card.querySelector("button");
        boton.addEventListener("click", () => {
            window.location.href = `detalle.html?id=${indice}`;
        });

        listaCafes.appendChild(card);
    });
}

if (esPaginaDetalle) {
    const params = new URLSearchParams(window.location.search);
    const cafeIndex = Number(params.get("id") || 0);
    const cafeSeleccionado = cafes[cafeIndex] || cafes[0];
    renderDetalle(cafeSeleccionado);
} else {
    renderListaCafes();
}

if (botonInstalar) {
    botonInstalar.addEventListener("click", async () => {
        if (!deferredPrompt) {
            return;
        }

        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        botonInstalar.hidden = true;
    });
}

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    if (botonInstalar) {
        botonInstalar.hidden = false;
    }
});

window.addEventListener("appinstalled", () => {
    if (botonInstalar) {
        botonInstalar.hidden = true;
    }
});