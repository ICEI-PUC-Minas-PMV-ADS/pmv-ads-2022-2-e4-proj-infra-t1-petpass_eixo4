# Plano de Testes de Usabilidade

O teste de usabilidade permite avaliar a qualidade da interface com o usuário da aplicação interativa. Por meio dele, são recolhidos dados sobre comportamento, medindo e considerando as reações dos usuários diante de diferentes layouts e funcionalidades.

A seguir, estão listados os parâmetros do Plano de Teste de Usabilidade que será adotado para a aplicação do Pet Pass.

### Modelo de teste:

- Teste de Usabilidade remoto e não moderado
  > Os participantes realizaram os estudos diretamente em seus próprios dispositivos, como: tablets, smartphones e notebooks; sem acompanhamento de moderador.

### Objetivos do teste:

- Descoberta de problemas
  > Seu objetivo é identificar e corrigir eventuais problemas existentes na plataforma e averiguar quais são os obstáculos para a fluida utilização da aplicação.
- Teste de aprendizado
  > O modelo adotado será o de teste de experimentação, por meio do qual, para realizar uma tarefa específica, uma pessoa que lida com a ferramenta pela primeira vez terá que começar do zero.

### Método da avaliação:

- Utilização de um formulário (questionário) contendo perguntas acerca dos indicadores que se deseja mensurar com os testes, baseados nas 10 Heurísticas de Jakob Nielsen. 
- Tal formulário será feito no formato de questionário, que utilizará o método SUS (System Usability Scale) de avaliação. 
- O método SUS utiliza um questionário de 10 perguntas para avaliar o grau de usabilidade da aplicação. 
- Para cada uma das perguntas, o usuário poderá responder utilizando uma escala de 1 a 5, na qual 1 significa "Discordo Completamente" e 5 significa "Concordo Completamente".

![Score Método SUS](img/Score_metodo_SUS.png)

- O cálculo do resultado dos testes pelo método SUS será feito da seguinte maneira:

  > - Para as respostas ímpares (1, 3, 5), será subtraído 1 da pontuação que o usuário respondeu.
  > 
  > - Para as respostas pares (2 e 4), será subtraída a resposta de 5. Ou seja, se o usuário respondeu 2, será contabilizado 3. Caso tenha respondido 4, será contabilizado 1.
  > 
  > - Após isto, serão somados todos os valores das 10 perguntas, multiplicando ao final por 2.5.
  > 
  > - O resultado final será um valor entre 0 e 100 pontos.
  > 
  > - A média do System Usability Score (SUS) é de 68 pontos. Caso o resultado seja menor do que este valor, significa que o produto apresenta problemas graves de usabilidade.
  > 
- Os resultados dos testes e dos questionários questionário serão devidamente registrados e comporão a documentação final do projeto.

### Indicadores de avaliação:

Os indicadores a serem avaliados durante os testes de usabilidade do sistema estão descritos abaixo:

- **Visibilidade do sistema**
  > A interface do sistema permite a visualização adequada das funcionalidades?
- **Navegabilidade**
  > O sistema é intuitivo e de fácil navegação?
- **Padronização de telas**
  > As telas do sistema são padronizadas e de fácil compreensão?
- **Eficiência e flexibilidade de uso**
  > O sistema se mostrou prático, rápido, intuitivo e de fácil utilização?
- **Estética e design**
  > A interface apresenta uma aparecncia agradável e minimalista?
- **Informatividade**
  > A aplicação apresenta informações sobre como utilizá-la?
- **Funcionamento durante os testes**
  > O sistema funcionou adequadamente durante todos os testes?
- **Acessibilidade**
  > A aplicação se mostrou acessível para pessoas com deficiência?
- **Grau de satisfação do usuário**
  > Qual sua satisfação com esta aplicação?
- **Possibilidade de indicação para terceiros**
  > Você indicaria esta aplicação para outras pessoas?

