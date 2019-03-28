module.exports = class extends HTMLElement {  
    constructor(){
        super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = `<img src="${IconSet.getDir('minimize')}" height="24" width="23" />`

            this.addEventListener('click',minimize);
    }
}