
let productosDelCarrito = localStorage.getItem("productos-del-carrito");
productosDelCarrito = JSON.parse(productosDelCarrito)

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosAlCarrito() {
    
    if (productosDelCarrito && productosDelCarrito.length > 0) {

        // mostrar los contenedores del carrito
        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = ""
    
        // mostrar los productos en el carrito
        productosDelCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>€${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Total</small>
                    <p>€${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">Eliminar</button>
            `;
    
            carritoProductos.append(div);
        })
    
    } else {
        // si se borran productos del carrito 
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosAlCarrito()


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    // Hacer click en el boton eliminar para eliminar un producto del carrito
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

// funcion para eliminar productos del carrito
function eliminarDelCarrito(evento) {

    /***** Libreria de Toastify *****/
    Toastify({
        text: "Se elimino el producto",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #ff6347, #f1b0a4)",
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){}
      }).showToast();

    const idBotonEliminar = evento.currentTarget.id;
    const index = productosDelCarrito.findIndex(producto => producto.id === idBotonEliminar);

    productosDelCarrito.splice(index, 1);
    cargarProductosAlCarrito();

    localStorage.setItem("productos-del-carrito", JSON.stringify(productosDelCarrito));
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
// funcion que vacia todo el carrito
function vaciarCarrito() {

    /***** Libreria de SweetAlert *****/
    Swal.fire({
        title: 'Cuidado',
        icon: 'question',
        html: 'Se eliminaran todos tus productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Eliminar productos',
        cancelButtonText: 'Continuar la compra',
      }).then((result) => {
        if (result.isConfirmed) {
            productosDelCarrito.length = 0
            localStorage.setItem("productos-del-carrito", JSON.stringify(productosDelCarrito));
            
            cargarProductosAlCarrito();
        }
      })


}

// funcion que actualiza el precio total de todos los productos que se encuentran en el carrito
function actualizarTotal() {
    const totalCalculado = productosDelCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    total.innerText = `€${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
// funcion para comprar los productos y vaciar el carrito una vez que se haya efectuado la compra
function comprarCarrito() {
    
    productosDelCarrito.length = 0
    localStorage.setItem("productos-del-carrito", JSON.stringify(productosDelCarrito));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}