const { Builder, By, until, Key } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const log = require('../helpers/logger');

jest.setTimeout(25000);

describe('CT-003 - Editar nome do projeto', () => {
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
    await driver.wait(until.elementLocated(By.name('email')), 7000);
  });

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  it('deve logar, acessar perfil e editar nome do projeto via campo dinâmico', async () => {
    log.step('Fazendo login...');
    await driver.findElement(By.name('email')).sendKeys('ciclano@email.com');
    await driver.findElement(By.name('senha')).sendKeys('12345');
    await driver.findElement(By.css('form#login-form button[type="submit"]')).click();

    await driver.wait(until.alertIsPresent(), 7000);
    const alertaLogin = await driver.switchTo().alert();
    log.success(`Alerta de login: "${await alertaLogin.getText()}"`);
    await alertaLogin.accept();

    const url = await driver.getCurrentUrl();
    log.step(`URL atual após login: ${url}`);

    log.step('Acessando página de perfil via botão "Perfil"...');
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Perfil')]")), 7000);
    await driver.findElement(By.xpath("//button[contains(text(),'Perfil')]")).click();

    log.step('Aguardando texto "Meus projetos:" aparecer...');
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Meus projetos:')]")), 10000);

    log.step('Aguardando botão do projeto "Tapete"...');
    await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Tapete')]")), 10000);
    const botaoProjeto = await driver.findElement(By.xpath("//button[contains(.,'Tapete')]"));
    await botaoProjeto.click();

    log.step('Aguardando botão "Editar nome do projeto"...');
    await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Editar nome do projeto')]")), 7000);
    await driver.findElement(By.xpath("//button[contains(text(),'Editar nome do projeto')]")).click();

    log.step('Aguardando campo de nome editável...');
    const campoNome = await driver.wait(
      until.elementLocated(By.xpath("//input[starts-with(@id,'editar-nome-')]")),
      7000
    );
    await campoNome.click();
    await campoNome.sendKeys(Key.CONTROL, 'a');
    await campoNome.sendKeys(Key.BACK_SPACE);

    const novoNome = "Tapetinho";
    await campoNome.sendKeys(novoNome);

    log.step('Clicando em "Salvar Alterações"...');
    await driver.findElement(By.xpath("//button[contains(text(),'Salvar Alterações')]")).click();

    log.step('Aceitando alerta de sucesso...');
    await driver.wait(until.alertIsPresent(), 7000);
    const alerta = await driver.switchTo().alert();
    log.success(`Alerta recebido: "${await alerta.getText()}"`);
    await alerta.accept();

    log.step('Verificando novo nome na tela...');
    await driver.wait(until.elementLocated(By.xpath(`//button[contains(.,'${novoNome}')]`)), 10000);
    const nomeNaTela = await driver.findElement(By.xpath(`//button[contains(.,'${novoNome}')]`)).getText();
    log.success(`Nome atualizado visível: ${nomeNaTela}`);
    expect(nomeNaTela).toContain(novoNome);
  });
});
