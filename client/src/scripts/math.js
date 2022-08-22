function makeId(length) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++){  
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}

export { makeId}