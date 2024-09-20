import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { disconnect } from 'process'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
contextBridge.exposeInMainWorld('DB', {
  Connect: (args) => ipcRenderer.invoke('dbconnect', args),
  disconnect: (args) => ipcRenderer.invoke('dbdisconnect', args)
})
