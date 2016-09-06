import {Socket} from "phoenix"

let user = localStorage.getItem("user")
if(!user) {
  user = prompt("What's your user?")
  localStorage.setItem("user", user)
}

let socket = new Socket("/socket", {params: {user: user}})

socket.connect()

let $messages = $('#messages')
let $input = $('#input')

let channel = socket.channel("room:lobby", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.on("message", function(message){
  $messages.append(`<div class="message">${message.user} - ${message.message}</div>`)
})

$input.keyup(function(event) {
  if(event.which != 13)
    return

  channel.push("message", {message: $input.val()})
  $input.val("")
})

channel.on("new_user", function(message) {
  $messages.append(`<div class="new_user">${message.user} entrou na sala</div>`)

})

export default socket
