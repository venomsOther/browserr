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
        document.querySelectorAll(`hist-menu`).forEach(e=>{
            if(e.getAttribute('num') == num){
                e.parentElement.remove();
            }
        });

        document.querySelectorAll(`hbr`).forEach(e=>{
            if(e.getAttribute('num') == num){
                e.remove();
            }
        });
    }
}