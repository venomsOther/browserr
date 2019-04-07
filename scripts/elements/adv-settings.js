console.log('r')

module.exports = class extends HTMLElement {    
    constructor(){
        super();
        this.addEventListener('click',settingsWindow);
    }
}