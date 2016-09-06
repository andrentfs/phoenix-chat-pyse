import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

let $messages = $('#messages')
let $input = $('#input')

let channel = socket.channel("room:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.push("message", {message: "Teste"})

channel.on("message", function(message){
  $messages.append(`<div class="message">${message.message}</div>`)
})




export default socket
