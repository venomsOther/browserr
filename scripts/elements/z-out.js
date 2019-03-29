module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',this.action);

        let shadowRoot = this.attachShadow({mode:'open'});

        shadowRoot.innerHTML = svgs.smallMinus;
    }

    action(){
        getCurrentView().getZoomFactor(factor=>{
            getCurrentView().setZoomFactor(factor - zoomFactorChange);
        });
    }
}