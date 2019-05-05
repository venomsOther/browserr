const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

function pgBack(){
    window.document.querySelector('web--view:not([style="display: none;"])').view.goBack();
}


module.exports = class extends HTMLElement {    
    constructor(){
        super();
        let sha = this.attachShadow({mode: 'open'});

        sha.innerHTML = '<img src="'+IconSet.getDir("leftArrow")+'" height="25" width="25" />'
    }

    connectedCallback(){
        this.addEventListener('click', pgBack);
    }
}