const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);


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