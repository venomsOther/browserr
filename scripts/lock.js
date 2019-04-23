const crypto = require('crypto-js/aes');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const readSync = fs.readFileSync;
const writeSync = fs.writeFileSync;
const key = "currentKey";


module.exports = class locker{

    constructor(password){
        this.pass = crypto.encrypt(password,key).toString();
    }

    encryptText(text){
        return locker.encryptText(crypto.decrypt(this.pass,key),text);
    }

    decryptText(bytes){
        return locker.decryptText(crypto.decrypt(this.pass,key),bytes);
    }

    encryptObject(object){
        return locker.encryptObject(crypto.decrypt(this.pass,key),object);
    }

    decryptObject(object){
        return locker.decryptObject(crypto.decrypt(this.pass,key),object);
    }

    decryptFile(dir){
        return locker.decryptFile(crypto.decrypt(this.pass,key),dir);
    }

    encryptFile(text,dir){
        locker.encryptFile(crypto.decrypt(this.pass,key),text,dir);
    }

    decryptJSON(dir){
        return locker.decryptJSON(crypto.decrypt(this.pass,key),dir);
    }

    encryptJSON(text,dir){
        locker.encryptJSON(crypto.decrypt(this.pass,key),text,dir);
    }
    
    /* *************************************************** */
    /* ********************* STATICS ********************* */
    /* *************************************************** */

    static encryptText(password,text){
        return crypto.encrypt(text,password).toString();
    }

    static decryptText(password,bytes){
        bytes = bytes.toString();
        var res = crypto.decrypt(bytes,password);

        return res.toString(CryptoJS.enc.Utf8);
    }

    static encryptObject(password,object){
        return this.encryptText(password,JSON.stringify(object));
    }

    static decryptObject(password,object){
        return JSON.parse(this.decryptText(password,object))
    }

    static decryptFile(password,dir){
        return this.decryptText(password,readSync(dir).toString())
    }

    static encryptFile(password,text,dir){
        writeSync(dir,this.encryptText(password,text));
    }

    static decryptJSON(password,dir){
        return this.decryptObject(password,readSync(dir).toString());
    }

    static encryptJSON(password,text,dir){
        writeSync(dir,this.encryptObject(password,text));
    }

}
