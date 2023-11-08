window.addEventListener("load", function(){
    //--------------------------------------------------Requerimiento 1----------------------------------------------------------------
    
    //Se declaran las constantes  de la url y el json con los datos que serán llamadas en el xmlHttp.open.
    const URL_DESTINO = "http://localhost:5500/Web_Entorno_Cliente_AE-2/Maria_Isabel/"
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

        //Se declara la variable de array que será usada en el for
        let arrayTamaños = objetoJson.PIZZA.TAMAÑOS;
        let arrayIngredientes = objetoJson.PIZZA.INGREDIENTES;

        //Ahora se crea la estructura del DOM dinámica
        
        let fieldsetDinamico=document.createElement("fieldset");
        let leyenda=document.createElement("legend");
        let contenidoLeyenda=document.createTextNode("Diseñe su propia pizza:")
        leyenda.appendChild(contenidoLeyenda);
        let etiqueta1 = document.createElement("label")
        //etiqueta1.for="size"
        let contenido1=document.createTextNode("Tamaño de la pizza:")
        etiqueta1.appendChild(contenido1)
        fieldsetDinamico.appendChild(etiqueta1)

        //Se itera el array de los tamaños de las pizzas y se crean los radio button pertinentes en función de los datos del JSON.
        for (let tam of arrayTamaños){
            //El equivalente en html de lo que se quiere lograr: <input type="radio" name="size" value="5" id="small"/> Pequeña<br/>

            let inputi = document.createElement("input")

            inputi.type="radio"
            inputi.name="size"
            
            let valeur = document.createAttribute("value")
            valeur.value=tam.PRECIO
            inputi.setAttributeNode(valeur)

            let identifiant = document.createAttribute("id")
            identifiant.value=tam.TAMAÑO 
            inputi.setAttributeNode(identifiant)

            let br1=document.createElement("br");

            fieldsetDinamico.appendChild(inputi)
            fieldsetDinamico.appendChild(br1)
        }

        let etiqueta2 = document.createElement("label")
        //etiqueta2.for="size"
        let contenido2=document.createTextNode("Escoja los ingredientes:")
        etiqueta2.appendChild(contenido2)
        fieldsetDinamico.appendChild(etiqueta2)

        for (let ing of arrayIngredientes){
            //El equivalente en html de lo que se quiere lograr: <input type="checkbox" name="ingredientes" value="1" id="sausage"/>Salchicha bávara<br/>

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

        fieldsetDinamico.appendChild(leyenda)

        let f2ele = document.getElementById("f2")
        f2ele.appendChild(fieldsetDinamico)
        
    }

    enviarPeticionAsincrona();
})
