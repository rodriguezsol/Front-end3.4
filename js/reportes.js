function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta7(respuesta);
        }
    });
}



function pintarRespuesta7(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
       myTable+="<th>completed</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>cancelled</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}


function traerReporteClientes(){
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>Total</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<th>Name</th>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<th>Email</th>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<th>Age</th>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoClientes").html(myTable);
}




function traerReporteDate(){
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/report-dates//2020-01-01/2020-12-31",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaDate(respuesta);
        }
    });
}

function pintarRespuestaDate(respuesta){

    let myTable="<table>";
    myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>StartDate</th>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<th>DevolutionDate</th>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<th>Status</th>";
        myTable+="<td>"+respuesta[i].status+"</td>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoDate").html(myTable);
}

