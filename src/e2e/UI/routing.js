const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testRouting() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    const BASE_URL = 'http://localhost:4200';

    try {

        await driver.get('http://localhost:4200'); 
        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, `${BASE_URL}/`, 'URL повинен бути /');
        console.log('Перший перехід успішний: ', currentUrl);

        const homeLink = await driver.findElement(By.xpath("//a[text()='Головна']"));
        await homeLink.click();
        await driver.wait(until.urlIs(`${BASE_URL}/home`), 5000); 
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:4200/home', 'URL повинен бути /home');
        console.log('Другий перехід успішний: ', currentUrl);
        await driver.sleep(1000);

        const lecturersLink = await driver.findElement(By.xpath("//a[text()='Викладачі']")); 
        await lecturersLink.click();
        await driver.wait(until.urlIs(`${BASE_URL}/lecturers`), 5000); 
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:4200/lecturers', 'URL повинен бути /lecturers');
        console.log('Третій перехід успішний: ', currentUrl);
        await driver.sleep(1000);

        const porfileLink = await driver.findElement(By.xpath("//a[text()='Профіль']")); 
        await porfileLink.click();
        await driver.wait(until.urlIs(`${BASE_URL}/profile`), 5000); 
        currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:4200/profile', 'URL повинен бути /profile');
        console.log('Третій перехід успішний: ', currentUrl);
        await driver.sleep(1000);

    } catch (error) {
        console.error('Помилка під час тестування маршрутів:', error);
    } finally {
        await driver.quit(); 
    }
})();
