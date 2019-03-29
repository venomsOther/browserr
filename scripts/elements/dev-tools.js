module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.innerHTML = 'Dev tools';
        this.addEventListener('click', openTools);
    }
}