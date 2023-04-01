import {  Manager } from "socket.io-client"
import Cookies from "universal-cookie"


const cookies = new Cookies()
cookies.remove(`token`)
const manager = new Manager({extraHeaders: {Authorization :`Bearer ${cookies.get(`token`)}`}})


export const refreshSocket = () => {
  socket.disconnect()
  manager.opts.extraHeaders = {Authorization: `Bearer ${cookies.get(`token`)}`}
  socket.connect()
}

export const socket = manager.socket(`/`) 