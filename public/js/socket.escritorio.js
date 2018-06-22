var socket = io();


var seachParam = new URLSearchParams(window.location.search);
if (!seachParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error("error");
}

var escritorio = seachParam.get('escritorio');
var label = $('small');
console.log(escritorio);



$("h1").text("Escritorio " + escritorio);

$("button").on('click', function () {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function (resp) {
        if (resp=="No hay tickets"){
            label.text(resp);
          //  alert(resp);
           return ;
        }
        label.text(resp.numero);
        console.log(resp);
       
    })
});

// socket.on('connect', function () {
//     console.log("Conectando al servidor");
// });

// socket.on('disconnect', function () {
//     console.log("desconectado al servidor");
// });


// socket.on('estadoActual',function(data){
//   label.text(data.actual);
// });