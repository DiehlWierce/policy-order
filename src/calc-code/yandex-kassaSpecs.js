const yandexMoney = require("yandex-money-sdk");

let DB = {};

//id клиента
let client_id = "049D4728EAB3BEF3402E9AA84BBAF4CCB4184B72270442A5707BF1F8E3022F66";

let myWallet = "41001942497605";
//url куда вернется пользователь после операции
let redirect_uri = "https://vk.com/app7622112_72267912";

//секретный ключ... тут хранить не стоит
let client_secret = "B2785CBCE89827F96784394314B45E484B8704BF9FE5F83D12656D83C9DB20C4E0AAD096C24A204F7BE331B5B410AF47533A7096395C8DAD0DBB8EA10B413818";



yandexMoney.ExternalPayment.getInstanceId(client_id,
    function getInstanceComplete(err, data) {
        if(err) {
            // process error
            console.error(err)
        }
        DB.instanceId = data.instance_id;
        // save it to DB
        console.log("1: ", DB.instanceId)
    });

let externalPayment = new yandexMoney.ExternalPayment(DB.instanceId)

let options = {
    pattern_id: "p2p",             // Фиксированное значение «p2p»
    instance_id: DB.instanceId,    // Идентификатор экземпляра приложения
    to: myWallet,                  // Номер счета для пополнения
    amount: 120,                   // Сумма к списанию с банковской карты (на счет поступит эта сумма минус комиссия)
    amount_due: 10,                // Сумма к зачислению на ваш счет (с карты будет списана эта сумма плюс комиссия)
    message: "test"                // Комментарий к зачислению, отображается получателю
};

setTimeout(()=>{
    console.log("2: ", DB.instanceId)
    externalPayment.request(options,
        function requestComplete(err, data) {
            if(err) {
                // process error
                console.error(err)
            }
            DB.requestId = data.request_id;
            console.log("3: ", data)
        }
    );
},1000)



