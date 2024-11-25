const { app, BrowserWindow, protocol, dialog } = require('electron');

function createWindow() {
    win = new BrowserWindow({width: 800, height: 800});
    win.loadFile('dist/kursova/browser/index.html');
  }

  app.whenReady().then(() => {
   
    createWindow()
    protocol.registerHttpProtocol('msalea250112-1b5a-4e78-9472-d2d6d5f1efb5', (request, callback) => { 
      const url = new URL(request.url);
      console.log(url.hash)
      // Send the code to your renderer process
     
    });

    
   
  })

 