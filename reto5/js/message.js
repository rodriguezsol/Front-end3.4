function autoInicioMessage(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta4(respuesta);
            let $select = $("#select-message");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idMessage+'>'+ name.name+'</option>');
                console.log("select "+name.idMessage);
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


function pintarRespuesta4(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensajes(){
    let var4 = {
        messageText:$("#MsmessageText").val(),
        room: {id:+$("#select-room").val()},
        client:{idClient:$("#select-client").val()}

        };
       
        console.log(var4);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var4),
        
        url:"http://129.151.109.174:8080/api/Message/save",
       
        
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
