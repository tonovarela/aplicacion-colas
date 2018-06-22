//Establecer la conexion 

var socket = io();
var label=$('#lblNuevoTicket');

socket.on('connect', function () {
    console.log("Conectando al servidor");
});

socket.on('disconnect', function () {
    console.log("desconectado al servidor");
});


socket.on('estadoActual',function(data){
  label.text(data.actual);
});


$('button').on('click', function () {
        socket.emit('siguienteTicket',null,function(siguienteTicket){
         label.text(siguienteTicket);
        });
});