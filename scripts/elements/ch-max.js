const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

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