Os participantes do teste deverão avaliar os 10 indicadores descritos anteriormente de acordo com os critérios das 10 Heurísticas de Jakob Nielsen:

1- Visibilidade do Status do Sistema

> A interface da aplicação deve fornecer ao usuário o status em relação à sua posição dentro do sistema, ou seja, informar ao usuário sobre qual ambiente ele estava, em qual ele está e para quais outros ambientes ele poderá se dirigir a partir de sua localização.

2- Compatibilidade entre o sistema e o mundo real

> O sistema deve falar a mesma linguagem do usuário, ou seja, a linguagem que o usuário utiliza em seu dia-a-dia.
> O sistema deverá apresentar os ícones adequados na interface para facilitar a compreensão das informações pelo usuário.

3- Controle e liberdade para o usuário

> Quando o usuário realiza ações por engano, o sistema deve apresentar uma “saída de emergência” do estado no qual entrou para o estado de segurança em que estava, pois essa possibilidade de reverter ações remove a insegurança do usuário ao utilizar a aplicação.

4- Consistência e Padronização

> Manter consistência entre as telas da aplicação, para que não seja necessário o entendimento de diferentes padrões e formas de interação em cada tela. Ou seja, uma vez aprendido determinado caminho, este poderá ser replicável em outros contextos.

5- Prevenção de erros

> Existem dois tipos de erros que os usuários normalmente cometem: o deslize e o engano. O deslize se dá quando um usuário pretende realizar uma ação, mas acaba realizando outra por falta de atenção. Já o engano se dá quando a compreensão de alguma informação pelo usuário é equivocada, ou entendida de forma diferente da correta.
> O sistema deve prevenir que o usuário cometa tais erros. Caixas de confirmação, como as que aparecem quando você deleta um arquivo, são um exemplo de como evitar esses erros.

6- Reconhecimento em vez de memorização

> O sistema deve prover formas para que o usuário reconheceça padrões, ao invés de obrigá-lo a memorizar diversas informações, na medida em que navega pela aplicação.

7- Eficiência e flexibilidade de uso

> A interface deve ser útil tanto para usuários leigos como para usuários experientes.

8- Estética e design minimalista

> A interface deve manter apenas as informações que são realmente necessárias. As informações secundárias podem ser deixadas em segundo plano (menus, abas, etc.). Assim, a aplicação se torna mais eficiente em transmitir informação aos usuários.

9- Ajude os usuários a reconhecerem, diagnosticarem e recuperarem-se de erros

> O sistema devee mostrar para o usuário que ele cometeu um erro, onde errou e o que precisa ser feito para corrigir tal erro.
> Um exemplo disto são os avisos de formulários nos campos que não foram preenchidos corretamente.

10- Ajuda e documentação

> O sistema deverá apresentar uma área destinada a explicação e/ou resolução de eventuais dúvidas que o usuário possa ter com relação à navegação e à quais ações tomar dentro da aplicação, tornando-o mais independente do suporte.

### Definição dos participantes do teste:

| Faixa etária | Nº de particiántes | Possui pet? |
| ------------ | ------------------ | ----------- |
| 18 - 35 anos | 1                  | sim         |
| 36 - 59 anos | 1                  | sim         |
| 60 anos ou + | 1                  | sim         |
| Total:       | 3                  |             |

### Sequência de testes a serem aplicados:

- 01- Criar uma conta de usuário;
- 02- Fazer login com a conta criada;
- 03- Cadastrar um Pet;
- 04- Cadastrar vacina;
- 05- Aplicar vacina;
- 06- Acessar o perfil do pet;
- 07- Editar perfil do Pet;
- 08- Excluir perfil do Pet;
- 09- Acessar as informações das vacinas aplicadas;
- 10- Excluir vacina aplicada;
- 11- Logout (da conta);
- 12- Editar perfil do usuário;
- 13- Excluir perfil do usuário;
- 14- Visualizar noticias;

> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
