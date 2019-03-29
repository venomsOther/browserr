module.exports = class extends HTMLElement {    
    constructor(){
        super();
        
        this.addEventListener('click',this.action);
        
        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML = 'Reset';
    }

    action(){
        getCurrentView().setZoomFactor(1);
    }
}