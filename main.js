const csrf = document.getElementById('csrf_token')?.innerText || '';
const userId = document.getElementById('userId')?.innerText || '';
const userType = document.getElementById('userType')?.innerText || '';


const myHeaders = new Headers();

myHeaders.append("Origin", "https://board.purinaagrobot.ru");
myHeaders.append("Referer", "https://board.purinaagrobot.ru/buyer/game/");
myHeaders.append("x-csrftoken", `${csrf}`);
myHeaders.append("Cookie", `${document.cookie}`);
myHeaders.append("Content-Type", "text/plain");

for (var level_i = 1; level_i < 50; level_i++) {
    const raw = `{\"userId\":\"${userId}\",\"userType\":\"${userType}\",\"level\":${level_i}}`;

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    fetch("https://board.purinaagrobot.ru/game/ready/", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}
