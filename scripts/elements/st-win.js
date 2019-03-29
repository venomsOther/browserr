module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',makeNewWin);
    }
}