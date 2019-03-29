module.exports = class extends HTMLElement {    
    constructor(){
        super();
        
    }

    connectedCallback(){
        this.href = this.getAttribute('href');
    }

    get img(){
        return this.children[0];
    }
}