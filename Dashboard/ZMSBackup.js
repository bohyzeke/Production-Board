[
    {
        "id": "fed46afe.93ba5",
        "type": "tab",
        "label": "ZMSBackup",
        "disabled": false,
        "info": ""
    },
    {
        "id": "1b456668.fba5fa",
        "type": "inject",
        "z": "fed46afe.93ba5",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 160,
        "y": 120,
        "wires": [
            [
                "6cc562ed.76ac34"
            ]
        ]
    },
    {
        "id": "6cc562ed.76ac34",
        "type": "function",
        "z": "fed46afe.93ba5",
        "name": "Prepare",
        "func": "\nvar pocet = 9; // pocet casov - riadkov\n\nvar GTimes = \"\"; // zakladna definicia retazca pre globallist\nfor (i=1 ; i<(pocet+1);i++){\n    GTimes = GTimes + \"shour\"+i+\";\";\n    GTimes = GTimes + \"smin\"+i+\";\";\n    GTimes = GTimes + \"ehour\"+i+\";\";\n    GTimes = GTimes + \"emin\"+i+\";\";\n} \n\nvar globallist = GTimes+\"Kusy1;Kusy2;Kusy3\";\nvar mylist = globallist.split(\";\");\n\n\nvar outputs = [];\n\nfor (i=0;i<mylist.length;i++){\n    outputs.push({\n        key : mylist[i],type: typeof global.get(mylist[i]),value: global.get(mylist[i])});\n}\n\nmsg.payload = outputs;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 360,
        "y": 120,
        "wires": [
            [
                "1d91d36d.47b65d"
            ]
        ]
    },
    {
        "id": "1d91d36d.47b65d",
        "type": "json",
        "z": "fed46afe.93ba5",
        "name": "",
        "pretty": false,
        "x": 590,
        "y": 120,
        "wires": [
            [
                "d3a82f4a.3b5cf",
                "3af5ea82.56e5de"
            ]
        ]
    },
    {
        "id": "d2caf7b1.0513b",
        "type": "comment",
        "z": "fed46afe.93ba5",
        "name": "Store data",
        "info": "",
        "x": 100,
        "y": 60,
        "wires": []
    },
    {
        "id": "43bf7fe7.623628",
        "type": "comment",
        "z": "fed46afe.93ba5",
        "name": "Restore Data",
        "info": "",
        "x": 110,
        "y": 260,
        "wires": []
    },
    {
        "id": "9a6a22d9.b81918",
        "type": "inject",
        "z": "fed46afe.93ba5",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": true,
        "x": 150,
        "y": 320,
        "wires": [
            [
                "f8f6b31a.cff4b8"
            ]
        ]
    },
    {
        "id": "4a561f17.37b1f8",
        "type": "function",
        "z": "fed46afe.93ba5",
        "name": "restore",
        "func": "var output = [];\nfor (var i=0; i<msg.payload.length; i++){\n    switch (msg.payload[i].type) {\n        case 'undefined':\n            output.push(msg.payload[i].key + \" is undefined\");\n            break;\n        case 'number':\n            if (msg.payload[i].value === \"NaN\"){\n                output.push(msg.payload[i]+ \" is NaN.\");\n            } else {\n                if (msg.payload[i].value.toString().indexOf(\".\")>-1){\n                    global.set(msg.payload[i].key,parseFloat(msg.payload[i].value));\n                    output.push(msg.payload[i].key + \" is restored to \" + msg.payload[i].value );\n                } else {\n                    global.set(msg.payload[i].key,parseInt(msg.payload[i].value));\n                    output.push(msg.payload[i].key + \" is restored to \" + msg.payload[i].value );\n                }\n            }\n            break;\n        case 'string':\n            global.set(msg.payload[i].key , msg.payload[i].value);\n            output.push(msg.payload[i].key + \" is restored to \" + msg.payload[i].value );\n            break;\n        case 'boolean':\n            global.set(msg.payload[i].key,msg.payload[i].value === \"true\");\n            output.push(msg.payload[i].key + \" is restored to \" + msg.payload[i].value );\n            break;\n    }\n}\n\nmsg.payload = output;\nreturn msg;\n\n\n\n",
        "outputs": 1,
        "noerr": 0,
        "x": 800,
        "y": 320,
        "wires": [
            [
                "1aa5d18d.018a06",
                "2ddabf78.b406b8"
            ]
        ]
    },
    {
        "id": "f8f6b31a.cff4b8",
        "type": "file in",
        "z": "fed46afe.93ba5",
        "name": "",
        "filename": "/home/pi/global.json",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "x": 380,
        "y": 320,
        "wires": [
            [
                "2fe00411.d3ff7c"
            ]
        ]
    },
    {
        "id": "2fe00411.d3ff7c",
        "type": "json",
        "z": "fed46afe.93ba5",
        "name": "",
        "pretty": false,
        "x": 590,
        "y": 320,
        "wires": [
            [
                "4a561f17.37b1f8"
            ]
        ]
    },
    {
        "id": "d3a82f4a.3b5cf",
        "type": "file",
        "z": "fed46afe.93ba5",
        "name": "",
        "filename": "/home/pi/global.json",
        "appendNewline": false,
        "createDir": true,
        "overwriteFile": "true",
        "x": 840,
        "y": 120,
        "wires": []
    },
    {
        "id": "495a81d1.42661",
        "type": "link in",
        "z": "fed46afe.93ba5",
        "name": "",
        "links": [
            "96cb944b.010808"
        ],
        "x": 215,
        "y": 180,
        "wires": [
            [
                "6cc562ed.76ac34"
            ]
        ]
    },
    {
        "id": "43c195c6.4ddbf4",
        "type": "link in",
        "z": "fed46afe.93ba5",
        "name": "Load",
        "links": [
            "4ce14dae.8e68ec"
        ],
        "x": 215,
        "y": 380,
        "wires": [
            [
                "f8f6b31a.cff4b8"
            ]
        ]
    },
    {
        "id": "1aa5d18d.018a06",
        "type": "link out",
        "z": "fed46afe.93ba5",
        "name": "Load",
        "links": [
            "3a020a33.5a6f16",
            "5c78a9e8.1ff6d8",
            "fddd2bce.f99f08",
            "15ddd957.2c493f",
            "972c700c.4bfb7",
            "f83b2b36.e28ad8",
            "ac433cbe.7360f",
            "d5cef154.e177f8",
            "81a0278a.20de5",
            "b82e4232.c6a728",
            "dec50a66.ca03c"
        ],
        "x": 935,
        "y": 320,
        "wires": []
    },
    {
        "id": "39f02918.4ded0e",
        "type": "function",
        "z": "fed46afe.93ba5",
        "name": "Prepare",
        "func": "\nvar pocet = 9; // pocet casov - riadkov\n\nvar GTimes = \"\"; // zakladna definicia retazca pre globallist\nfor (i=1 ; i<(pocet+1);i++){\n    GTimes = GTimes + \"shour\"+i+\";\";\n    GTimes = GTimes + \"smin\"+i+\";\";\n    GTimes = GTimes + \"ehour\"+i+\";\";\n    GTimes = GTimes + \"emin\"+i+\";\";\n} \n\nvar globallist = GTimes+\"Kusy1;Kusy2;Kusy3\";\nvar mylist = globallist.split(\";\");\n\n\nvar outputs = [];\n\nfor (i=0;i<mylist.length;i++){\n    outputs.push({\n        key : mylist[i],type: typeof global.get(mylist[i]),value: global.get(mylist[i])});\n}\n\nmsg.payload = outputs;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 340,
        "y": 580,
        "wires": [
            [
                "10bdf3a1.e70c6c"
            ]
        ]
    },
    {
        "id": "10bdf3a1.e70c6c",
        "type": "json",
        "z": "fed46afe.93ba5",
        "name": "",
        "pretty": false,
        "x": 590,
        "y": 580,
        "wires": [
            [
                "4bfea338.309044"
            ]
        ]
    },
    {
        "id": "4bfea338.309044",
        "type": "file",
        "z": "fed46afe.93ba5",
        "name": "",
        "filename": "/home/pi/default.json",
        "appendNewline": false,
        "createDir": true,
        "overwriteFile": "true",
        "x": 820,
        "y": 580,
        "wires": []
    },
    {
        "id": "97def0b.845609",
        "type": "link in",
        "z": "fed46afe.93ba5",
        "name": "",
        "links": [
            "b7076ab9.0011c8"
        ],
        "x": 215,
        "y": 580,
        "wires": [
            [
                "39f02918.4ded0e"
            ]
        ]
    },
    {
        "id": "138a4859.23ea68",
        "type": "comment",
        "z": "fed46afe.93ba5",
        "name": "Store default",
        "info": "",
        "x": 110,
        "y": 520,
        "wires": []
    },
    {
        "id": "ef66d894.9038c8",
        "type": "file in",
        "z": "fed46afe.93ba5",
        "name": "",
        "filename": "/home/pi/default.json",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "x": 380,
        "y": 440,
        "wires": [
            [
                "2fe00411.d3ff7c"
            ]
        ]
    },
    {
        "id": "dc8ba5db.907228",
        "type": "link in",
        "z": "fed46afe.93ba5",
        "name": "",
        "links": [
            "b1f1e66c.26bd4"
        ],
        "x": 215,
        "y": 440,
        "wires": [
            [
                "ef66d894.9038c8"
            ]
        ]
    },
    {
        "id": "2ddabf78.b406b8",
        "type": "debug",
        "z": "fed46afe.93ba5",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 990,
        "y": 260,
        "wires": []
    },
    {
        "id": "3af5ea82.56e5de",
        "type": "debug",
        "z": "fed46afe.93ba5",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "true",
        "x": 790,
        "y": 60,
        "wires": []
    }
]