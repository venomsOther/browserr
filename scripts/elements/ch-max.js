const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);
const thisWindow = require('electron').remote.getCurrentWindow();

function maximize(){
    if(thisWindow.isMaximized()){
        thisWindow.unmaximize();
    }else{
        thisWindow.maximize();
    }
}

module.exports = class extends HTMLElement {
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.innerHTML = `<img src="${IconSet.getDir('maximize')}" height="24" width="23" />`

            this.addEventListener('click',maximize);
    }
}
