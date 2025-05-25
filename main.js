for (let i = 1; i < 44; i++) {
    fetch("https://board.purinaagrobot.ru/game/ready/", {
        "headers": {
            "accept": "*/*",
            "accept-language": "ru",
            "cache-control": "no-cache",
            "content-type": "text/plain;charset=UTF-8",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"136\", \"Microsoft Edge\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrftoken": "Ваш токен",
            "cookie": "Ваши печеньки",
            "Referer": "https://board.purinaagrobot.ru/buyer/game/",
            "Referrer-Policy": "same-origin"
        },
        "body": `{\"userId\":\"Ваш userId\",\"userType\":\"buyer\",\"level\":${i}}`,
        "method": "POST"
    });
}
