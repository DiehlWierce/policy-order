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
    FormLayout, ScreenSpinner, Header, SimpleCell, InfoRow

} from "@vkontakte/vkui";
import React, {useState} from "react";
import $ from "jquery";

import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28UsersOutline from "@vkontakte/icons/dist/28/users_outline";

//Переменные id панелей
const WhatPanels = {
    all: "all",
    res: "response",
    showKBM: "showKBM",
    showReqInfo: "showReqInfo"
}

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
const WhatIsKBM = ({ id, res, setRes }) => {

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
    }

    //Если запрос на восстановление
    function panelRestore() {
        setHeader("Восстановить КБМ")
        setActiveWPanel(WhatPanels.res);
    }

    //Если запрос на сброс
    function panelReset() {
        setHeader("Заявка на сброс")
        setActiveWPanel(WhatPanels.res);
        setPosts({
            ...posts,
            type: "transfer"
        })
    }

    //Функция, которая выполняет отправку после заполнения формы и нажатия на кнопку
    async function submit(e) {
        e.preventDefault();
        setPopout(<ScreenSpinner size='large' />)
        await sendFirst(posts).then(e => {
            if (posts.getkbm === "get") {
                setRes(res);
                setPosts(postTemplate)
                setPopout(null)
                setActiveWPanel(WhatPanels.showKBM);
            } else{
                setPosts(postTemplate);
                setPopout(null);
                console.log(1)
                console.log(2, JSON.parse(e))
                sendSecond(JSON.parse(e));
            }
        })
    };

    //TODO: Сделать проверку при выводе содержимого, мол, если success, то так выводится, иначе так.
    function sendSecond(res) {
        setPopout(<ScreenSpinner size='large' />)
        setPosts({...posts, orderid: "3747"});
        sendFirst(posts).then(e => {
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
    };


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
                    <Cell expandable before={<Icon28UsersOutline/>} onClick={panelReset}>
                        Заявка на сброс
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
                {(res.hasOwnProperty("success")) ? (
                    <Group>
                        <SimpleCell multiline >
                            <InfoRow header="Время и дата запроса">
                                {res["d_query"]}
                            </InfoRow>
                            <InfoRow header="ФИО клиента">
                                {res["surname"]} {res["name"]} {res["surname"]}
                            </InfoRow>
                            <InfoRow header="Дата рождения клиента">
                                {res["birthday"]}
                            </InfoRow>
                            <InfoRow header="серия и номер ВУ">
                                {res["driverDocSeries"]} {res["driverDocNumber"]}
                            </InfoRow>
                            <InfoRow header="Дата начала и окончания полиса">
                                {res["policyDateBeg"]} - {res["policyDateEnd"]}
                            </InfoRow>
                            <InfoRow header="Страховая компания">
                                {res["insurerName"]}
                            </InfoRow>
                            {(res["download"].length > 0) &&
                                <InfoRow header="Ссылка на скачивание файла РСА">
                                    <Link href={res["download"]} />
                                </InfoRow>
                            }
                        </SimpleCell>
                        {res["lossCRTTypeList"].length > 0 &&
                            <SimpleCell header="блок о ДТП">
                                {(res["lossCRTTypeList"].map(item => (
                                    <InfoRow>{item}</InfoRow>
                                )))}
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