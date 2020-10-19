// var callbackQiwi = require('node-qiwi-api').callbackApi;
// var asyncQiwi = require('node-qiwi-api').asyncApi;
//
//
// var callbackWallet = new callbackQiwi(token);
// var asyncWallet = new asyncQiwi(token);



async function Requester() {
    const token = "f460c197ce86ea06306de8df46f8c7ea";
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     amount
        }
    const publicKey = "48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPrhNNjx7UpBJehKuApPtT33Hr2VD9nQ8zxXDjq9sjNN2FXMhjBxoYKCLMVdUYmLyJK39K19hNGKRsJyNfMP7CGSmTskPmZZFTT3AZN9xYR"
    const login = "79996763742"
    let url = `https://cors-anywhere.herokuapp.com/oplata.qiwi.com/create?publicKey=${token}&amount=1&billId=${login}&successUrl=http%3A%2F%2Ftest.ru%3F&email=m@ya.ru`
    await fetch(url, options)
        .then(res => res.json())
}

export default Requester;