module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        var url = this.getAttribute('url');
        var dex = this.getAttribute('num');

        if(url == undefined || dex == undefined){
            throw new Error("A HIST-MENU was declared without a url or num attribute");
        }

        this.innerHTML = `<hist-ico></hist-ico><hist-open url='${url}'>Open</hist-open><hist-remove num="${dex}" >Remove</hist-remove>`;
    }
}