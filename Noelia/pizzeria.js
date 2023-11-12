window.onload = function(){
    
    enviarPeticionAsincrona();

    document.getElementById('botonRefrescar').addEventListener('click', function() {
        enviarPeticionAsincrona();
    });
        
    botonProcesar.onclick = calcularPrecio;

    

}


/*Se indica la ruta de donde se encuentra el servidor, en este caso, el fichero JSON que contiene los datos*/
const URL_DESTINO = "http://localhost:5501/AE_2_AJAX/"
const RECURSO = "pizzeria.json"

/* Método para enviar una petición ASINCRONA al servidor */
function enviarPeticionAsincrona() {

    /*Se declara el objeto XMLHttpRequest para realizar la petición AJAX.*/
    let xmlHttp = new XMLHttpRequest()

    /*Se declara la función callback que se ejecuta solo cuando el servidor responda 
      la petición y entonces se ejecutará 'procesarRespuesta' donde se convierte el 
      objeto texto que llega del servidor a un objeto JSON para procesarlo. 
     */
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)//En JSON se obtiene el valor en texto
            } else {
                alert("ZASCA!")
            }
        }
    }

    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)

        // Limpiar contenido existente antes de hacer la nueva petición
        while (divTamaño.firstChild) {
            divTamaño.removeChild(divTamaño.firstChild);
        }
        while (divIngredientes.firstChild) {
            divIngredientes.removeChild(divIngredientes.firstChild);
        }
}


/*Dentro de esta función se genera el HTML correspondiente mediante el DOM. En este caso se va a 
  generar...  */
function procesarRespuesta(jsonDoc) { //ESTA FUNCION SE LE ASIGNA AL BOTON REFRESCAR? 
    //Se convierte un texto a un objeto JSON
    var objetoJson = JSON.parse(jsonDoc)
    console.log(objetoJson)

    
    /*Se crean mediante el DOM los elementos necesarios */
    var fieldset = document.createElement("fieldset")
    var legend = document.createElement("legend")
    var texto1 = document.createTextNode("Elige el tamaño de tu pizza:")
    legend.appendChild(texto1)
    fieldset.appendChild(legend)
    divTamaño.appendChild(fieldset)

    var selectTamaños = document.createElement("select"); //Se crea la etiqueta <select></select> 
    selectTamaños.name = "tamañosDePizza";//Se crea el name de la etiqueta <select name="Tamaños de pizza"></select> 
    fieldset.appendChild(selectTamaños);//Se añade el SELECT al FIELDSET.

    //Se crean las opciones del SELECT en las que se va a recorrer los tamaños de pizza. 
    /* Primero se declara una variable para obtener los datos de los TAMAÑOS de las pizzas con su precio
        en dicha variable. 
    */
    let arrayTamaños = objetoJson.PIZZERIA.TAMAÑOS
    for (let pizza of arrayTamaños) {
        var opcion = document.createElement("option");
        opcion.value = pizza.nombre; // El valor de la opción es el nombre del tamaño
        opcion.text = pizza.nombre + " - Precio: " + pizza.precio + "€"; // Texto visible en la opción
        selectTamaños.appendChild(opcion);


        // ESTO SIRVE PARA RECOGER EL VALUE DEL PRECIO
        let valor = document.createAttribute("value")
        valor.value = pizza.precio;
        opcion.setAttributeNode(valor);
    }
   

    // Se realiza lo mismo para INGREDIENTES de las pizzas.
    var fieldset2 = document.createElement("fieldset")
    var legend2 = document.createElement("legend")
    var texto2 = document.createTextNode("Elige tus ingredientes de tu Pizza")
    legend2.appendChild(texto2)
    fieldset2.appendChild(legend2)
    divIngredientes.appendChild(fieldset2)


    //Se crean las opciones del CHECKBOX en las que se va a recorrer los ingredientes de la pizza. 
    var arrayIngredientes = objetoJson.PIZZERIA.INGREDIENTES
    for (let pizzai of arrayIngredientes) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox"; // Establece el tipo como checkbox
        checkbox.name = "ingredientes"; // Establece un nombre para agrupar los checkboxes
        checkbox.value = pizzai.topping; // Establece el valor del checkbox
        checkbox.id = pizzai.topping; // Establece un ID para el label del imput

        // Se crea una etiqueta label para el checkbox con el nombre del ingrediente y su precio
        var label = document.createElement("label");
        label.textContent = pizzai.topping + " - " + pizzai.precio + " €" ;
        label.setAttribute("for", pizzai.topping);
        var br = document.createElement("br");
        fieldset2.appendChild(br); 

        // Agregar el checkbox y la etiqueta al divIngredientes
        divIngredientes.appendChild(checkbox);
        divIngredientes.appendChild(label);
        fieldset2.appendChild(checkbox);
        fieldset2.appendChild(label);

        // ESTO SIRVE PARA RECOGER EL VALUE DEL PRECIO
        let valor = document.createAttribute("value");
        valor.value = pizzai.precio;
        checkbox.setAttributeNode(valor);
       
    }
    
}

/*
function calcularPrecio() {
    let resultado = 0;

    // Tamaños de pizza
    //let arrayTamaños = objetoJson.PIZZERIA.TAMAÑOS
    let tamaños = ['XXS', 'Pequeña', 'Mediana', 'Grande', 'XXL', 'Limusina'];
    for (let tamaño of tamaños) {
        if (document.getElementsByName(tamaño).checked) {
            let precio = document.getElementsByName(tamaño).value;
            let num = parseInt(precio);
            resultado += num;
        }
    }

    // Ingredientes
    let ingredientes = ['Piña', 'Queso', 'Aceitunas', 'Bacon', 'Carne picada', 'atún'];
    //let arrayIngredientes = objetoJson.PIZZERIA.INGREDIENTES
    for (let ingrediente of ingredientes) {
        if (document.getElementById(ingrediente).checked) {
            let precio = document.getElementById(ingrediente).value;
            let num = parseInt(precio);
            resultado += num;
        }
    }

    alert("El importe de tu pedido es: " + resultado + " euros");
}
*/

function calcularPrecio() {
    let resultado = 0;

    // Tamaños de pizza
    let selectTamaños = document.getElementsByName("tamañosDePizza")[0];
    let selectedTamaño = selectTamaños.options[selectTamaños.selectedIndex];
    let precioTamaño = parseInt(selectedTamaño.value);
    resultado += precioTamaño;

    // Ingredientes
    let checkboxesIngredientes = document.getElementsByName("ingredientes");
    for (let checkbox of checkboxesIngredientes) {
        if (checkbox.checked) {
            let precioIngrediente = parseInt(checkbox.value);
            resultado += precioIngrediente;
        }
    }

    // Mostrar el resultado
    //alert("El importe de tu pedido es: " + resultado + " euros");
    document.getElementById("precioTotal").value = resultado + " €";
}

