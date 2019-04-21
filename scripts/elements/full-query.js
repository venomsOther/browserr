module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        var title = this.getAttribute('title');
        var msg = this.getAttribute('msg');
        var type = this.getAttribute('type');

        this.innerHTML = `<h2>${title}</h2><div class='queryMsg' >${msg}</div><input type="${type}" /><button id="done">Next</button> `
    }
}