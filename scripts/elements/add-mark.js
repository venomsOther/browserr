module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        var icon = window.document.querySelector('web--view:not([style="display: none;"])').tab.querySelector('tb-icon img').src;
        var url = window.document.querySelector('web--view:not([style="display: none;"])').view.src;
        var title;
    }
}