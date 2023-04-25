'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  const win = new BrowserWindow({
    width: 924,
    height: 500,
    webPreferences: {
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    },
    icon: 'src/assets/images/RU.png'
  })
  win.removeMenu()

  await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e)
    }
  }
  createWindow()
})
