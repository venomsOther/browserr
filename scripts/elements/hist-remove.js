module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        var num = this.getAttribute('num');

        require('../history.js').History.removeItem(num);
    }
}