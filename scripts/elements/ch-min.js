const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

function minimize(){
    require('electron').remote.getCurrentWindow().minimize();
}

module.exports = class extends HTMLElement {  
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `<img src="${IconSet.getDir('minimize')}" height="24" width="23" />`

            this.addEventListener('click',minimize);
    }
}