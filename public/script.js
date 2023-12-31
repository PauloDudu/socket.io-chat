var socket = io('https://dudu-chat-05a2e1e7e3c5.herokuapp.com/');

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>'+ message.author +'</strong>: '+ message.message +'</div>')
}

socket.on('previousMessages', messages => {
    for(message of messages) {
        renderMessage(message)
    }
})

socket.on('recievedMessage', message  => {
    renderMessage(message);
})

$('.chat').submit((event) => {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        var messageObject = {
            author: author,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    };
});