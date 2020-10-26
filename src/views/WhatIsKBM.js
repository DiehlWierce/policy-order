// <?
// $url = 'https://getkbm.ru/API/';
// $post_data = array(
// 'API' => $_POST["api"],
// 'fam' => $_POST["fam"],
// 'im' => $_POST["im"],
// 'otch' => $_POST["otch"],
// 'vod' => $_POST["vod"],
// 'birthday' => $_POST["birthday"],
// 'old_vod'=> $_POST["old_vod"],
// 'old_fam'=> $_POST["old_fam"],
// 'pasp'=> $_POST["pasp"],
// 'old_pasp'=> $_POST["old_pasp"],
// 'Type'=> $_POST["type"],
// 'OrderID'=> $_POST["orderid"],
// 'GetBalance'=> $_POST["getbalance"],
// 'GetKBM'=> $_POST["getkbm"]
// );
// $to_delete = array('');
// $post_data = array_diff($post_data, $to_delete);
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, $url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_POST, 1);
// curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
// $output = curl_exec($ch);
// curl_close($ch);
// echo $output;
// ?>


import {
    View,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Group, Textarea,
    Cell, Button, Input, Link,
    FormLayout, ScreenSpinner, Header, SimpleCell, InfoRow, PopoutWrapper, ActionSheet, ActionSheetItem

} from "@vkontakte/vkui";
import React, {useState} from "react";
import $ from "jquery";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28UsersOutline from "@vkontakte/icons/dist/28/users_outline";

import Iframe from "../calc-code/IFrame";
import bridge from "@vkontakte/vk-bridge";

//Переменные id панелей
const WhatPanels = {
    all: "all",
    res: "response",
    showKBM: "showKBM",
    showReqInfo: "showReqInfo"
}

const successURLTemplate = {
    discoverKBM: {
        url: "https://vk.com/app7622112_72267912/#discoverKBM",
        desc: "Оплата услуги 'Узнать КБМ'",
        iframe: <iframe src="https://promo-money.ru/quickpay/shop-widget?writer=seller&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20-%20%D0%A3%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%9A%D0%91%D0%9C&targets-hint=&default-sum=150&button-text=12&payment-type-choice=on&fio=on&mail=on&hint=&successURL=https%3A%2F%2Fvk.com%2Fapp7622112_72267912%2F%23discoverKBM&quickpay=shop&account=41001942497605" width="100%" height="223" frameBorder="0" allowTransparency="true" scrolling="no" />
    },
    restoreKBM: {
        url: "https://vk.com/app7622112_72267912/#restoreKBM",
        desc: "Оплата услуги 'Восстановить КБМ'",
        iframe: <iframe src="https://promo-money.ru/quickpay/shop-widget?writer=seller&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20-%20%D0%92%D0%BE%D1%81%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%82%D1%8C%20%D0%9A%D0%91%D0%9C&targets-hint=&default-sum=150&button-text=12&payment-type-choice=on&fio=on&mail=on&hint=&successURL=https%3A%2F%2Fvk.com%2Fapp7622112_72267912%2F%23restoreKBM&quickpay=shop&account=41001942497605" width="100%" height="223" frameBorder="0" allowTransparency="true" scrolling="no" />
    },
    transferKBM: {
        url: "https://vk.com/app7622112_72267912/#transferKBM",
        desc: "Оплата услуги 'Перенос КБМ'",
        iframe: <iframe src="https://promo-money.ru/quickpay/shop-widget?writer=seller&targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D0%B8%20-%20%D0%9F%D0%B5%D1%80%D0%B5%D0%BD%D0%B5%D1%81%D1%82%D0%B8%20%D0%9A%D0%91%D0%9C&targets-hint=&default-sum=150&button-text=12&payment-type-choice=on&fio=on&mail=on&hint=&successURL=https%3A%2F%2Fvk.com%2Fapp7622112_72267912%2F%23transferKBM&quickpay=shop&account=41001942497605" width="100%" height="223" frameBorder="0" allowTransparency="true" scrolling="no" />
    },
}

