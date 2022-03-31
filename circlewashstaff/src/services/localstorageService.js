async function setLogInInfoWithExpiry(key, value){
    const now = new Date();
    const ttl = 1000 * 60 * 60 * 23;
    //ttl should match cookie expire age
    //cookie expire age is 1000 * 60 * 60 * 12 ms
    const login = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(login));
}

async function getLogInInfoWithExpiry(key){
    const loginStr = localStorage.getItem(key);
    if(!loginStr){
        return null;
    }
    const login = JSON.parse(loginStr);
    const now = new Date();

    if(now.getTime() > login.expiry){
        localStorage.removeItem(key);
        return null;
    }
    return login.value;
}

async function setLogOut(keys){
    for(let i = 0; i < keys.length; i++){
        localStorage.removeItem(keys[i]);
    }
}

module.exports = {
    setLogInInfoWithExpiry,
    getLogInInfoWithExpiry,
    setLogOut
}