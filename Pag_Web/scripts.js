document.addEventListener("DOMContentLoaded", () => { // Espera a que el DOM esté completamente cargado
    const carritoIcon = document.getElementById("carrito-icon"); // Obtiene el icono del carrito
    const carritoModal = document.getElementById("carrito-modal"); // Obtiene el modal del carrito
    const carritoOverlay = document.getElementById("carrito-overlay"); // Obtiene el overlay del carrito
    const cerrarCarrito = document.getElementById("cerrar-carrito"); // Obtiene el botón para cerrar el carrito
    const cartCount = document.getElementById("cart-count"); // Obtiene el contador de productos en el carrito
    const listaCarrito = document.getElementById("lista-carrito"); // Obtiene la lista de productos en el carrito

    function abrirCarrito() { // Función para abrir el modal del carrito
        carritoModal.classList.add("active"); // Muestra el modal del carrito
        carritoOverlay.classList.add("active"); // Muestra el overlay oscuro
        document.body.style.overflow = 'hidden'; // Evita el scroll en el fondo
    }

    function cerrarCarritoFn() { // Función para cerrar el modal del carrito
        carritoModal.classList.remove("active"); // Oculta el modal del carrito
        carritoOverlay.classList.remove("active"); // Oculta el overlay oscuro
        document.body.style.overflow = ''; // Permite el scroll nuevamente
    }

    carritoIcon.addEventListener("click", (e) => { // Al hacer clic en el icono del carrito
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
        abrirCarrito(); // Abre el carrito
    });

    cerrarCarrito.addEventListener("click", cerrarCarritoFn); // Al hacer clic en el botón de cerrar, cierra el carrito
    carritoOverlay.addEventListener("click", cerrarCarritoFn); // Al hacer clic en el overlay, cierra el carrito
    document.addEventListener("keydown", (e) => { // Escucha la tecla Escape
        if (e.key === "Escape" && carritoModal.classList.contains("active")) { // Si el modal está abierto y se presiona Escape
            cerrarCarritoFn(); // Cierra el carrito
        }
    });

    const btnComprar = document.getElementById("btn-comprar"); // Obtiene el botón "COMPRAR NUEVO"
    if (btnComprar) { // Si existe el botón
        btnComprar.addEventListener("click", () => { // Al hacer clic en el botón
            let count = parseInt(cartCount.textContent); // Obtiene el número actual de productos en el carrito
            cartCount.textContent = count + 1; // Incrementa el contador

            if (listaCarrito.children.length === 1 && listaCarrito.children[0].textContent === "No hay productos aún.") {
                listaCarrito.innerHTML = ""; // Si el carrito está vacío, limpia el mensaje
            }

            const nuevoItem = document.createElement("li"); // Crea un nuevo elemento de lista
            nuevoItem.textContent = "Producto " + (count + 1); // Asigna el nombre del producto
            listaCarrito.appendChild(nuevoItem); // Lo agrega a la lista del carrito

            abrirCarrito(); // Abre el carrito
        });
    }

    // Filtro de productos
    const filterButtons = document.querySelectorAll(".filtro-bar button"); // Obtiene todos los botones de filtro
    const productos = document.querySelectorAll(".producto"); // Obtiene todos los productos

    filterButtons.forEach(btn => { // Para cada botón de filtro
        btn.addEventListener("click", () => { // Al hacer clic en el botón
            filterButtons.forEach(b => b.classList.remove("active")); // Quita la clase 'active' de todos los botones
            btn.classList.add("active"); // Agrega la clase 'active' al botón seleccionado
            const category = btn.dataset.category; // Obtiene la categoría seleccionada
            productos.forEach(prod => { // Para cada producto
                prod.style.display = (category === "all" || prod.dataset.category === category) ? "block" : "none"; // Muestra u oculta el producto según la categoría
            });
        });
    });

    // Añadir productos al carrito al hacer clic sobre ellos
    productos.forEach(producto => { // Para cada producto
        producto.addEventListener("click", () => { // Al hacer clic en el producto
            const nombreProducto = producto.querySelector("p").textContent; // Obtiene el nombre del producto
            let count = parseInt(cartCount.textContent); // Obtiene el número actual de productos en el carrito
            cartCount.textContent = count + 1; // Incrementa el contador

            if (listaCarrito.children.length === 1 && listaCarrito.children[0].textContent === "No hay productos aún.") {
                listaCarrito.innerHTML = ""; // Si el carrito está vacío, limpia el mensaje
            }

            const nuevoItem = document.createElement("li"); // Crea un nuevo elemento de lista
            nuevoItem.textContent = nombreProducto; // Asigna el nombre del producto
            listaCarrito.appendChild(nuevoItem); // Lo agrega a la lista del carrito

            abrirCarrito(); // Abre el carrito
        });

        producto.style.cursor = "pointer"; // Cambia el cursor a pointer para indicar que es clickeable
    });
});