// const successURLTemplate = {
//     discoverKBM: {
//         url: "https://localhost:10888/#discoverKBM",
//         desc: "Оплата услуги 'Узнать КБМ'"
//     },
//     restoreKBM: {
//         url: "https://localhost:10888/#restoreKBM",
//         desc: "Оплата услуги 'Восстановить КБМ'"
//     },
//     transferKBM: {
//         url: "https://localhost:10888/#transferKBM",
//         desc: "Оплата услуги 'Перенос КБМ'"
//     },
// }

//Образец отправляемой формы
const postTemplate = {
    api: "9ee5b16-b2fafd9-699f307-25d7dd8-9128",
    fam: "",
    im: "",
    otch: "",
    vod: "",
    birthday: "",
    old_vod: "",
    old_fam: "",
    pasp: "",
    old_pasp: "",
    type: "",
    orderid: "",
    getbalance: "",
    getkbm: ""
}

const resTemplate = {
    "d_query":"26.02.2020 (13:21:20)",
    "surname":"Тестов",
    "name":"Тест",
    "patronymic":"Тестович",
    "birthday":"22.10.1975",
    "driverDocSeries":"0011",
    "driverDocNumber":"223344",
    "datekbm":"26.02.2018",
    "kbmValue":0.75,
    "kbmClass":8,
    "policySerialKey":"МММ",
    "policyNumberKey":"0719289414",
    "policyDateBeg":"27.03.2016",
    "policyDateEnd":"26.03.2017",
    "policyKbmValue":0.8,
    "policyKbmClass":7,
    "insurerName":"Росгосстрах",
    "lossCRTTypeList":[],
    "download":"https://test.getkbm.ru/API/download/24501945.pdf"
}

const reqTemplate = {
    "success": "",
    "OrderID": null,
    "OldKBM": null,
    "NewKBM": null,
    "ChangeDate": "",
    "Status": null,
    "OldKBMFile": "",
    "NewKBMFile": "",
    "Comment": "",
    "error": ""
}

