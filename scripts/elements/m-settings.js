module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = "Multi View <br><input type='number' />";
        this.querySelector('input').addEventListener('input',this.clickEvent);
    }

    clickEvent(){
        document.querySelector('multi-view').changeGrid(this.value);
    }
}
