const reader = require('../bookmarks.js');

module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        var item = reader.get(this.getAttribute('item'));
        this.href = item.href;

        this.innerHTML = `<b-ico href='${item.icon}'></b-ico><b-title>${item.title}</b-title>`;
        this.addEventListener('click',this.clickevent);
    }

    clickevent(){
        getCurrentView().src = this.href;
    }
}