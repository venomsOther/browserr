const settings = JSON.parse(require('fs').readFileSync(__dirname+'/../'+'settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);
//const thisWindow = require('electron').remote.getCurrentWindow();

function minimize(){
    console.log(require('electron').remote.BrowserWindow.getFocusedWindow().minimize)
    require('electron').remote.BrowserWindow.getFocusedWindow().minimize();
}

module.exports = class extends HTMLElement {  
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `<img src="${IconSet.getDir('minimize')}" height="24" width="23" />`

            
    }

    connectedCallback(){
        this.addEventListener('click',minimize);
    }
}