function html(body) {
  return `
  <html>
      <body>${body}</body>
      <script>
      const socket = new WebSocket('ws://localhost:8081');
      socket.onmessage = function(event) {
        document.body.innerHTML = event.data;
      }
      function incrementClicked(){
        socket.send('increment');
      }
    </script>
  </html>
  `;
}

function body(value) {
  return `
          <h1>Counter example </h1>
          <p>The values is ${value}</p>
          <button onclick="incrementClicked()">increment</button>   
      `;
}

export { html, body };
