const io = require('../bookmarks.js');
const settings = window.settings;
const readIcons = require('../readIcons.js');
const IconSet = new readIcons(settings.iconPack);

function queryTitle(){
    return new Promise((resolve,reject)=>{
        var e = document.createElement('full-query');
        e.setAttribute('msg','Please enter a title for your bookmark');
        e.setAttribute('title','Title');
        e.setAttribute('type','text');
        document.querySelector('body').appendChild(e);

        e.querySelector('input').addEventListener('keydown',(k)=>{
            if(k.key == 'enter'){
                var val = e.querySelector('input').value
                e.remove();
                resolve(val);
            }
        });

        e.querySelector('#done').addEventListener('click',()=>{
            var val = e.querySelector('input').value
            e.remove();
            resolve(val);
            
        });

    });
}

function refreshBookmarks(){
    document.querySelector('book-marks').connectedCallback();
}


module.exports = class extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `<img src="${IconSet.getDir('addFavorite')}" height="24" width="25" />`;
        this.addEventListener('click',this.clickEvent);
    }

    clickEvent(){
        var icon = window.document.querySelector('web--view:not([style="display: none;"])').tab.querySelector('tb-icon img').src;
        var url = window.document.querySelector('web--view:not([style="display: none;"])').view.src;
        queryTitle().then((title)=>{
            var t = title;
            var obj = {
                href:url,
                title:t,
                icon:icon
            }

            io.set(t,obj);
            refreshBookmarks();
        }).catch(e=>{
            throw new Error(e);
        });
    }
}