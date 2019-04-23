module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = "Multi View <br><input type='number' value='1' />";
        this.querySelector('input').addEventListener('input',this.clickEvent);
    }

    clickEvent(){
        document.querySelector('multi-view').changeGrid(this.value);
    }
}
