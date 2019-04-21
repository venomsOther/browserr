var svgs = require('../icons.js');
const settings = JSON.parse(require('fs').readFileSync(__dirname+'/../'+'settings.json').toString());
const zoomFactorChange = settings.ZoomIncrement;

const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',this.clickEvent);

        this.innerHTML = `<img src="${IconSet.getDir('zoomOut')}" />`;
    }

    clickEvent(){
        getCurrentView().getZoomFactor(factor=>{
            getCurrentView().setZoomFactor(factor - zoomFactorChange);
        });
    }
}