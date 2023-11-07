window.addEventListener("load", function(){
    //--------------------------------------------------ACTIVIDAD 1---------------------------------------------------------------------
    let inputNombre = document.getElementById("nombre");
    let inputDireccion = document.getElementById("direccion");
    let inputTelefono = document.getElementById("telefono");
    let inputEmail = document.getElementById("email");

    let clicando=document.getElementById("enviar");
    clicando.addEventListener("click", validacion);

    function validacion(){
        if(inputNombre.value.trim()==""){
            alert("[ERROR] El nombre es obligatorio");
            return false;
        }

        if(inputDireccion.value.trim()==""){
            alert("[ERROR] La dirección es obligatoria");
            return false;
        }

        if(inputTelefono.value.trim()==""){
            alert("[ERROR] El teléfono es obligatorio");
            return false;
        }

        if(inputEmail.value.trim()==""){
            alert("[ERROR] El correo electrónico es obligatorio");
            return false;
        }

        let tamano=document.getElementsByName("size");
        let seleccionado=false;
        let total =0;

            for(let i=0; i<tamano.length; i++){
                if(tamano[i].checked){
                    seleccionado=true;
                    total += parseInt(tamano[i].value);
                    break;
                } 
            }

        if(!seleccionado){
            alert("[ERROR] Debe escoger un tamaño de pizza");
            return false;
        }

        let cajitaFeliz = document.getElementsByName("ingredientes");
        let chosen = false;
        let total2 =0;
            
            for (let i = 0; i < cajitaFeliz.length; i++) {
                if (cajitaFeliz[i].checked) {
                    total2 += parseInt(cajitaFeliz[i].value);
                    chosen = true;    
                    continue;
                }
            }

            if (!chosen){ 
                alert("[ERROR] Debe seleccionar al menos un ingrediente.");  
                return false;
            }

        if (!(inputNombre.value.trim()=="") && !(inputDireccion.value.trim()=="") && !(inputTelefono.value.trim()=="")
            && !(inputEmail.value.trim()=="") && (seleccionado=true) && (chosen=true)){
                alert("🤌🏼¡Preparando su pedido!🤌🏼");
                alert('El coste de su pedido es ' + (total+total2)+"💶");
                return true; 
            }    
         
    } 
    
    //--------------------------------------------------ACTIVIDAD 2----------------------------------------------------------------

    //Se declaran las constantes  de la url y el json con los datos que serán llamadas en el xmlHttp.open.
    const URL_DESTINO = "http://127.0.0.1:5500/Maria_Isabel/pizza.html"
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

        let objetoJson=JSON.parse(jsondoc)

        let arrayTamaños = objetoJson.PIZZA.TAMAÑOS;

        //Ahora se crea la estructura del DOM dinámica
        let fieldsetDinamico=document.createElement("fieldset");
        let leyenda=document.createElement("legend");
        let contenidoLeyenda=document.createTextNode("Diseñe su propia pizza:")
        leyenda.appendChild(contenidoLeyenda);

        //Se itera el array de los tamaños de las pizzas y se crean los radio button pertinentes en función de los datos del JSON.
        for (let tam of arrayTamaños){
            
        }





    }










})