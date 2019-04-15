var svgs = require('../icons.js');
const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
const zoomFactorChange = settings.ZoomIncrement;

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',this.clickEvent);

        let shadowRoot = this.attachShadow({mode:'open'});

        shadowRoot.innerHTML = svgs.smallMinus;
    }

    clickEvent(){
        getCurrentView().getZoomFactor(factor=>{
            getCurrentView().setZoomFactor(factor - zoomFactorChange);
        });
    }
}