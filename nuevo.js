setTimeout(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get("IdFecha");
    //fetch('https://localhost:44345/api/depositos/consulta?idFecha=' + Id, {
    fetch('http://TerrazaMorita.somee.com/api/depositos/consulta?idFecha=' + Id, {
    method: 'GET'
})
    .then(res => res.json())
    //.then(data => console.log(data))
    .then(datos => {
        tabla2(datos)
    })


    function tabla2(datos){
        console.log(datos)
        var contenido = document.querySelector('#Depositos')
        var x = 0
        for (let valor of Object.values(datos)) {
            contenido.innerHTML += `
            <tr style="text-align: center;" id="Gera${x}">
            <td>${valor.Deposito}</td>
            <td>${valor.DetalleDeposito}</td>
            <td>${valor.Fecha}</td>
            <td><a class="boton" href="Recibos/Recibo.html?cadena=${btoa(valor.Id)}" target="_blank">Recibo</a></td>
            </tr> `
            x = x + 1
        }
    }

}, 1000);