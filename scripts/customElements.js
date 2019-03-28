var req = require('module').createRequireFromPath('./elements');
function def(name){
    customElements.define(name, req(name+'.js'));
}

customElements.define('web--view', req('webview.js'));
def('add-tab');
def('ch-min');
def('ch-max');
def('ch-exit');
def('page-tabs');
def('pg-tab');
def('tb-remove');
def('tb-title');