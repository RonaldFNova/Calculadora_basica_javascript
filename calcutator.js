let ActivarCero = true;
let valor;
let respuesta;
let ArrayOperaciones = [];
let cantidad = 0;
let cantidadcero = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Pantalla").value = "0"

  let historialGuardado = localStorage.getItem("historial");
  let historialArray = JSON.parse(historialGuardado);

  if(historialArray.length >= 1)
  {
    ArrayOperaciones = historialArray;
    cantidad = historialArray.length;

    for (let n = 0; n < cantidad; n++) {
      let elemento = document.createElement("div");
      elemento.classList.add("historial-item");
      elemento.id = n;
      elemento.textContent = ArrayOperaciones[n];
      document.getElementById("history__box").appendChild(elemento);
      
      let botonElmininar = document.createElement("button");
      let botonCopiar = document.createElement("button");

      botonElmininar.classList.add("boton-eliminar");
      botonCopiar.classList.add("boton-copiar");

      botonElmininar.id = n;
      botonCopiar.id = n;

      botonElmininar.textContent = "Eliminar";
      botonCopiar.textContent = "Copiar";

      botonElmininar.addEventListener("click", function (){
        elemento.remove()
        ArrayOperaciones.splice(n, 1);
      });

      botonCopiar.addEventListener("click", function (){
        let texto = document.getElementById(n).textContent;
        texto = texto.replace("Eliminar","")
        texto = texto.replace("Copiar","")
        navigator.clipboard.writeText(texto)  
      });

      document.getElementById(n).appendChild(botonElmininar);
      document.getElementById(n).appendChild(botonCopiar);
          
    }
  }

});

window.addEventListener("beforeunload", function (){
  localStorage.setItem("historial", JSON.stringify(ArrayOperaciones));

});

function AgregarDato(caracter) {

  if (caracter === "0") {

    if (ActivarCero){
      cantidadcero +=1;
      return;
    } 


    ActivarCero = false;

    document.getElementById("Pantalla").value += caracter;
  }
  else {

  if (cantidadcero > 0)
    {
      document.getElementById("Pantalla").value += caracter;
      cantidadcero = 0 ;
      ActivarCero = false;
      return;
    }

  if (ActivarCero) {

    if(ValidarParentesis(caracter)) return;

    document.getElementById("Pantalla").value = caracter;
    ActivarCero = false;
    return;

   }

    else if(ValidarParentesis(caracter)) return;

    document.getElementById("Pantalla").value += caracter;
    ActivarCero = false;
  }
  
}


function BorrarDatos() {
  document.getElementById("Pantalla").value = "0";
  ActivarCero = true;
}

function BorrarCaracter() {
  const pantalla = String(document.getElementById("Pantalla").value);
  const total = pantalla.slice(0, pantalla.length - 1);

  if (pantalla.length == 1) {
    document.getElementById("Pantalla").value = "0";
    ActivarCero = true;
    return;
  }
  document.getElementById("Pantalla").value = total;
}

function OperacionTotal() {
  valor = String(document.getElementById("Pantalla").value);
  let valorCambiado = valor.replace("x", "*");
  valorCambiado = valorCambiado.replace("÷", "/");
  respuesta = eval(valorCambiado);
  document.getElementById("Pantalla").value = respuesta;
  GuardarOperacion(valorCambiado, respuesta)
}

function GuardarOperacion(valor, respuesta) {
  let total = valor + " = " + respuesta;
  ArrayOperaciones.push(total);

  let elemento = document.createElement("div");
  elemento.classList.add("historial-item");
  elemento.id = cantidad;
  elemento.textContent = total;
  document.getElementById("history__box").appendChild(elemento);

  let botonElmininar = document.createElement("button");
  let botonCopiar = document.createElement("button");

  botonElmininar.classList.add("boton-eliminar");
  botonCopiar.classList.add("boton-copiar");

  botonElmininar.id = cantidad;
  botonCopiar.id = cantidad;

  botonElmininar.textContent = "Eliminar";
  botonCopiar.textContent = "Copiar";

  botonElmininar.addEventListener("click", function (){
    elemento.remove()

  });

  botonCopiar.addEventListener("click", function (){
    let texto = document.getElementById(cantidad-1).textContent;
    texto = texto.replace("Eliminar","")
    texto = texto.replace("Copiar","")
    navigator.clipboard.writeText(texto)  
  });

  document.getElementById(cantidad).appendChild(botonElmininar);
  document.getElementById(cantidad).appendChild(botonCopiar);

  cantidad += 1;
}

function ValidarParentesis(caracter) {
  if (caracter == "ParentesisIZ") {

    if (ActivarCero)
    {
      document.getElementById("Pantalla").value = ")";
      ActivarCero = false;
      return true;
    }

    document.getElementById("Pantalla").value += ")";
    return true;
  }

  else if (caracter == "ParentesisD"){

    if (ActivarCero)
    {
      document.getElementById("Pantalla").value = "(";
      ActivarCero = false;
      return true;
    }

    document.getElementById("Pantalla").value += "(";
    return true;
  }
}