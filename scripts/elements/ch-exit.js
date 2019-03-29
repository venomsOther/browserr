module.exports = class extends HTMLElement {    
    constructor(){
        super();

            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.innerHTML = `<img src="${IconSet.getDir('close')}" height="24" width="23" />`

            this.addEventListener('click',close);
    }
}