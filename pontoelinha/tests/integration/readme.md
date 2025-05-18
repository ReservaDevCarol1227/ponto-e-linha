A pasta de "integration" foi criada para armazernar:

- o arquivo teste_de_integracao_api.json (Caso de Teste CT-002 - Login) para ser importado/executado no Postman ou Newman;

ATENÇÃO: O TESTE SÓ VAI FUNCIONAR SE O SISTEMA ESTIVER RODANDO VIA XAMPP, COM APACHE E MYSQL LIGADOS.

COMO EXECUTAR NO POSTMAN

1 - Acesse o menu hamburger (canto superior esquerdo) e clique em "File" e depois em "Import"
2 - Selecione a opção "Upload Files"
3 - Selecione o arquivo teste_de_integracao_api.json
4 - Clique em "Import"
5 - Na barra lateral, clique em "POST teste_de_integracao_api"
6 - Clique em "Send"

COMO EXECUTAR NO NEWMAN

ATENÇÃO: O NEWMAN SÓ FUNCIONA SE A MÁQUINA TIVER O NODE INSTALADO.

1 - execute o comando "npm install -g newman" na raiz do projeto
2 - acesse a pasta tests e a subpasta integration no terminal (cd tests\integration)
3 - execute o comando "newman run teste_de_integracao_api.json"