//Начало компонента
const WhatIsKBM = ({ id, res, setRes, fetchedData, setFetchedData, hasHash, successURL, setSuccessURL }) => {
    async function _tester() {
        let fetchedPost = await bridge.send("VKWebAppStorageGet", {keys: ["posts"]})
        setPosts(Object.values(fetchedPost.keys));
        submit()
    }
    _tester();


    //Смена панелей
    const [activeWPanel, setActiveWPanel] = useState(WhatPanels.all);
    //Смена названия шапки
    const [header, setHeader] = useState("");
    //Запонение массива данных с формы для отправка
    const [posts, setPosts] = useState(postTemplate);
    //Всплывающий спинер на время загрузки запроса
    const [popout, setPopout] = useState(null);
    //ответ с сервера API
    const [req, setReq] = useState(reqTemplate)
    //URL для API
    const url = 'https://cors-anywhere.herokuapp.com/d99967vk.beget.tech/post.php';
    //асинхронная функция отправки запроса к API
    async function sendFirst(e){
        return await $.post(url, e)
    }

    //Если запрос на узнать КБМ
    function panelDiscover() {
        setHeader("Узнать КБМ")
        setActiveWPanel(WhatPanels.res);
        setPosts({
            ...posts, getkbm: "get"
        })
        setSuccessURL(successURLTemplate.discoverKBM)
    }

    //Если запрос на восстановление
    function panelRestore() {
        setHeader("Восстановить КБМ")
        setActiveWPanel(WhatPanels.res);
        setSuccessURL(successURLTemplate.restoreKBM)
    }

    //Если запрос на сброс
    function panelTransfer() {
        setHeader("Заявка на сброс")
        setActiveWPanel(WhatPanels.res);
        setPosts({
            ...posts,
            type: "transfer"
        })
        setSuccessURL(successURLTemplate.transferKBM)
    }

    // Функция, которая выполняет отправку после заполнения формы и нажатия на кнопку
    async function submit(e) {
        // e.preventDefault();
        await bridge.send("VKWebAppStorageSet", {
            key: 'posts',
            value: JSON.stringify(posts)
        });
        if (hasHash.result) {
            await paidSender()
        }else{
            setPopout(
                <ActionSheet onClose={() => setPopout(null)}>
                    <ActionSheetItem>
                        <div>
                            <Iframe successURL={successURL} />
                        </div>
                    </ActionSheetItem>
                    <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>
                </ActionSheet>
            )
        }

        async function paidSender() {
            setPopout(<ScreenSpinner size='large' />)
            await sendFirst(posts).then(res => {
                if (posts.getkbm === "get") {
                    setRes(res);
                    setFetchedData(...fetchedData, fetchedData.push(res))
                    setPosts(postTemplate)
                    setPopout(null)
                    setActiveWPanel(WhatPanels.showKBM);
                } else{
                    setPosts(postTemplate);
                    sendSecond(JSON.parse(res));
                }
            })
        }


            // .finally(() => {
        //     // // if (posts.getkbm === "get") {
        //         setRes(resTemplate);
        //         setFetchedData(...fetchedData, fetchedData.push(resTemplate))
        //         setPosts(postTemplate)
        //         setPopout(null)
        //         setActiveWPanel(WhatPanels.showKBM);
            // // } else{
            // //     console.log("2", e)
            // //     setPosts(postTemplate);
            // //     setPopout(null);
            // //     sendSecond(JSON.parse(e));
            // // }
        // })
        // console.log(fetchedData)
    }

    //TODO: Сделать проверку при выводе содержимого, мол, если success, то так выводится, иначе так.
    async function sendSecond(res) {
        setPosts({...posts, orderid: res["OrderID"]});
        await sendFirst(posts).then(e => {
            setFetchedData(...fetchedData, fetchedData.push(e))
            setReq(JSON.parse(e))
            setPosts(postTemplate);
            setPopout(null);
            setActiveWPanel(WhatPanels.showReqInfo);
        })
    }



    //Добавление значения из формы
    function update(e) {
        setPosts({
            ...posts,
            [e.target.name]: e.target.value
        });
    }


    return (
        <View id={id} activePanel={activeWPanel} popout={popout}>
            <Panel id={WhatPanels.all}>
                <PanelHeader separator={true}>Узнать или восстановить КБМ</PanelHeader>
                <Group>
                    <Cell expandable before={<Icon28UserOutline/>} onClick={panelDiscover}  >
                        Узнать КБМ
                    </Cell>
                    <Cell expandable before={<Icon28UsersOutline/>} onClick={panelRestore}>
                        Восстановить КБМ
                    </Cell>
                    <Cell expandable before={<Icon28UsersOutline/>} onClick={panelTransfer}>
                        Заявка на перенос КБМ
                    </Cell>
                </Group>
            </Panel>
            <Panel id={WhatPanels.res} centered>
                <PanelHeader separator={true} left={<PanelHeaderBack onClick={() => setActiveWPanel(WhatPanels.all)} /> }>
                    {header}
                </PanelHeader>
                <FormLayout onSubmit={submit}>
                    <Input
                        top="Имя"
                        name="im"
                        value={posts.im}
                        onChange={update}
                    />
                    <Input
                        top="Фамилия"
                        name="fam"
                        value={posts.fam}
                        onChange={update}
                    />
                    <Input
                        top="Отчество"
                        name="otch"
                        value={posts.otch}
                        onChange={update}
                    />
                    <Input
                        top="Дата рождения"
                        name="birthday"
                        value={posts.birthday}
                        onChange={update}
                    />
                    <Input
                        top="Серия и номер водительского удостверения"
                        name="vod"
                        value={posts.vod}
                        onChange={update}
                    />
                    {(header === "Восстановить КБМ" || header === "Заявка на сброс") &&
                        <Input
                            top="Предыдущие серия и номер водительского удостверения"
                            name="old_vod"
                            value={posts.old_vod}
                            onChange={update}
                        />
                    }{(header === "Восстановить КБМ" || header === "Заявка на сброс") &&
                        <Input
                            top="На какую дату произвести расчет"
                            name="pasp"
                            value={posts.pasp}
                            onChange={update}
                        />
                    }{(header === "Восстановить КБМ" || header === "Заявка на сброс") &&
                        <Textarea
                            top="Комментарий к заказу"
                            name="old_pasp"
                            value={posts.old_pasp}
                            onChange={update}
                        />
                    }
                    <Button size="xl">Отправить</Button><br/>
                </FormLayout>
            </Panel>
            <Panel id={WhatPanels.showKBM} centered>
                <PanelHeader separator={true} left={<PanelHeaderBack onClick={() => setActiveWPanel(WhatPanels.all)} /> }>
                    {header}
                </PanelHeader>
                <Header mode="secondary">Информация по КБМ</Header>
                {(!res.hasOwnProperty("error")) ? (
                    <Group>
                        <SimpleCell multiline >
                            <InfoRow header="Время и дата запроса">
                                {res["d_query"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="ФИО клиента">
                                {res["surname"]} {res["name"]} {res["patronymic"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Дата рождения клиента">
                                {res["birthday"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="серия и номер ВУ">
                                {res["driverDocSeries"]} {res["driverDocNumber"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Дата начала и окончания полиса">
                                {res["policyDateBeg"]} - {res["policyDateEnd"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Дата, на которую сформирован расчет">
                                {res["datekbm"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Класс КБМ">
                                {res["kbmClass"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Значение КБМ">
                                {res["kbmValue"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Страховая компания">
                                {res["insurerName"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Серия и номер полиса">
                                {res["policySerialKey"]} {res["policyNumberKey"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Класс и значение КБМ в полисе">
                                {res["policyKbmClass"]}
                            </InfoRow>
                            <br />
                            <InfoRow header="Значение КБМ в полисе">
                                {res["policyKbmValue"]}
                            </InfoRow>
                            <br />
                            {(res["download"]) &&
                                <InfoRow header="Ссылка на скачивание файла РСА">
                                    <Link href={res["download"]}>download</Link>
                                </InfoRow>
                            }
                        </SimpleCell>
                        <br />
                        {res["lossCRTTypeList"] &&
                            <SimpleCell header="блок о ДТП">
                                {(res["lossCRTTypeList"].map(item => (
                                    <InfoRow>{item}</InfoRow>
                                )))}
                                <br />
                            </SimpleCell>}
                    </Group>
                ):(
                    <ScreenSpinner size='large' />
                )}
            </Panel>
            <Panel id={WhatPanels.showReqInfo} centered>
                <PanelHeader separator={true} left={<PanelHeaderBack onClick={() => setActiveWPanel(WhatPanels.all)} /> }>
                    {header}
                </PanelHeader>
                <Group header="Информация по заявке">
                {(req["error"].length > 0) ? (
                    <SimpleCell>
                        <InfoRow>
                            {req["error"]}
                        </InfoRow>
                    </SimpleCell>
                ) : (
                    <SimpleCell>
                        <InfoRow header="Номер заявки">
                            {req["OrderID"]}
                        </InfoRow>
                        <InfoRow header="Дата последней работы с заявкой">
                            {req["ChangeDate"]}
                        </InfoRow>
                        <InfoRow header="Статус заявки">
                            {req["Status"] === 0 && "Заявка принята"}
                            {req["Status"] === 1 && "Заявка в работе"}
                            {req["Status"] === 2 && "Заявка выполнена"}
                            {req["Status"] === 3 && "Отказано"}
                        </InfoRow>
                        {(req["Comment"].length > 0) &&
                        <InfoRow header="Комментарий к заявке">
                            {req["Comment"]}
                        </InfoRow>}
                        {(req["OldKBM"] != null) &&
                            <InfoRow header="Cтарый КБМ">
                                {req["OldKBM"]}
                            </InfoRow>}
                        {(req["NewKBM"] != null) &&
                            <InfoRow header="Новый КБМ">
                                {req["NewKBM"]}
                            </InfoRow>}
                        {(req["OldKBMFile"].length > 0) &&
                            <InfoRow header="Cсылка на PDF-файл РСА со 'старым' КБМ - взятым в работу">
                                <Link href={req["OldKBMFile"]} />
                            </InfoRow>}
                        {(req["NewKBMFile"].length > 0) &&
                            <InfoRow header="Cсылка на PDF-файл РСА с 'новым' КБМ - который обработан в РСА">
                                <Link href={req["NewKBMFile"]} />
                            </InfoRow>}
                    </SimpleCell>)}
                </Group>
            </Panel>
        </View>
    )
}

export default WhatIsKBM;