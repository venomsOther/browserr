const settings = JSON.parse(require('fs').readFileSync(__dirname+'/../'+'settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

function pgRefresh(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.reloadIgnoringCache();
}


module.exports = class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("refresh")+'" height="25" width="25" />'
        
    }

    connectedCallback(){
        this.addEventListener('click',pgRefresh);
    }
}