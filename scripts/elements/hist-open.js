const BrowserWindow = require('electron').remote.BrowserWindow;

module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        var openurl = this.getAttribute("url");

        var win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            icon: './images.png',
            frame: false,
            minWidth: '145',
            minHeight: '100'
        });
    
        win.loadURL(__dirname+'/index.html');
        win.webContents.executeJavaScript('getCurrentView().src = "' + openurl + '";');
    }
}