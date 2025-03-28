const storage = [];

module.exports = {
    save: (message)=> storage.unshift(message),
    retrieve: ()=> [...storage]
}