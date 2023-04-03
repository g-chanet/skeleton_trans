import {  Manager } from "socket.io-client"


const manager = new Manager({extraHeaders: {Authorization :`Bearer ${localStorage.getItem(`token`)}`}})

export const refreshSocket = () => {
  socket.disconnect()
  manager.opts.extraHeaders = {Authorization: `Bearer ${localStorage.getItem(`token`)}`}
  socket.connect()
}

export const socket = manager.socket(`/`) 