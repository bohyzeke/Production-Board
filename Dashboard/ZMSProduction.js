[
    {
        "id": "c9103793.c23e98",
        "type": "tab",
        "label": "ZMSProduction",
        "disabled": false,
        "info": ""
    },
    {
        "id": "7c37aa5a.3eb2a4",
        "type": "debug",
        "z": "c9103793.c23e98",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "true",
        "x": 770,
        "y": 100,
        "wires": []
    },
    {
        "id": "d052a1e1.dd6938",
        "type": "delay",
        "z": "c9103793.c23e98",
        "name": "TaktTime Tim",
        "pauseType": "delayv",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 570,
        "y": 180,
        "wires": [
            [
                "49162c05.0f28ac",
                "25b83196.a84de6",
                "7c37aa5a.3eb2a4"
            ]
        ]
    },
    {
        "id": "49162c05.0f28ac",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Start-Stop",
        "func": "\nvar Line = \"1\";\nvar data = msg.payload;\n\nif ( msg.payload === true  ){\n    var temp = global.get(\"Takt\"+Line);\n    msg.delay = temp;\n    return msg;\n} \nelse {\n    msg.payload = \"\";\n    msg.reset = true;\n    return msg;\n}\n\n\n\n\n\n\n",
        "outputs": "1",
        "noerr": 0,
        "x": 570,
        "y": 80,
        "wires": [
            [
                "d052a1e1.dd6938"
            ]
        ]
    },
    {
        "id": "25b83196.a84de6",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Plan Counter 1",
        "func": "var line = \"1\";\nvar temp = msg.payload;\nvar Start= global.get('StartL'+line)|false;\nvar Plan = global.get('plan'+line)|0;\nvar Aktual = global.get('aktual'+line)|0;\n\n\n\n// Reset cisel\nif (temp ==\"reset\"){\n    msg.payload = 0;\n    Plan=0;\n    global.set(\"plan\"+line,0);\n    Aktual=0;\n}\n// priratanie do aktual\nif (temp ==\"1+\"){\n    Aktual++;\n}\nglobal.set(\"aktual\"+line,Aktual);// ulozenie aktual\n\nif(temp === true){\n    Plan++;\n    global.set(\"plan\"+line,Plan);\n}\n\nmsg.payload = Plan;\n\nvar Difer = Aktual - Plan;\n\n//nastavenie farby pisma\nmsg.color = (Difer>=0)?'gren':'red';\nif (msg.payload > 0){\n    msg.payload = \"+\" + Difer;\n}\n\n// zobrazenie pod nodom\nnode.status({fill:\"black\",shape:\"dot\",text:\"Plan:\"+Plan+\" Akt:\"+Aktual+\" Dif:\"+Difer });\nmsg.pla = Plan;\nmsg.akt = Aktual;\nmsg.dif = Difer;\nreturn msg;",
        "outputs": "1",
        "noerr": 0,
        "x": 780,
        "y": 180,
        "wires": [
            [
                "3150ffbe.d24d"
            ]
        ],
        "outputLabels": [
            "Plan"
        ]
    },
    {
        "id": "4885ace5.fa0f6c",
        "type": "ui_switch",
        "z": "c9103793.c23e98",
        "name": "",
        "label": "",
        "group": "4b2f647a.6ff2d4",
        "order": 2,
        "width": "2",
        "height": "1",
        "passthru": true,
        "decouple": "false",
        "topic": "",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-power-off",
        "oncolor": "green",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-power-off",
        "offcolor": "red",
        "x": 390,
        "y": 80,
        "wires": [
            [
                "49162c05.0f28ac"
            ]
        ]
    },
    {
        "id": "15547e1d.fd559a",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "RESET",
        "group": "4b2f647a.6ff2d4",
        "order": 4,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "Reset",
        "color": "",
        "bgcolor": "black",
        "icon": "",
        "payload": "reset",
        "payloadType": "str",
        "topic": "",
        "x": 580,
        "y": 240,
        "wires": [
            [
                "25b83196.a84de6"
            ]
        ]
    },
    {
        "id": "464c8cb2.9a183c",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "",
        "group": "4b2f647a.6ff2d4",
        "order": 3,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "+1",
        "color": "",
        "bgcolor": "",
        "icon": "pets",
        "payload": "1+",
        "payloadType": "str",
        "topic": "",
        "x": 590,
        "y": 280,
        "wires": [
            [
                "25b83196.a84de6"
            ]
        ]
    },
    {
        "id": "51a5cb5a.9d2914",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "",
        "func": "\nvar pocet = 9;\nvar AktHod = new Date().getHours();\nvar AktMin = new Date().getMinutes();\nvar AktSec = new Date().getSeconds();\nvar start = 0;\nvar end = 0;\n//var trap = [];\nvar tempa=\" \";\n\nmsg3={};\ndatum = new Date().toString().replace(/T/, ' ').replace(/\\..+/, ''); \nmsg3.payload = datum;\n\nfor (i=1;i<=pocet;i++){\n    var temp = global.get(\"Start\"+i);  \n    var Smin = new Date(temp).getUTCMinutes();\n    var Shod = new Date(temp).getUTCHours();\n    var temp = global.get(\"End\"+i); \n    var Emin = new Date(temp).getUTCMinutes();\n    var Ehod = new Date(temp).getUTCHours();\n\n    if ((AktHod == Shod) && (AktMin == Smin) && (AktSec < 1) ){\n        start=start+1;\n    } else if ((AktHod == Ehod) && (AktMin == Emin) && (AktSec < 1) ){\n        end=end+1;\n    }\n\n}\n\nif (start>0||end>0){\n    if (start>0){\n        msg.payload=true;\n        return [msg3,msg] ;\n        \n    }\n    if(end>0 ){\n        msg.payload=false;\n        \n        return [msg3,msg];\n    }\n   \n}\nvar now=msg.payload;\n\n\n\n\n//return msg3;    \n//return msg;\nreturn [msg3,null];   \n\n\n\n\n",
        "outputs": "2",
        "noerr": 0,
        "x": 230,
        "y": 380,
        "wires": [
            [],
            [
                "4885ace5.fa0f6c",
                "93f1dfc9.6f313",
                "913f9621.0c30b8",
                "45209d31.e744ec"
            ]
        ],
        "outputLabels": [
            "Smena on",
            ""
        ]
    },
    {
        "id": "d79288fa.4f4e8",
        "type": "inject",
        "z": "c9103793.c23e98",
        "name": "1 Sec",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "1",
        "crontab": "",
        "once": true,
        "x": 100,
        "y": 300,
        "wires": [
            [
                "51a5cb5a.9d2914"
            ]
        ]
    },
    {
        "id": "93f1dfc9.6f313",
        "type": "debug",
        "z": "c9103793.c23e98",
        "name": "edo",
        "active": false,
        "console": "false",
        "complete": "payload",
        "x": 410,
        "y": 300,
        "wires": []
    },
    {
        "id": "3150ffbe.d24d",
        "type": "ui_template",
        "z": "c9103793.c23e98",
        "group": "4b2f647a.6ff2d4",
        "name": "Zobrazenie 1",
        "order": 1,
        "width": "28",
        "height": "6",
        "format": "<!DOCTYPE html>\n\n<div  class=nazov >\n    <h3 >Linka 1</h3> \n</div>\n<table class=tabulka >  \n    <tr>\n        <th>\n            <b>Plan</b></th>\n        <th>\n            <b>Aktual</b></th>\n        <th>\n            <b>Diference</b></th>        \n    </tr>\n    <tr>\n        <td >\n            <h1 >\n            {{msg.pla}}\n            </h1>\n        </td>\n        <td>\n            <h1>\n            {{msg.akt}}\n            </h1>\n        </td>\n        <td>\n            <font color='{{msg.color}}' >\n            <h1>\n            {{msg.dif}}\n            </h1></font>\n        </td>\n    </tr>\n</table>\n\n\n\n",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "templateScope": "local",
        "x": 970,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "c2959554.6d51e",
        "type": "ui_template",
        "z": "c9103793.c23e98",
        "group": "4b2f647a.6ff2d4",
        "name": "css etc",
        "order": 10,
        "width": "0",
        "height": "0",
        "format": "<!DOCTYPE html>\n<style>\nh1 {\n    text-align: center;\n}\n\n.nazov { text-align:center ;vertical-align:bottom; height:70px; }\n.counter{ background-color:red;font-size:90px}\n.tcount{color:red}\n\n.tabulka{\n    background-color:green !important; \n    border:1px solid black; \n    border-collapse:collapse; \n    width:100%;\n}\n.tabulka tr {\n    height:1; \n    width:100%;\n}\n.tabulka th {\n    height:2; \n    width:33%;\n    color:white;\n    text-align:center;\n    vertical-align:bottom;\n    font-size:25px;\n}\n.tabulka td {\n    color:black;\n    font-size: 18px;\n    text-align:center;\n    font-size:52px;\n}\n\n\n.cellGreen \n{\nbackground-color: #ffdddd !important;\n}\n\n  .filled { \n      height: 30% !important;\n      width:100% !important;\n      \n  }\n  .nr-dashboard-template {\n      padding: 0;\n      margin: 0;\n  }\n  \n  .rounded {\n  border-radius: 12px 12px 12px 12px;\n}\n \n   .bigfont {\n  font-size: 18px;\n}\n\n   .smallfont {\n  font-size: 12px;\n}\n \n\n  \n.zui-table {\n    border: solid 1px #DDEEEE;\n    border-collapse: collapse;\n    border-spacing: 0;\n    font: normal 9px Arial, sans-serif;\n    outline: none;\n}\n.zui-table thead th {\n    width: 100%;\n    height:50%;\n    background-color: #99bbff;\n    border: solid 1px #DDEEEE;\n    color: #336B6B;\n    padding: 6px 2px 3px 3px;\n    text-align: center;\n    text-shadow: 1px 1px 1px #fff;\n}\n.zui-table tbody td {\n    width: 30%;\n    height:50%;\n    border: solid 1px #333;\n    color: #333;\n    text-align: center;\n    padding: 6px 2px 6px 3px;\n    text-shadow: 1px 1px 1px #fff;\n} \n</style>\n\n<script>\nvar current=1;\n\n\nfunction blinker()\n{\n    if(document.getElementById(\"blink\"))\n    {\n        var d = document.getElementById(\"blink\") ;\n        d.style.color= (d.style.color=='red'?'white':'red');\n        setTimeout('blinker()', 500);\n    }\n}\nfunction restore_bg(x) {\n            $(this).css(\"background-color\", x);\n    };\n\n\n\n\n</script>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "templateScope": "local",
        "x": 200,
        "y": 140,
        "wires": [
            []
        ]
    },
    {
        "id": "7dbb53d.84890ac",
        "type": "debug",
        "z": "c9103793.c23e98",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "true",
        "x": 770,
        "y": 380,
        "wires": []
    },
    {
        "id": "926ecbd1.f2b59",
        "type": "delay",
        "z": "c9103793.c23e98",
        "name": "TaktTime Tim",
        "pauseType": "delayv",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 570,
        "y": 480,
        "wires": [
            [
                "2c6b53d9.59ae44",
                "e23e32f6.86b308",
                "7dbb53d.84890ac"
            ]
        ]
    },
    {
        "id": "2c6b53d9.59ae44",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Start-Stop",
        "func": "var Line = \"2\";\nvar data = msg.payload;\n\nif ( msg.payload === true  ){\n    var temp = global.get(\"Takt\"+Line);\n    msg.delay = temp;\n    return msg;\n} \nelse {\n    msg.payload = \"\";\n    msg.reset = true;\n    return msg;\n}",
        "outputs": "1",
        "noerr": 0,
        "x": 570,
        "y": 380,
        "wires": [
            [
                "926ecbd1.f2b59"
            ]
        ]
    },
    {
        "id": "e23e32f6.86b308",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Plan Counter 2",
        "func": "var line = \"2\";\nvar temp = msg.payload;\n\nvar Plan = global.get(\"plan\"+line)|0;\nvar Aktual = global.get('aktual'+line)|0;\n\n\n// Reset cisel\nif (temp ==\"reset\"){\n    msg.payload = 0;\n    Plan=0;\n    global.set(\"plan\"+line,0);\n    Aktual=0;\n}\n// priratanie do aktual\nif (temp ==\"1+\"){\n    Aktual++;\n}\nglobal.set(\"aktual\"+line,Aktual);// ulozenie aktual\n\nif(temp === true){\n    Plan++;\n    global.set(\"plan\"+line,Plan);\n}\nmsg.payload = Plan;\n\nvar Difer = Aktual - Plan;\n\n\n//nastavenie farby pisma\nmsg.color = (Difer>=0)?'gren':'red';\nif (msg.payload > 0){\n    msg.payload = \"+\" + Difer;\n}\n\n// zobrazenie pod nodom\nnode.status({fill:\"black\",shape:\"dot\",text:\"Plan:\"+Plan+\" Akt:\"+Aktual+\" Dif:\"+Difer });\nmsg.pla = Plan;\nmsg.akt = Aktual;\nmsg.dif = Difer;\nreturn msg;",
        "outputs": "1",
        "noerr": 0,
        "x": 780,
        "y": 480,
        "wires": [
            [
                "6e6ac4ab.70a3a4"
            ]
        ],
        "outputLabels": [
            "Plan"
        ]
    },
    {
        "id": "913f9621.0c30b8",
        "type": "ui_switch",
        "z": "c9103793.c23e98",
        "name": "",
        "label": "",
        "group": "eb365a9e.3c5ff",
        "order": 2,
        "width": "2",
        "height": "1",
        "passthru": true,
        "decouple": "false",
        "topic": "",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-power-off",
        "oncolor": "green",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-power-off",
        "offcolor": "red",
        "x": 390,
        "y": 380,
        "wires": [
            [
                "2c6b53d9.59ae44"
            ]
        ]
    },
    {
        "id": "35b17cbf.55ed8c",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "RESET",
        "group": "eb365a9e.3c5ff",
        "order": 4,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "Reset",
        "color": "",
        "bgcolor": "black",
        "icon": "",
        "payload": "reset",
        "payloadType": "str",
        "topic": "",
        "x": 580,
        "y": 540,
        "wires": [
            [
                "e23e32f6.86b308"
            ]
        ]
    },
    {
        "id": "f4c6b5bb.8665f",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "",
        "group": "eb365a9e.3c5ff",
        "order": 3,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "+1",
        "color": "",
        "bgcolor": "",
        "icon": "pets",
        "payload": "1+",
        "payloadType": "str",
        "topic": "",
        "x": 590,
        "y": 580,
        "wires": [
            [
                "e23e32f6.86b308"
            ]
        ]
    },
    {
        "id": "6e6ac4ab.70a3a4",
        "type": "ui_template",
        "z": "c9103793.c23e98",
        "group": "eb365a9e.3c5ff",
        "name": "Zobrazenie 2",
        "order": 1,
        "width": "28",
        "height": "6",
        "format": "<!DOCTYPE html>\n\n<div  class=nazov >\n    <h3 >Linka 2</h3> \n</div>\n<table class=tabulka >  \n    <tr>\n        <th>\n            <b>Plan</b></th>\n        <th>\n            <b>Aktual</b></th>\n        <th>\n            <b>Diference</b></th>        \n    </tr>\n    <tr>\n        <td >\n            <h1 >\n            {{msg.pla}}\n            </h1>\n        </td>\n        <td>\n            <h1>\n            {{msg.akt}}\n            </h1>\n        </td>\n        <td >\n            <font color='{{msg.color}}' >\n            <h1>\n            {{msg.dif}}\n            </h1></font>\n        </td>\n    </tr>\n</table>\n\n\n\n",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "templateScope": "local",
        "x": 970,
        "y": 480,
        "wires": [
            []
        ]
    },
    {
        "id": "b19d349.865b948",
        "type": "debug",
        "z": "c9103793.c23e98",
        "name": "",
        "active": false,
        "console": "false",
        "complete": "true",
        "x": 770,
        "y": 660,
        "wires": []
    },
    {
        "id": "6f1e60d5.1e9228",
        "type": "delay",
        "z": "c9103793.c23e98",
        "name": "TaktTime Tim",
        "pauseType": "delayv",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "x": 570,
        "y": 760,
        "wires": [
            [
                "c0c1613c.389aa",
                "64d957e1.1be3e8",
                "b19d349.865b948"
            ]
        ]
    },
    {
        "id": "c0c1613c.389aa",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Start-Stop",
        "func": "\nvar Line = \"3\";\nvar data = msg.payload;\n\nif ( msg.payload === true  ){\n    var temp = global.get(\"Takt\"+Line);\n    msg.delay = temp;\n    return msg;\n} \nelse {\n    msg.payload = \"\";\n    msg.reset = true;\n    return msg;\n}",
        "outputs": "1",
        "noerr": 0,
        "x": 570,
        "y": 660,
        "wires": [
            [
                "6f1e60d5.1e9228"
            ]
        ]
    },
    {
        "id": "64d957e1.1be3e8",
        "type": "function",
        "z": "c9103793.c23e98",
        "name": "Plan Counter 3",
        "func": "var line = \"3\";\nvar temp = msg.payload;\n\nvar Plan = global.get(\"plan\"+line)|0;\nvar Aktual = global.get('aktual'+line)|0;\n\n\n// Reset cisel\nif (temp ==\"reset\"){\n    msg.payload = 0;\n    Plan=0;\n    global.set(\"plan\"+line,0);\n    Aktual=0;\n}\n// priratanie do aktual\nif (temp ==\"1+\"){\n    Aktual++;\n}\nglobal.set(\"aktual\"+line,Aktual);// ulozenie aktual\n\nif(temp === true){\n    Plan++;\n    global.set(\"plan\"+line,Plan);\n}\nmsg.payload = Plan;\n\nvar Difer = Aktual - Plan;\n\n\n//nastavenie farby pisma\nmsg.color = (Difer>=0)?'gren':'red';\nif (msg.payload > 0){\n    msg.payload = \"+\" + Difer;\n}\n\n// zobrazenie pod nodom\nnode.status({fill:\"black\",shape:\"dot\",text:\"Plan:\"+Plan+\" Akt:\"+Aktual+\" Dif:\"+Difer });\nmsg.pla = Plan;\nmsg.akt = Aktual;\nmsg.dif = Difer;\nreturn msg;",
        "outputs": "1",
        "noerr": 0,
        "x": 780,
        "y": 760,
        "wires": [
            [
                "aa81545.2999928"
            ]
        ],
        "outputLabels": [
            "Plan"
        ]
    },
    {
        "id": "45209d31.e744ec",
        "type": "ui_switch",
        "z": "c9103793.c23e98",
        "name": "",
        "label": "",
        "group": "2992e505.8ece5a",
        "order": 2,
        "width": "2",
        "height": "1",
        "passthru": true,
        "decouple": "false",
        "topic": "",
        "style": "",
        "onvalue": "true",
        "onvalueType": "bool",
        "onicon": "fa-power-off",
        "oncolor": "green",
        "offvalue": "false",
        "offvalueType": "bool",
        "officon": "fa-power-off",
        "offcolor": "red",
        "x": 390,
        "y": 660,
        "wires": [
            [
                "c0c1613c.389aa"
            ]
        ]
    },
    {
        "id": "efaa9ecd.f0f058",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "RESET",
        "group": "2992e505.8ece5a",
        "order": 4,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "Reset",
        "color": "",
        "bgcolor": "black",
        "icon": "",
        "payload": "reset",
        "payloadType": "str",
        "topic": "",
        "x": 580,
        "y": 820,
        "wires": [
            [
                "64d957e1.1be3e8"
            ]
        ]
    },
    {
        "id": "5106f1e0.feab08",
        "type": "ui_button",
        "z": "c9103793.c23e98",
        "name": "",
        "group": "2992e505.8ece5a",
        "order": 3,
        "width": "2",
        "height": "1",
        "passthru": false,
        "label": "+1",
        "color": "",
        "bgcolor": "",
        "icon": "pets",
        "payload": "1+",
        "payloadType": "str",
        "topic": "",
        "x": 590,
        "y": 860,
        "wires": [
            [
                "64d957e1.1be3e8"
            ]
        ]
    },
    {
        "id": "aa81545.2999928",
        "type": "ui_template",
        "z": "c9103793.c23e98",
        "group": "2992e505.8ece5a",
        "name": "Zobrazenie 3",
        "order": 1,
        "width": "28",
        "height": "6",
        "format": "<!DOCTYPE html>\n\n<div  class=nazov >\n    <h3 >Linka 3</h3> \n</div>\n<table class=tabulka >  \n    <tr>\n        <th>\n            <b>Plan</b></th>\n        <th>\n            <b>Aktual</b></th>\n        <th>\n            <b>Diference</b></th>        \n    </tr>\n    <tr>\n        <td >\n            <h1 >\n            {{msg.pla}}\n            </h1>\n        </td>\n        <td>\n            <h1>\n            {{msg.akt}}\n            </h1>\n        </td>\n        <td >\n            <font color='{{msg.color}}' >\n            <h1>\n            {{msg.dif}}\n            </h1></font>\n        </td>\n    </tr>\n</table>\n\n\n\n",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "templateScope": "local",
        "x": 970,
        "y": 760,
        "wires": [
            []
        ]
    },
    {
        "id": "91973cde.630288",
        "type": "comment",
        "z": "c9103793.c23e98",
        "name": "popis",
        "info": "Doplnky pre Teploty ",
        "x": 76,
        "y": 72,
        "wires": []
    },
    {
        "id": "4b2f647a.6ff2d4",
        "type": "ui_group",
        "z": "",
        "name": "Line 1",
        "tab": "e964cb78.d0d4e8",
        "order": 2,
        "disp": false,
        "width": "30"
    },
    {
        "id": "eb365a9e.3c5ff",
        "type": "ui_group",
        "z": "",
        "name": "Line2",
        "tab": "e964cb78.d0d4e8",
        "disp": false,
        "width": "30"
    },
    {
        "id": "2992e505.8ece5a",
        "type": "ui_group",
        "z": "",
        "name": "Linka3",
        "tab": "e964cb78.d0d4e8",
        "disp": false,
        "width": "30"
    },
    {
        "id": "e964cb78.d0d4e8",
        "type": "ui_tab",
        "z": "",
        "name": "Production",
        "icon": "dashboard",
        "order": 1
    }
]