

    //fetch('https://localhost:44345/api/fechas/consulta', {
    fetch('http://TerrazaMorita.somee.com/api/fechas/consulta', {
        method: 'GET'
    })
        .then(res => res.json())
        //.then(data => console.log(data))
        .then(datos => {
            tabla(datos, parseInt(1))
        })




function abc(){
     
        var mes = document.getElementById('Mes').value;
        var anio = document.getElementById('Anio').value;
        if(mes != 0 && anio != 0)
        {
        cabecera(mes, anio)

        //let url = 'https://localhost:44345/api/fechas/consulta?dia=1&mes=' + mes + '&anio=' + anio
        let url = 'http://TerrazaMorita.somee.com/api/fechas/consulta?dia=1&mes=' + mes + '&anio=' + anio
        fetch(url, {
            method: 'GET'
        })
            .then(res => res.json())
            //.then(data => console.log(data))
            .then(datos => {
            tabla(datos, parseInt(0))
            })    

        }
        else
        {
            window.alert('La fecha no es valida.');
        }

}

function tabla(datos, cabeceraAct) {
   
    if(cabeceraAct === parseInt(1)){
        cabecera(0, 0)
    }
    
    var contenido = null
    contenido = document.querySelector('#body1')
    
    var x = 0
    
    let tdAddIni = datos[0]
    var hhh = `<tr id="Gera${x}">`
    
    for(var i = 1; i < tdAddIni.DiaSemana; i++){
        hhh += `<td style="border: 1px solid #dee2e6;">`
    }

    for (let valor of Object.values(datos)) {
        
        //var estilo = valor.Id > 0 ? `background: linear-gradient(white, rgb(86, 84, 84));` : `background-color: white;`; 
        var estilo = valor.Id > 0 ? `background-color: #e5e5f7;
        opacity: 0.5;
        background-size: 7px 7px;
        background-image: repeating-linear-gradient(45deg, #3f4049 0, #3f4049 0.7000000000000001px, #e5e5f7 0, #e5e5f7 50%);`
        : `background-color: white;`;
        //var estilo = `<div class="p-3 mb-2 bg-secondary bg-gradient text-white" style="text-align: center; width: 100%; height: 12%;"><label>Reservado</label></div>`;
        //var estilo = valor.Id > 0 ? `<img src="./Imagenes/bookmark-alt-svgrepo-com.svg" alt="" style="width: 100%; height: 33%;">` : ``;
        hhh +=  
        `<td style="border: 1px solid #dee2e6; text-align: center; height: 50%; ${estilo}" value="${valor.Fecha}">

           
                <h1><a class="boton link-dark" style="text-decoration: none;"  href="Reservar.html?dia=${valor.Dia}&mes=${valor.Mes}&anio=${valor.Anio}&Id=${valor.Id}">
                ${valor.Dia}</a></h1>
        </td>`
 
        if(valor.DiaSemana === 7){
            x = x + 1
            hhh += `</tr><tr style="text-align: center;" id="Gera${x}">`
        }
    }

    let tdAddFin = datos[datos.length - 1].DiaSemana
    
    for(var i = tdAddFin ; i < 7; i++){
        hhh += `<td style="border: 1px solid #dee2e6; background-color: white;"></td>`
    }

    hhh += `</tr">`

    contenido.innerHTML = hhh


}

function meses(mes){
    var mesText
    switch (mes) {
        case 1: mesText = `Enero`; break;
        case 2: mesText = `Febrero`; break;
        case 3: mesText = `Marzo`; break;
        case 4: mesText = `Abril`; break;
        case 5: mesText = `Mayo`; break;
        case 6: mesText = `Junio`; break;
        case 7: mesText = `Julio`; break;
        case 8: mesText = `Agosto`; break;
        case 9: mesText = `Septiembre`; break;
        case 10: mesText = `Octubre`; break;
        case 11: mesText = `Noviembre`; break;
        case 12: mesText = `Diciembre`; break;
      }
      return mesText;
}

function cabecera(mes, anio)
{
    let date = new Date()

    var contenido = null
    contenido = document.querySelector('#fechaActual')
    var hhh = `
    <tr>
        <td style="text-align: left;" >
        <div class="p-3 text-white back">
            <label>Hoy es:</label>
        <h1><label id="hoy" name="hoy">
        ${date.getDate()}
        </label></h1>
        <label id="mesAct" name="mesAct">
        ${meses(date.getMonth() + 1)}
        </label>
        <label id="anioAct" name="anioAct">
        ${date.getFullYear()}
        </label>
        </div>
        </td>
   </tr>
    <td style=" width: 15%; height: 33%; text-align: center;">
        <h1><b><label id="mesTex" name="mesTex" style="font-size: 200%;" >
        ${mes === 0 ? meses(date.getMonth() + 1) : meses(parseInt(mes))}
        </label></b></h1>
        <br>
        <h1><b><label id="anioText">
        ${anio === 0 ? date.getFullYear() : anio}
        </label></b></h1>
   </td>
   

    </tr>`
    contenido.innerHTML = hhh
}



