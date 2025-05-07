const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const log = require('../helpers/logger');

jest.setTimeout(20000);

describe('CT-002 (E2E) - Login com redirecionamento para calculadora', () => {
  let driver;

  beforeAll(async () => {
    log.start('Iniciando driver Microsoft Edge');

    const service = new edge.ServiceBuilder('C:\\WebDriver\\msedgedriver.exe');
    const options = new edge.Options();

    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeService(service)
      .setEdgeOptions(options)
      .build();

    await driver.get('http://localhost/pontoelinha/pages/login.html');
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  it('deve logar com sucesso e ser redirecionado para calculadora.html', async () => {
    log.step('Preenchendo formulário de login...');
    await driver.findElement(By.name('email')).sendKeys('ciclano@email.com');
    await driver.findElement(By.name('senha')).sendKeys('12345');
    await driver.findElement(By.css('form#login-form button[type="submit"]')).click();

    log.step('Aguardando redirecionamento...');
    await driver.wait(until.urlContains('/pages/calculadora.html'), 5000);

    const currentUrl = await driver.getCurrentUrl();
    log.success(`Redirecionado com sucesso: ${currentUrl}`);
    expect(currentUrl).toContain('/pages/calculadora.html');
  });
});
