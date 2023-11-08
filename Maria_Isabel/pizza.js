window.addEventListener("load", function(){
    //--------------------------------------------------Requerimiento 1----------------------------------------------------------------
    
    //Se declaran las constantes  de la url y el json con los datos que serán llamadas en el xmlHttp.open.
    const URL_DESTINO = "http://127.0.0.1:5500/Maria_Isabel/pizza.html"
    //const URL_DESTINO = "http://localhost:5500/Web_Entorno_Cliente_AE-2/Maria_Isabel/"
    const RECURSO = "pizza.json" 

    //Se crea la función de enviar la petición.
    function enviarPeticionAsincrona(){
        //Se crea el objeto JSON, que es el más importante.
        let xmlHttp = new XMLHttpRequest()

        /*
            Se realiza la función de callback, de tal manera que se ejecuta cuando la respuesta http ha finalizado (4) y todo
            está correcto.
        */
        xmlHttp.onreadystatechange = function (){
            if (this.readyState==4){
                if(this.status==200){
                    //El JSON se toma como texto normal
                    procesarRespuesta(this.responseText)
                }else{
                    alert("El status NO es 200 OK")
                }
            }
        }

        //El verbo HTTP que se va a usar es 'get'; se especifican la url y el recurso que se van a usar; true para asincronía.
        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        //Como el método es 'get' no se manda nada:
        xmlHttp.send(null)
    }

    //Se crea la función para procesar la respuesta, que se llama en el segundo if  de la función 'onreadystatechange'.
    function procesarRespuesta(jsonDoc){
        //El texto se transforma a objeto JSON
        let objetoJson=JSON.parse(jsonDoc)
        console.log(objetoJson)

        //Se declara la variable de array que será usada en el for
        let arrayTamaños = objetoJson.PIZZA.TAMAÑOS;
        let arrayIngredientes = objetoJson.PIZZA.INGREDIENTES;

        //Ahora se crea la estructura del DOM dinámica
        //Los elementos que no son ni radio button ni checkbox se crean fuera de los for ya que solo se hace una vez.
        //Se crea un fieldset, la legend y su texto, por lo que luego se hace el appendChild.
        let fieldsetDinamico=document.createElement("fieldset");
        let leyenda=document.createElement("legend");
        let contenidoLeyenda=document.createTextNode("Diseñe su propia pizza:")
        leyenda.appendChild(contenidoLeyenda);
        //Se crea el label que engloba a los radio button, un texto que explique qué hay que seleccionar, y este se añade al label.
        let etiqueta1 = document.createElement("label")
        //etiqueta1.for="size"
        let contenido1=document.createTextNode("Tamaño de la pizza:")
        etiqueta1.appendChild(contenido1)
        //Al fieldset se le añade el label.
        fieldsetDinamico.appendChild(etiqueta1)

        //Se itera el array de los tamaños de las pizzas y se crean los radio button pertinentes en función de los datos del JSON.
        for (let tam of arrayTamaños){
            //El equivalente en html de lo que se quiere lograr: <input type="radio" name="size" value="5" id="small"/> Pequeña<br/>
            //Se crea la etiqueta input
            let inputi = document.createElement("input")

            //El type y el name es igual para todos los radio button.
            inputi.type="radio"
            inputi.name="size"
            
            //Como el value y el id varía entre ellos, aquí se realizan pasos adicionales.
            let valeur = document.createAttribute("value")
            valeur.value=tam.PRECIO
            inputi.setAttributeNode(valeur)

            let identifiant = document.createAttribute("id")
            identifiant.value=tam.TAMAÑO 
            inputi.setAttributeNode(identifiant)

            let br1=document.createElement("br");

            //Se añaden los inputs y el br al fieldset.
            fieldsetDinamico.appendChild(inputi)
            fieldsetDinamico.appendChild(br1)
        }

        //Se crea el label para los checkboxes, con su texto al que posteriormente se hace un appendChild.
        let etiqueta2 = document.createElement("label")
        //etiqueta2.for="size"
        let contenido2=document.createTextNode("Escoja los ingredientes:")
        etiqueta2.appendChild(contenido2)
        //Al fieldset se le añade el label.
        fieldsetDinamico.appendChild(etiqueta2)

        for (let ing of arrayIngredientes){
            //El equivalente en html de lo que se quiere lograr: <input type="checkbox" name="ingredientes" value="1" id="sausage"/>Salchicha bávara<br/>

            //Se sigue la misma lógica que en el caso anterior pero adaptado a checkbox.
            let inputii = document.createElement("input")
 
            inputii.type="checkbox"
            inputii.name="ingredientes"        

            let valeur2 = document.createAttribute("value")
            valeur2.value=ing.PRECIO
            inputii.setAttributeNode(valeur2)

            let identifiant2 = document.createAttribute("id")
            identifiant2.value=ing.TAMAÑO 
            inputii.setAttributeNode(identifiant2)

            let br2=document.createElement("br");

            fieldsetDinamico.appendChild(inputii)
            fieldsetDinamico.appendChild(br2)
        }

        //Al fieldset se le añade la legend.
        fieldsetDinamico.appendChild(leyenda)

        /*
        //Como en el HTML se ha creado un fielset con id 'f2', este se recoge en una variable, y es a esta a la que 
        //se le añade lo que hemos denominado 'fieldsetDinámico.
        let f2ele = document.getElementById("f2")
        f2ele.appendChild(fieldsetDinamico)
        */

       //Se crea una variable que haga referencia al div creado en el HTML, para añadir ahí todo el fielset.
       let fields =document.getElementById("field")
       fields.appendChild(fieldsetDinamico)
    }

    enviarPeticionAsincrona();



    //-------------------REFRESCAR
    /* Se vuelve a realizar el proceso anterior sin necesidad de crear los elementos, ya que estos están dentro de la función
       procesarRespuesta, que ya ha sido declarada. Posteriormente, se recupera el elemento botón mediante su id,
       de tal manera que al pulsar dicho botón se recargue la página por completo, y si ha habido algún error se evita el 
       envío al servidor*/
    function refrescar(){
        let xmlHttp = new XMLHttpRequest()

        xmlHttp.onreadystatechange = function (){
            if (this.readyState==4){
                if(this.status==200){
                    procesarRespuesta(this.responseText)
                }else{
                    alert("El status NO es 200 OK")
                }
            }
        }

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
    }

    document.getElementById("refrescar").onclick = function (e) {
        if (!refrescar()) {
            e.preventDefault();
        }
    };


    //--------------------------------------------------Requerimiento 2----------------------------------------------------------------
    function total(){       
        //Inicializamos el acumulador del precio del tamaño y de los ingredientes.
        let resultatTaille = 0
        let resultatIngredients = 0
        //Se va a realizar un for para recorrer todos los tamaños independientemente del número de elementos que haya en el JSON.
        for(let i=0; i<PIZZA.TAMAÑOS.length; i++){
            //Si se ha seleccionado un tamaño, entonces el precio se acumula y se para el recorrido del for. 
            if(TAMAÑO[i].checked){
                //Como el precio viene como String se debe parsear a entero.
                resultatTaille += parseInt(PIZZA.TAMAÑOS[i].PRECIO);
                break;
            }
        }

        //Ahora se sigue la misma lógica para los checkbox 
        for (let i=0; i<PIZZA.INGREDIENTES.length; i++){
            if(INGREDIENTE[i].checked){
                resultatIngredients += parseInt(PIZZA.INGREDIENTES[i].PRECIO);
                //Como se pueden seleccionar varios ingredientes, en esta ocasión se incluye un continue para recorra todos los INGREDIENTES.
                continue;
            }
        }
        let resultatFinal = 0;
        resultatFinal= resultatTaille + resultatIngredients
    }

    /*Al botón de procesar pedido (cuyo id es "enviar") cuando se le hace click se llamará a la función total
      para que muestre el precio final y se envíe el formulario. Para evitar que se envíe el formulario con algún error,
      como puede ser que no hayan escogido el tamaño y/o al menos un ingrediente, se incluye el preventDefautl.
    */
    document.getElementById("enviar").onclick = function (e) {
        if (!total()) {
            e.preventDefault();
        }
    };
})
