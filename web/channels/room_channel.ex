defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _messages, socket) do
    send self() , :after_join
    {:ok, socket}
  end

  def handle_in("message", %{"message" => message}, socket) do
    broadcast socket, "message", %{message: message, user: socket.assigns.user}
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast socket, "new_user", %{user: socket.assigns.user}
    {:noreply, socket}
  end

end
