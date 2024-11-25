const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

(async function testLecturersPage() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {

        await driver.get('http://localhost:4200/lecturers');


        let currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:4200/lecturers');

        let title = await driver.getTitle();
        assert(title.includes("Kursova"));


        const menuButtons = await driver.findElements(By.className('header-wrapper'));
        for (let button of menuButtons) {
            await button.click();
            await driver.sleep(500); 

        }

        // // 4. Перевірка блоків з викладачами
        // const lecturers = await driver.findElements(By.css("div[style='background-color: red; width: 100px; height: 100px;']"));
        // for (let lecturer of lecturers) {
        //     let bgColor = await lecturer.getCssValue("background-color");
        //     assert.strictEqual(bgColor, 'rgba(255, 0, 0, 1)'); 

        //     let size = await lecturer.getRect();
        //     assert.strictEqual(size.width, 100);
        //     assert.strictEqual(size.height, 100);
        // }

        // 5. Функціональність кнопки "Request"
        
        const requestButtons = await driver.findElements(By.xpath("//button[contains(text(), 'Надіслати запит')]"));
        for (let button of requestButtons) {
            await button.click();

            await driver.wait(until.alertIsPresent(), 1000); 
            let alert = await driver.switchTo().alert();    
            let alertText = await alert.getText();

            // assert.strictEqual(alertText, 'cool'); 

            console.log("Alert text is:", alertText);

            await alert.accept();
        }

    } finally {
        await driver.quit();
    }
})();
