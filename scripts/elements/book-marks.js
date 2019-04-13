const io = require('../bookmarks.js');

module.exports = class extends HTMLElement {    
    constructor(){
        super();

    }

    connectedCallback(){
        this.innerHTML = "";
        var marks = io.readAsObj();

        for(let i in marks){
            var m = document.createElement('b-mark');
            m.setAttribute("item",i);
            
            this.appendChild(m);
        }
    }
}