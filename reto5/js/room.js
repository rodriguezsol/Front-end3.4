function autoInicioRoom(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta1(respuesta);
            let $select = $("#select-room");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}
function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.109.174:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(JSON){
            
            let $select = $("#select-category");
            $.each(JSON, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}
function pintarRespuesta1(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].hotel+"</td>";
        myTable+="<td>"+respuesta[i].stars+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionRoom("+respuesta[i].id+")'>Update</button>";
        myTable+="<td> <button onclick='borrarRoom("+respuesta[i].id+")'>Delete</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}

function guardarInformacionRoom(){
    let var2 = {
        name:$("#Oname").val(),
        hotel:$("#Ohotel").val(),
        stars:$("#Ostars").val(),
        description:$("#Odescription").val(),
        category: {id:+$("#select-category").val()},
        };
       
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.109.174:8080/api/Room/save",
       
        
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

function actualizarInformacionRoom(idElemento){
    let myData={
        id:idElemento,
        name:$("#Oname").val(),
        hotel:$("#Ohotel").val(),
        stars:$("#Ostars").val(),
        description:$("#Odescription").val(),
        category: {id:+$("#select-category").val()},


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.174:8080/api/Room/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Oname").val("");
            $("#Ohotel").val("");
            $("#Ostars").val("");
            $("#Odescription").val("");
            $("#select-category").val("");
            autoInicioRoom();
            alert("se ha Actualizado correctamente ")
        }
    });

}

function borrarRoom(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.109.174:8080/api/Room/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioRoom();
            alert("Se ha Eliminado.")
        }
    });

}