// Получаем данные из DOM
const csrf = document.getElementById('csrf_token')?.innerText || '';
const userId = document.getElementById('userId')?.innerText || '';
const userType = document.getElementById('userType')?.innerText || '';
const cookie = document.cookie || '';

// Проверяем, получены ли основные данные
if (!csrf || !userId || !userType) {
    alert("Ошибка: Не найдены необходимые данные (csrf, userId, userType).");
    console.error("Отсутствуют критические данные для выполнения запроса.");
    throw new Error("Не хватает данных для выполнения запросов");
}

// Запрос подтверждения от пользователя
const isConfirmed = confirm("Вы действительно хотите начать выполнение скрипта? Это отправит 49 запросов с задержкой в 2 секунды.");

if (!isConfirmed) {
    alert("Выполнение скрипта отменено.");
    console.log("Пользователь отменил выполнение скрипта.");
    throw new Error("Выполнение отменено пользователем");
}

// Уведомляем о начале
alert("Начинаю выполнение скрипта...");
console.log("Скрипт запущен. Начало выполнения.");

// Настройки заголовков
const myHeaders = new Headers();
myHeaders.append("Origin", "https://board.purinaagrobot.ru");   
myHeaders.append("Referer", "https://board.purinaagrobot.ru/buyer/game/");   
myHeaders.append("x-csrftoken", csrf);
myHeaders.append("Cookie", cookie);
myHeaders.append("Content-Type", "text/plain");

// Функция задержки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Основной асинхронный цикл
(async () => {
    for (let level_i = 1; level_i < 50; level_i++) {
        const raw = JSON.stringify({
            userId,
            userType,
            level: level_i
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://board.purinaagrobot.ru/game/ready/",  requestOptions);
            const result = await response.text();
            console.log(`Level ${level_i}:`, result);
        } catch (error) {
            console.error(`Ошибка на уровне ${level_i}:`, error);
        }

        // Задержка перед следующей итерацией
        await delay(2000); // 2 секунды
    }

    // Уведомление о завершении
    alert("Скрипт успешно выполнил все запросы!");
    console.log("Скрипт успешно выполнил все запросы!");
})();