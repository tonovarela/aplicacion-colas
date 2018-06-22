const { io } = require('../server');

const { TicketControl } = require("../classes/ticket-control");

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        console.log(`Servidor  ${siguiente}`)
        callback(siguiente);
    });


    client.emit('estadoActual',
        {
            ultimos4:ticketControl.getUltimos4()
        });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "El escritorio es necesario"
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4',{
            actual: ticketControl.getUltimoTicket(),
            ultimos4:ticketControl.getUltimos4()
        })

        


    });




});