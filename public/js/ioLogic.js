let socket = io();
const username = prompt('Enter a username');

        const messageBox = document.querySelector('#messageBox');
        const messageForm = document.querySelector('#messageForm');
      
        // Event handler when the client enters a message
        messageForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const message = messageBox.value;
          showMessageSent(message);

          if (messageBox.value) {
            socket.emit('chat message',  username + ": " + messageBox.value);
            messageBox.value = '';
          }
        });

        socket.on('chat message', function(msg) {
          showMessageReceived(msg)
  });

       

  const messages = document.querySelector('.chat');

  function showMessageSent(message) { 
      showNewMessage(message, 'sending'); 
    }
    function showMessageReceived(message) {
      showNewMessage(message, 'receiving'); 
    }
    
    // This function displays a message in the messages container node. 
    // className may either be 'mine' or 'yours' (see styles.css for the distinction)
    function showNewMessage(message, className) {
      // Create a text node element for the message
      const textNode = document.createElement('div');
      textNode.innerHTML = message;
      textNode.className = 'message';
      
      // Wrap the text node in a message element
      const messageNode = document.createElement('div');
      messageNode.className = 'messages ' + className;
      messageNode.appendChild(textNode);
      
      // Append the messageNode to the messages container element
      messages.appendChild(messageNode);
      messages.scrollTop = messages.scrollHeight;
    }