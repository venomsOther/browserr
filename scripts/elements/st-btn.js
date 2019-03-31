function fix(){
    makeWebv();
}

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',fix);
    }
}