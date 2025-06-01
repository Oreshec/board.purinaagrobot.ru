// Получаем данные из DOM
const csrf = document.getElementById('csrf_token')?.innerText;
const userId = document.getElementById('userId')?.innerText;
const userType = document.getElementById('userType')?.innerText;
const cookie = document.cookie;

// Проверяем, получены ли основные данные
if (!csrf || !userId || !userType) {
    alert("Ошибка: Не найдены необходимые данные (csrf, userId, userType).");
    console.error("Отсутствуют критические данные для выполнения запросов.");
    throw new Error("Не хватает данных для выполнения запросов");
}

// Запрашиваем у пользователя подтверждение
const isConfirmed = confirm("Вы действительно хотите начать выполнение скрипта? Это отправит несколько запросов.");
if (!isConfirmed) {
    alert("Выполнение скрипта отменено.");
    console.log("Пользователь отменил выполнение скрипта.");
    throw new Error("Выполнение отменено пользователем");
}

// Уведомляем о начале
alert("Начинаю получать информацию об уровнях...");
console.log("Скрипт запущен. Получаю данные об уровнях.");

// Настройки заголовков
const myHeaders = new Headers();
myHeaders.append("Origin", "https://board.purinaagrobot.ru"); 
myHeaders.append("Referer", "https://board.purinaagrobot.ru/buyer/game/"); 
myHeaders.append("x-csrftoken", csrf);
myHeaders.append("Cookie", cookie);

// Функция задержки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Функция создания параметров запроса
function createRequestOptions(body) {
    return {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
    };
}

// Асинхронная функция получения данных об уровнях
(async () => {
    try {
        // Получаем информацию об уровнях
        const levelResponse = await fetch(
            "https://board.purinaagrobot.ru/game/level/", 
            createRequestOptions({ userId, userType })
        );

        if (!levelResponse.ok) {
            throw new Error(`HTTP error! status: ${levelResponse.status}`);
        }

        const levelData = await levelResponse.json();

        const completedLevel = levelData.completedLevel;
        const lastLevel = levelData.lastLevel;

        if (typeof completedLevel !== 'number' || typeof lastLevel !== 'number') {
            throw new Error("Неверные данные об уровнях");
        }

        alert(`Получены уровни:\nПройдено: ${completedLevel}\nВсего: ${lastLevel}`);
        console.log("Получены уровни:", levelData);

        for (let level = completedLevel + 1; level <= lastLevel; level++) {
            const requestOptions = createRequestOptions({
                userId,
                userType,
                level
            });

            try {
                const response = await fetch("https://board.purinaagrobot.ru/game/ready/",  requestOptions);
                const result = await response.text();
                console.log(`Level ${level}:`, result);
            } catch (error) {
                console.error(`Ошибка на уровне ${level}:`, error);
            }

            await delay(2000);
        }

        alert("Скрипт успешно выполнил все запросы!");
        console.log("Скрипт успешно выполнил все запросы!");

    } catch (error) {
        console.error("Ошибка при получении информации об уровнях:", error);
        alert("Произошла ошибка при получении данных об уровнях.");
    }
})();