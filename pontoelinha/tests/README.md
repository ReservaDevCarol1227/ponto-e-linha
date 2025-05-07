A pasta de "test" foi criada para armazernar:

- A subpasta "unit";
- A subpasta "integration";
- A subpasta "e2e";
- A subpasta "helpers";

COMO RODAR OS TESTES

IMPORTANTE!!! (Sem isso os testes não funcionam)

Precisa ter:
- Ter o XAMPP rodando o Apache e o MySQL

- Banco de dados já criado (arquivo disponivel em databaseatualizado.sql) e funcionando no phpMyAdmin

- Ter o Node.js baixado na máquina

- Ter o Edge instalado e o msedgedriver.exe (disponível na pasta src) salvo na pasta chamada "WebDriver" na raiz do sistema (geralmente é a C:) - Ex: C:\WebDriver\msedgedriver.exe


1 - CADASTRE O USUÁRIO E SEU PROJETO "TAPETINHO"

- Rode o sistema normalmente com o Xampp (fazendo aquele processo lá de copiar a pasta do projeto e colar na pasta "htdocs")

- Vá para a página de cadasro e cadastre um usuário com as seguintes informações:

Nome: Ciclano
Email: ciclano@email.com
Senha: 12345

- Vá para a calculadora e crie um novo projeto com as seguintes informações

Agulha utilizada: 3.0
Ponto Baixo: 100

- Deixe o resto em branco e clique em "calcular" e depois em "salvar projeto"

- Digite "Tapetinho" no nome e salve o projeto

2 - INSTALE AS DEPENDENCIAS

- Digite no terminal: npm install

- Rode os testes digitando no terminal: npm test (esse comando rodará todos os testes, para rodar pastas específicas, consulte o README da pasta que você quer rodar)