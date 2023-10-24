
setTimeout(() => {
  
    const urlParams = new URLSearchParams(window.location.search);
    const dia = urlParams.get("dia");
    const mes = urlParams.get("mes");
    const anio = urlParams.get("anio");
    const Id = urlParams.get("Id");
    if (dia === null || Id === null || mes === null || anio === null){
        window.location.assign("Index.html");
    }
    document.getElementById("dia").innerHTML = urlParams.get("dia");
    document.getElementById("mes").innerHTML = urlParams.get("mes");
    document.getElementById("anio").innerHTML = urlParams.get("anio");
    if(Id > 0){
        //fetch('https://localhost:44345/api/fechas/consultaUnica?id=' + Id, {
        fetch('http://TerrazaMorita.somee.com/api/fechas/consultaUnica?id=' + Id, {
            method: 'GET'
        })
            .then(res => res.json())
            //.then(data => console.log(data))
            .then(datos => {
                tabla(datos)
            })


      }
      const element = document.getElementById("mio");
    element.remove();
    if(Id === 0){
        const element2 = document.getElementById("depositos");
        element2.remove();
    }
  }, 1000);
  

  
function tabla(datos){
    let tr0 = document.getElementById("Nombre");
    tr0.value = datos.Nombre
    let tr1 = document.getElementById("ApellidoP");
    tr1.value = datos.ApellidoPaterno
    let tr2 = document.getElementById("ApellidoM");
    tr2.value = datos.ApellidoMaterno
    let tr3 = document.getElementById("Horario");
    tr3.value = datos.Horario
    let tr4 = document.getElementById("Telefono");
    tr4.value = datos.Telefono
    let tr5 = document.getElementById("Costo");
    tr5.value = datos.Costo
    let tr6 = document.getElementById("Detalle");
    tr6.value = datos.Detalle
}

function Guardar(){
    let tr0 = document.getElementById("Nombre");
    let tr1 = document.getElementById("ApellidoP");
    let tr2 = document.getElementById("ApellidoM");
    let tr3 = document.getElementById("Horario");
    let tr4 = document.getElementById("Detalle");
    let tr5 = document.getElementById("Telefono");
    let tr6 = document.getElementById("Costo");
    let tr7 = document.getElementById("Deposito");
    let tr8 = document.getElementById("DetalleD");
    let tr9 = document.getElementById("dia").innerHTML;
    let tr10 = document.getElementById("mes").innerHTML;
    let tr11 = document.getElementById("anio").innerHTML;

    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("Id");

    if(tr0.value != "" && tr1.value != "" && tr3.value != "" && tr5.value != "" && tr6.value != "") {
       let url = tr0.value + "&apellidoPaterno=" + tr1.value + "&horario=" + tr3.value + "&apellidoMaterno=" + tr2.value + "&id=" + Id + "&Telefono=" + tr5.value + "&Costo=" + tr6.value + "&dia=" + tr9 + "&mes=" + tr10 + "&anio=" + tr11
        if (tr7.value != ""){
            url = url + "&deposito=" + tr7.value + "&detalleDeposito=" + tr8.value
        }
        if (tr4.value != ""){
            url = url + "&detalles="+ tr4.value
        }

        if (tr5.value.length > 12){
            window.alert('Introduzca un número de teléfono válido');
        }
        else{
        //fetch('https://localhost:44345/api/fechas/nuevo?nombre=' + url , {
        fetch('http://TerrazaMorita.somee.com/api/fechas/nuevo?nombre=' + url , {
            method: 'POST'
        })
            .then(res => res.json())
            //.then(data => console.log(data))
            .then(datos => {
                GuardadoExitoso(datos)
            })
        }
    }
    else{
        window.alert('Campos requeridos: Fecha, Nombre, Apellido Paterno, Horario, Telefono y Costo');
    }
}

function Eliminar(){
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("Id");
    if (Id > 0){
        var resultado = window.confirm('Estas seguro que deseas eliminar la reservacion?');
        if (resultado === true) {
            const urlParams = new URLSearchParams(window.location.search);
            const Id = urlParams.get("Id");
            //fetch('https://localhost:44345/api/fechas/eliminar?Id=' + Id , {
            fetch('http://TerrazaMorita.somee.com/api/fechas/eliminar?Id=' + Id , {
                method: 'POST'
            })
                .then(res => res.json())
                //.then(data => console.log(data))
                .then(datos => {
                    GuardadoExitoso(datos)
                })
                //window.location.assign("Index.html");
                window.location.href = "Index.html" ;
        } else { 
            window.alert('Presiona aceptar para regresar');
        }
    }
    else{
        window.alert('No es posible eliminar esta fecha ya que aun no ha sido creada');
    }
}

function Recibos(){
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("Id");
    if (Id > 0){
        var url = "nuevo.html?IdFecha=" + Id ;
        window.location.href = url
    }
    else{
        window.alert('Esta fecha no cuenta con recivos ya que no ha sido resevada.');
    }
}

function GuardadoExitoso(datos){
    if(datos === false){
        window.alert('Pareces que hubo un error. Intenta nuevamente.');
    }
    else{
        window.alert('No olvides enviar el recibo al cliente');
        window.location.href = "Index.html" ;
    }
    
}


