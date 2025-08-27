/************************************************************
 * 1. VARIABLES Y TIPOS DE DATOS
 ************************************************************/

// var permite redeclaración y reasignación (poco recomendable hoy)
var mensaje = "Hola desde var";
console.log("var:", mensaje);

var mensaje = "Nuevo valor con var";
console.log("var redeclarado:", mensaje);

// let permite reasignación pero no redeclaración
let nombre = "Andrea";
console.log("let:", nombre);

nombre = "Carlos"; // reasignación permitida
console.log("let reasignado:", nombre);

// const no permite ni redeclaración ni reasignación
const idioma = "Español";
console.log("const:", idioma);

// idioma = "Inglés"; // Error: no se puede reasignar una constante

// Tipos de datos básicos
let texto = "Cadena de texto";
let numero = 42;
let decimal = 3.14;
let booleano = true;
let indefinido;
let nulo = null;
let arreglo = [1, 2, 3];
let objeto = { clave: "valor" };

console.log(typeof texto, typeof numero, typeof booleano, typeof nulo);


/************************************************************
 * 2. FUNCIONES
 ************************************************************/

// Función que no recibe parámetros
function saludar() {
  console.log("Hola, bienvenido.");
}
saludar();

// Función que recibe un parámetro
function saludarPersona(nombre) {
  console.log("Hola, " + nombre + ".");
}
saludarPersona("María");

// Función que devuelve un valor
function sumar(a, b) {
  return a + b;
}
let resultado = sumar(5, 3);
console.log("Resultado de suma:", resultado);

// Función anónima
const multiplicar = function (x, y) {
  return x * y;
};
console.log("Multiplicación:", multiplicar(2, 4));

// Función flecha (arrow function)
const dividir = (a, b) => {
  return a / b;
};
console.log("División:", dividir(10, 2));


/************************************************************
 * 3. CONDICIONALES Y BUCLES
 ************************************************************/

let edad = 20;

if (edad >= 18) {
  console.log("Es mayor de edad");
} else {
  console.log("Es menor de edad");
}

// Bucle for
for (let i = 0; i < 5; i++) {
  console.log("Valor de i:", i);
}

// Bucle while
let contador = 0;
while (contador < 3) {
  console.log("Contador:", contador);
  contador++;
}


/************************************************************
 * 4. EVENTOS (interacción con el usuario)
 ************************************************************/

// Se necesita que exista un botón en el HTML con id="botonSaludo"
// <button id="botonSaludo">Saludar</button>

const boton = document.getElementById("botonSaludo");

if (boton) {
  boton.addEventListener("click", function () {
    console.log("Botón clickeado");
  });
}


/************************************************************
 * 5. MANIPULACIÓN DEL DOM (Document Object Model)
 ************************************************************/

// Se necesita un contenedor con id="contenedor" en el HTML
// <div id="contenedor"></div>

// Crear un nuevo elemento
const nuevoParrafo = document.createElement("p");
nuevoParrafo.textContent = "Este párrafo fue creado con JavaScript";

// Insertarlo en el DOM
const contenedor = document.getElementById("contenedor");

if (contenedor) {
  contenedor.appendChild(nuevoParrafo);
}

// Cambiar estilos desde JavaScript
nuevoParrafo.style.color = "blue";
nuevoParrafo.style.fontWeight = "bold";

// Modificar atributos de un input
// <input type="text" id="nombreInput" placeholder="Tu nombre">

const nombreInput = document.getElementById("nombreInput");

if (nombreInput) {
  nombreInput.value = "Valor asignado por JS";
  nombreInput.style.border = "2px solid green";
}


/************************************************************
 * FIN DEL ARCHIVO
 ************************************************************/
