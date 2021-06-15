# A naive proof-of-concept for the HTML-over-the-wire approach.

Updates to the user interface is send to the server over a websocket connection. The server sends back a response where the content of the payload is a updated body for the webpage. When the client reccives messages from the client, the whole body of the webpage will be replaced.

## Some of the benefits with this approach

- Everything is always stored on the server
- Very thin client.
- No need for state in both the client and the server

## Some of the drawbacks

- No offline support
- Websocket provides no broadcast support.
- Replacing the whold body with innerHTML is propably a bad idea.

## Todo

- Make bigger example form
- Broadcast messages to multiple clients.
- Figure out a fallback for browsers without support for websocket.
