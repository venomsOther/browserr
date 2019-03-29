const settings = JSON.parse(require('fs').readFileSync('scripts/settings.json').toString());
var svgs = require('./icons.js');
const zoomFactorChange = settings.ZoomIncrement;
const History = require('./history.js').History;
const thisWindow = require('electron').remote.getCurrentWindow();
const readIcons = require('./readIcons.js');
const IconSet = new readIcons(settings.iconPack);
window.indicator = window.document.querySelector('ind');