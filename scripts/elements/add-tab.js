const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);


module.exports = class extends HTMLElement{
    constructor(){
        super();
        //let shadowRoot = this.attachShadow({mode:'open'});
        let attrs = 'width="40" height="40"';
        attrs = 'class="addtb" style="width:100%;height:100%;display:inline-block;"';

        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = `<img src="${IconSet.getDir('newTab')}" height="24" width="25" />`;
    }

    connectedCallback(){
        this.addEventListener('click',this.click)
    }

    click(){
        makeWebv("https://google.com/");
    }
}