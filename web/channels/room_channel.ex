defmodule Chat.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _messages, socket) do
    {:ok, socket}
  end

  def handle_in("message", %{"message" => message}, socket) do
    broadcast socket, "message", %{message: message}
    {:noreply, socket}
  end

end
