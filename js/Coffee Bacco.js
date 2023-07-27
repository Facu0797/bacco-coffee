// Array de producto dinamico

class Producto{
    constructor(id,titulo, imagen, categoria, precio, cantidad){
        this.id = id
        this.titulo = titulo
        this.imagen = imagen
        this.categoria = categoria
        this.precio = precio
        this.cantidad = cantidad
    }
}

const productos = []

const agregarProductosNuevos = ({ id, titulo, imagen, categoria, precio, cantidad }) => {
    if (productos.some(producto => producto.id === id)) {
        console.warn("Ya existe un producto con ese id");
    } else {
        const nuevoProducto = new Producto(id, titulo, imagen, categoria, precio, cantidad);
        productos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }
};



// Arrays de productos base:

const productosBase = [

    // bebidas calientes

    {
        id: "cafe-expresso",
        titulo: "Cafe expresso",
        imagen: "./img/Cafe expresso.jpg",
        categoria: "bebidas-calientes",
        precio: 2
    },
    {
        id: "irish-coffee",
        titulo: "Irish coffee",
        imagen: "./img/Irish coffee.jpg",
        categoria: "bebidas-calientes",
        precio: 3
    },
    {
        id: "latte-macchiato",
        titulo: "Latte macchiato",
        imagen: "./img/Latte macchiato.jpg",
        categoria: "bebidas-calientes",
        precio: 3
    },

    // bebidas frias

    {
        id: "frappe-cafe",
        titulo: "Frappe cafe",
        imagen: "./img/Frappe cafe.jpg",
        categoria: "bebidas-frias",
        precio: 3
    },
    {
        id: "frappe-caramelo",
        titulo: "Frappe caramelo",
        imagen: "./img/Frappe caramelo.jpg",
        categoria: "bebidas-frias",
        precio: 4
    },
    {
        id: "frappe-cereza",
        titulo: "Frappe cereza",
        imagen: "./img/Frappe cereza.jpg",
        categoria: "bebidas-frias",
        precio: 4
    },
    {
        id: "frappe-chocolate",
        titulo: "Frappe chocolate",
        imagen: "./img/Frappe chocolate.jpg",
        categoria: "bebidas-frias",
        precio: 4
    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#numero-carrito");



// funcion que carga los productos al html 
function cargarProductosAlHtml(productosElejidos) {

    contenedorProductos.innerHTML = ""
    
    productosElejidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo"> ${producto.titulo} </h3>
            <p class="producto-precio">€ ${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}"> Agregar </button>
        `;

        contenedorProductos.append(div);
    })

    // funcion para actualizar los botones AGREGAR
    actualizarBotonesAgregar();

}
cargarProductosAlHtml(productosBase)



botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        // Se quita y se agrega el active para pasar de una categoria a otra
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        evento.currentTarget.classList.add("active");
        
        // Navegar entre las categorias
        if (evento.currentTarget.id != "todos") {
            const productoCategoria = productosBase.find(producto => producto.categoria === evento.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria

           
            const productosBoton = productosBase.filter(producto => producto.categoria === evento.currentTarget.id)
            cargarProductosAlHtml(productosBoton)
        } else {
            cargarProductosAlHtml(productosBase)
            tituloPrincipal.innerText = "Todos los productos"
        }

    })
})


// funcion que actualiza los botones "AGREGAR" cada vez que se carga los productos
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    // Hacer click en el boton agregar y que agregue un producto al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

// carrito y localStorage

let productosDelCarrito;
let productosDelCarritoLocalStorage = localStorage.getItem("productos-en-carrito")

if (productosDelCarritoLocalStorage) {
    productosDelCarrito = JSON.parse(productosDelCarritoLocalStorage);
    ActualizarNumeroDelCarrito();

} else {
    productosDelCarrito = [];
}


// funcion para agregar los productos al carrito
function agregarAlCarrito(evento) {
    
    const idBotonAgregar = evento.currentTarget.id;
    const productoAgregado = productosBase.find(producto => producto.id === idBotonAgregar);

    // si la condicion nos devuelve true actualiza la cantidad sino se agrega el producto al carrito
    if (productosDelCarrito.some(producto => producto.id === idBotonAgregar)) {
        const index = productosDelCarrito.findIndex(producto => producto.id === idBotonAgregar);
        productosDelCarrito[index].cantidad++

    } else {
        productoAgregado.cantidad = 1;
        // agregar productos al array del carrito
        productosDelCarrito.push(productoAgregado);
    }
        
    ActualizarNumeroDelCarrito()

    localStorage.setItem("productos-del-carrito", JSON.stringify(productosDelCarrito));

}

// actualizar el numero del carrito cada vez que el usuario agrega un nuevo producto para comprar
function ActualizarNumeroDelCarrito() {
    let numero = productosDelCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numeroCarrito.innerText = numero;
}

