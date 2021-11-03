function autoInicioReservation(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta5(respuesta);
            let $select = $("#select-reservation");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idReservation+'>'+ name.name+'</option>');
                console.log("select "+name.idReservation);
            }); 
        }
    
    })

}
function autoInicioRoom(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(JSON){
            let $select = $("#select-room");
            $.each(JSON, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
    
}

function autoInicioCliente(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(JSON){
            let $select = $("#select-client");
            $.each(JSON, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);   
            }); 
        }
    
    })
    
}



function pintarRespuesta5(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<th>StartDate</th>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<th>DevolutionDate</th>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<th>Status</th>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<th>Room</th>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<th>Client</th>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<th>Email</th>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        
        myTable+="<td> <button onclick=' actualizarInformacionReserva("+respuesta[i].idReservation+")'>Update</button>";
        myTable+="<td> <button onclick='borrarReserva("+respuesta[i].idReservation+")'>Delete</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReserva(){
    console.log($("#RstartDate").val());
    let var5 = {
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
        status:$("#Rstatus").val(),
        room: {id:+$("#select-room").val()},
        client:{idClient:$("#select-client").val()}

        };
       
        console.log(var5);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),
        
        url:"http://129.151.109.174:8080/api/Reservation/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionReserva(idElemento){
    let myData={
        idReservation:idElemento,
        startDate:$("#RstartDate").val(),
        devolutionDate:$("#RdevolutionDate").val(),
        status:$("#Rstatus").val(),
        room: {id:+$("#select-room").val()},
        client:{idClient:$("#select-client").val()}


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            $("#idReservation").val("");
            $("#RstartDate").val("");
            $("#RdevolutionDate").val("");
            status:$("#Rstatus").val(),
            $("#select-room").val("");
            $("#select-client").val("");
            autoInicioReservation();
            alert("se ha Actualizado correctamente Cliente")
        }
    });

}

function borrarReserva(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.174:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado5").empty();
            autoInicioReservation();
            alert("Se ha Eliminado.")
        }
    });

}