const { Builder, By, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/edge'); // Для Microsoft Edge

(async function azureEntraIdLoginTest() {
  let options = new Options();
  options.addArguments('-inprivate');

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options) 
    .build();

  try {
    await driver.get('http://localhost:4200/');

    // Клікаємо на кнопку входу
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(), 'Login using Redirect')]")), 10000);
    let loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Login using Redirect')]"));
    await loginButton.click();

    // Вводимо email
    await driver.wait(until.elementLocated(By.id("i0116")), 10000);
    let emailField = await driver.findElement(By.id("i0116"));
    await emailField.sendKeys("daniil.komarovskyi@lnu.edu.ua");
    await driver.findElement(By.id("idSIButton9")).click();

    // Вводимо пароль
    await driver.wait(until.elementLocated(By.id("i0118")), 10000);
    let passwordField = await driver.findElement(By.id("i0118"));
    await passwordField.sendKeys("pK1i7HPY");
    await driver.findElement(By.id("idSIButton9")).click();

    // Натискаємо "Принять" на вікні дозволів
    await driver.wait(until.elementLocated(By.xpath("//input[contains(text(), 'Войти')]")), 30000);
    let acceptButton = await driver.findElement(By.xpath("//input[contains(text(), 'Войти')]"));
    await acceptButton.click();

    // Перевіряємо успішний вхід
    await driver.wait(until.elementLocated(By.linkText("Головна")), 10000);
    let homeLink = await driver.findElement(By.linkText("Головна"));
    if (await homeLink.isDisplayed()) {
      console.log("Login successful!");
    }

    // Клікаємо на кнопку з класом "win-button"
    await driver.wait(until.elementLocated(By.css('.win-button')), 10000);
    let winButton = await driver.findElement(By.css('.win-button'));
    await winButton.click();

    // Вставити додаткові перевірки або дії після натискання кнопки

  } finally {
    await driver.quit();
  }
})();
