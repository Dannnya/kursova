const { Builder, By, Key, until } = require('selenium-webdriver');

const BASE_URL = 'http://localhost:4200/';

async function checkHomepage() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        await driver.get(BASE_URL);
        await driver.sleep(5000);
        await driver.wait(until.titleIs('Kursova'), 3000);
    } catch (error) {
        console.log('Error:', error);
    }
    finally {
        await driver.quit();
        console.log('Test was successful');
    }
}

checkHomepage()