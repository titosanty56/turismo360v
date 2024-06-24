'use strict'
let form = document.querySelector('#form');
form.addEventListener('submit', agregar);

let mensaje = document.querySelector("#enviar");
mensaje.addEventListener('click', enviar);

let random = Math.floor(Math.random() * 1000);
let numero = random;
//numero aleatorio
let numerorandom = document.querySelector("#numero-random").innerHTML = numero

//boton para verificar si sos un robot
let btnverificar = document.querySelector("#btn-verificar");
btnverificar.addEventListener('click', verificar)

//MENU DESPLEGABLE DEL FORM
document.querySelector(".btn_menu-form").addEventListener("click", toggleMenu);

function toggleMenu() {
  document.querySelector(".navigation").classList.toggle("show");

}


function generarnumero() {
  console.log(random);
  let numerorandom = document.querySelector("#numero-random");
  numerorandom.innerHTML = numero;
}


function agregar(e) {
  e.preventDefault();

  // se obtienen todos los datos del form
  let formData = new FormData(form);

  //obtengo los datos ingresados en el form segun name de cada input
  let email = formData.get('email');
  let nombre = formData.get('nombre');
  let mensaje = formData.get('mensaje');
  console.log(email, nombre, mensaje)
  document.querySelector("#ingreso").innerHTML;
}

function enviar() {
    let gracias = document.querySelector("#agradecimiento");
    let input = parseInt(document.querySelector("#input-numero").value);
    if (numero === input) {
      gracias.innerHTML = "gracias por contactarnos!"
    }
  
    else {
      gracias.innerHTML = "error, intentelo nuevamente!"
    }
}

function verificar() {
  let input = parseInt(document.querySelector("#input-numero").value);
  let correcto = document.querySelector("#correcto");

  if (numero === input) {
    correcto.innerHTML = "correcto, eres humano!";
    
  }

  else {
    correcto.innerHTML = "incorrecto,eres un robot!";
  }
  }



