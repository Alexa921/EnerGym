document.addEventListener("DOMContentLoaded", function () {
    mostrarCarrito();
    actualizarContador();

    const botonCarrito = document.querySelector(".btn-carrito");
    if (botonCarrito) {
        botonCarrito.addEventListener("click", function () {
            const selectPaquete = document.getElementById("paquete");

            if (!selectPaquete || selectPaquete.value === "") {
                alert("Por favor selecciona un paquete.");
                return;
            }

            const nombreProducto = document.querySelector(".product-info h2").textContent;
            const precioProducto = 100000; // Precio fijo en COP
            const paquete = selectPaquete.value;
            const imagenProducto = document.querySelector(".product-image img")?.getAttribute("src") || "";

            agregarAlCarrito(nombreProducto, precioProducto, paquete, 1, imagenProducto);
        });
    }
});

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let carritoDiv = document.getElementById("carrito");
    let total = 0;

    if (carritoDiv) {
        carritoDiv.innerHTML = "";

        carrito.forEach((producto, index) => {
            let item = document.createElement("div");
            item.classList.add("item-carrito");
            let precioTotal = producto.precio * producto.cantidad;

            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width:60px; height:60px; object-fit:cover; margin-right:10px;">
                <p>${producto.nombre} (${producto.tamano}) x${producto.cantidad} - ${formatearPrecio(precioTotal)}</p>
                <button onclick="eliminarDelCarrito(${index})">❌ Eliminar</button>
            `;
            carritoDiv.appendChild(item);
            total += precioTotal;
        });

        const totalElem = document.getElementById("total");
        if (totalElem) totalElem.textContent = formatearPrecio(total);
    }

    actualizarContador();
}

function agregarAlCarrito(nombre, precio, tamano, cantidad, imagen) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio, tamano, cantidad, imagen });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    localStorage.setItem("contadorCarrito", totalProductos);

    let contadorElem = document.getElementById("contador");
    if (contadorElem) {
        contadorElem.textContent = totalProductos;
    }
}

function formatearPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0
    });
}
