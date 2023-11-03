/**
 * Con esta funcion hacemos que las funciones se cargen una vez la pagina se haya cargado completamente
 */
window.onload = function(){
    
    enviarPeticionAsincrona();

    /**
     * Para evitar que la funcion cargarCalcular se ejecute antes de tiempo hacemos un preventDefault
     * de esta manera solo se activara una vez le pulsemos sobre el boton enviar peticion
     */
    calcular.onclick = function(e){
        if(!cargarCalcular()){
          e.preventDefault()
        }
    }
    
}



  
const url_destino = "http://localhost:5501/Web_Entorno_Cliente_AE-2/Gerard_Perujo/"//ruta donde se encuentra el archivo json que simula una BBDD
const recurso = "precios.json"// el archivo json que contiene todos los datos

/**
 * Creamos la funcion asincrona para que nos coja el archivo json con todos los campos que hay en el
 * en este caso el archivo json haria de simulacion de acceso a BBDD
 */
function enviarPeticionAsincrona(){
    console.log()
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function(){
        if(this.readyState == 4){
            if (this.status == 200){
                procesarRespuesta(this.responseText)
            }else{
                alert("Error")
            }
        }
    }

    xmlHttp.open('GET', url_destino + recurso, true)
    xmlHttp.send(null)
    
}

/**
 * con la funcion procesarRespuesta nos entra un archivo json con todos los campos que contiene y creamos el DOM
 * cogiendo los campos del archivo Json
 * 
 * @param {*} jsonDoc este es el archivo json que entra el cual lo transformamos en String para 
 * poder trabajar con el
 */
function procesarRespuesta(jsonDoc) {
    let json = JSON.parse(jsonDoc)
    console.log(json)

    /**
     * Creamos todos los campos que iran dentro del campo fieldset de tamaños de pizzas
     * para ello utilizamos DOM para modificarlo. Crearemos tambien una array cojiendo
     * los valores de los tamaños de las pizzas que estan en el Json con sus precios
     * que los pondremos dentro del atributo valor, los crearemos de tipo radio
     */
    
    let fieldset = document.createElement("fieldset")
    let legend = document.createElement("legend")
    let texto1 = document.createTextNode("Tamaños de Pizza")

    let arrayPizzas = json.Precios.Tamaños

    /**
     * con un for recorremos la array que esta cogiendo los campos de los tamaños
     *  creamos todos los elementos del DOM con sus atributos y valores
     */

    for(let pizza of arrayPizzas){
        let label = document.createElement("label")
        let atr = document.createAttribute("for")
        atr.value = pizza.tipo
        label.setAttributeNode(atr)
        let texto = document.createTextNode(pizza.tipo)
        label.appendChild(texto)

        let br = document.createElement("br")

        let input = document.createElement("input")
        let tipo = document.createAttribute("type")
        let id = document.createAttribute("id")
        let nombre = document.createAttribute("name")
        let valor = document.createAttribute("value")
        tipo.value = "radio"
        id.value = pizza.tipo
        nombre.value = pizza.tipo
        valor.value = pizza.precio
        input.setAttributeNode(tipo)
        input.setAttributeNode(id)
        input.setAttributeNode(nombre)
        input.setAttributeNode(valor)

        fieldset.appendChild(input)
        fieldset.appendChild(label)
        fieldset.appendChild(br)

    }

    legend.appendChild(texto1)
    fieldset.appendChild(legend)
    tipos.appendChild(fieldset)

    
       

    /**
     * Ahora vamos hacer lo mismo pero para los campos de ingredientes
     * en este caso en vez de utilizar un checkbox vamos a utilizar un checkbox
     * por si el cliente quiere mas de un ingrediente
     */
    let fieldset1 = document.createElement("fieldset")
    let legend1 = document.createElement("legend")
    let texto2 = document.createTextNode("Ingredientes a Escoger")
    legend1.appendChild(texto2)
    fieldset1.appendChild(legend1)
    ingredientes.appendChild(fieldset1)

    let arrayIngredientes = json.Precios.Ingredientes;

    /**
     * con un for recorremos la array que esta cogiendo los campos de los ingredientes
     *  creamos todos los elementos del DOM con sus atributos y valores
     */
    for(let ingre of arrayIngredientes){
        let label = document.createElement("label")
        let atr = document.createAttribute("for")
        atr.value = ingre.nombre
        label.setAttributeNode(atr)
        let texto = document.createTextNode(ingre.nombre)
        label.appendChild(texto)

        let br = document.createElement("br")

        let input = document.createElement("input")
        let tipo = document.createAttribute("type")
        let nombre = document.createAttribute("name")
        let id = document.createAttribute("id")
        let valor = document.createAttribute("value")
        tipo.value = "checkbox"
        nombre.value = ingre.nombre
        id.value = ingre.nombre
        valor.value = ingre.precio
        input.setAttributeNode(tipo)
        input.setAttributeNode(nombre)
        input.setAttributeNode(id)
        input.setAttributeNode(valor)

        fieldset1.appendChild(input)
        fieldset1.appendChild(label)
        fieldset1.appendChild(br)

    }
     
}   

/**
 * Creamos una funcion donde vamos hacer los calculos para que salga el precio como los elementos ya tienen su
 * precio integrado dentro del valor value, vamos a extraer ese valo para poder hacer las operaciones.
 * pondremos el .checked detras de los elementos para asi confirmar que solo haga la accion si ese elemento esta chequeado
 * al mismo tiempo tendremos que convertir los datos a numeros ya que todos los valores que nos entran por Json son String 
 * y si queremos que nos hagan las operaciones vamos a tener que convertir esos String en numeros con el metodo parseInt()
 */
function cargarCalcular(){
   
    let resultado = 0;
   

    if(document.getElementById("Pequeña").checked){
        let precio = document.getElementById("Pequeña").value//cogemos el valor del elemento
        let num = parseInt(precio)//pasamos el String a numero para poder hacer la suma
        resultado += num//vamos concatenando las sumas
    }

    if(document.getElementById("Mediana").checked){
        let precio = document.getElementById("Mediana").value
        let num = parseInt(precio)
        resultado += num
    }

    if(document.getElementById("Grande").checked){
        let precio = document.getElementById("Grande").value
        let num = parseInt(precio)
        resultado += num
    }

    if(document.getElementById("Familiar").checked){
        let precio = document.getElementById("Familiar").value
        let num = parseInt(precio)
        resultado += num
    }


    if(document.getElementById("Nueces").checked){
        let precio = document.getElementById("Nueces").value
        let num = parseInt(precio)
        resultado += num
    }
    if(document.getElementById("Cebolla").checked){
        let precio = document.getElementById("Cebolla").value
        let num = parseInt(precio)
        resultado += num
    }

    if(document.getElementById("Queso Cabra").checked){
        let precio = document.getElementById("Queso Cabra").value
        let num = parseInt(precio)
        resultado += num
    }

    
    if(document.getElementById("Bacon").checked){
        let precio = document.getElementById("Bacon").value
        let num = parseInt(precio)
        resultado += num
    }

    if(document.getElementById("Calabacin").checked){
        let precio = document.getElementById("Calabacin").value
        let num = parseInt(precio)
        resultado += num
    }
    
    alert("El importe de tu pedido es: " + resultado + " euros")
}




 
