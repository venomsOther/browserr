const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

function pgForward(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goForward();
}


module.exports = class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("rightArrow")+'" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click',pgForward);
    }
}