const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testMultiSelectDropdown() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();
    const BASE_URL = 'http://localhost:4200';

    try {
        // 1. Відкриваємо сторінку з мульти-селект дропдауном
        await driver.get(`${BASE_URL}/lecturers`);

        // 2. Знаходимо кнопку для відкриття дропдауну
        const dropdownButton = await driver.findElement(By.css('.dropdown-toggle'));
        await dropdownButton.click();

        // 3. Перевірка, чи меню відкрите
        const dropdownMenu = await driver.findElement(By.css('.dropdown-menu'));
        const isDropdownVisible = await dropdownMenu.isDisplayed();
        assert.strictEqual(isDropdownVisible, true, 'Дропдаун меню повинно бути відкрите');

        // 4. Отримуємо всі чекбокси (департаменти)
        const checkboxes = await driver.findElements(By.css('.dropdown-menu input[type="checkbox"]'));

        // 5. Перевірка всіх можливих комбінацій вибору чекбоксів
        for (let i = 0; i < checkboxes.length; i++) {
            // Вибір чекбокса
            await checkboxes[i].click();
            // Збираємо всі вибрані департаменти
            const selectedItems = await driver.findElements(By.css('.dropdown-menu input[type="checkbox"]:checked'));
            const selectedValues = [];
            for (let item of selectedItems) {
                const label = await item.findElement(By.xpath('..')).getText(); // Отримуємо текст вибраного елемента
                selectedValues.push(label.trim());
            }

            // Фільтруємо викладачів відповідно до вибраних департаментів
            await driver.wait(until.elementTextContains(driver.
                findElement(By.css('.lecturers-container')), selectedValues.join(', ')), 5000);

            // Перевіряємо, чи викладачі фільтруються по правильному департаменту
            const displayedLecturers = await driver.findElements(By.css('.lecturerDepartment'));
            for (let i = 0; i < displayedLecturers.length; i++) {
                let deptText = await displayedLecturers[i].getText();
                assert.ok(selectedValues.includes(deptText), `Викладач повинен бути з департаментів ${selectedValues.join(', ')}, але знайдений департамент: ${deptText}`);
            }

            console.log(`Тест для вибору ${selectedValues.join(', ')} пройшов успішно`);

            // Скидаємо вибір для наступного тесту
            await checkboxes[i].click();
        }

        console.log('Тест на мульти-селект дропдаун пройшов успішно');
    } catch (error) {
        console.error('Помилка під час тестування мульти-селект дропдаун:', error);
    } finally {
        await driver.quit();
    }
})();


