
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

A metodologia contempla a definição das ferramentas que serão utilizadas pela equipe, tanto para a gestão e manutenção dos códigos e demais artefatos, quanto para a divisão de tarefas e gerenciamento do projeto.

## Relação de Ambientes de Trabalho

Os artefatos do projeto serão desenvolvidos a partir de duas plataformas listadas abaixo: 

|Ambiente    |Plataforma          |
|------------|--------------------|
|Repositório de código fonte |[Github](https://github.com) |
|Documentos do projeto | [Github](https://github.com) |
|Projeto de Interface e  Wireframes| [Figma](https://www.figma.com) |
|Gerenciamento do Projeto | [Github](https://github.com) e [ProjectLibre](https://www.projectlibre.com/) |
|Modelagem de Processos | [BPMN.iO](https://demo.bpmn.io/) |


## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Para fazer a gestão do código fonte do software desenvolvido neste projeto, a equipe utilizará um processo baseado no Git Flow, no qual todas as manutenções no código serão realizadas em branches separados, identificados como Hotfix, Release, Develop e Feature.
Uma breve explicação sobre este processo é apresentada no vídeo [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs). A imagem a seguir exemplifica a metodologia do Git Flow.

![Git_Flow](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-1-e3-proj-mov-t1-petpass-mobile/blob/main/docs/img/Git%20Flow.png?raw=true)

## Gerenciamento de Projeto

### Divisão de Papéis

A equipe está organizada da seguinte maneira:

- **Scrum Master:**
- **Product Owner:** 
- **Equipe de Front-end:** Arthur Bernardo de Almeida Simões, Arthur Fernandes Roque Ferrarez e Luisa Helena Gonçalves Oliveira
- **Equipe de Back-end:** Adilson Antonio Ferreira Junior, Pedro Von Der Heide, Renan Gonçalves De Souza e Rodrigo Lobenwein Resende
- **Equipe Mobile:** Todo o time

### Processo

Para a organização e distribuição das tarefas do projeto, a equipe utilizará o Github, estruturado com as seguintes listas: 

- **Product Backlog:** é uma lista detalhada de tudo o que precisa ser realizado para transformar a visão do produto em realidade (MindMaster, 2021). Ou seja, recebe todas as tarefas (entregas) que serão feitas durante o projeto. Caso surja a necessidade de incorporar novas atividades ao projeto, estas devem ser adicionadas a esta lista.
- **Sprint:** são as entregas que serão feitas ao longo do projeto para compor o Product Backlog. Ao final de cada Sprint terá sido concluída uma das tarefas da lista do Product Backlog. Os Sprints serão divididos em Sprints Backlogs, que são tarefas menores dentro de cada Sprint que determinarão o progresso do projeto.
- **Kanban:** é um Scrum Board que mostra o progresso da realização das Sprints Backlogs. Este quadro é delimitado em: To Do, Doing e Done.
- `To Do`: É a lista dos Sprints Backlogs que serão trabalhados no Sprint da vez.
- `Doing (In progress)`: É a lista de tarefas que estão sendo executadas no momento pela equipe.
- `Done`: É a lista de tarefas do Sprint que já foram concluídas e estão prontos para serem entregues ao usuário.

Um exemplo do quadro Kanban montado pela equipe no Github é apresentado na imagem abaixo:
 
> **Links Úteis**:
> - [Planejamento e Gestáo Ágil de Projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Sobre quadros de projeto](https://docs.github.com/pt/github/managing-your-work-on-github/about-project-boards)
> - [Como criar Backlogs no Github](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial Slack](https://slack.com/intl/en-br/)

### Ferramentas

Relação das ferramentas empregadas no projeto e suas respectivas funções:

|Função     |Ferramentas          |
|-----------|---------------------|
|Editor de código |Github, Visual Studio Code, Visual Studio 2022, Expo | 
|Ferramentas de comunicação |Github, Microsoft Teams, Discord |
|Ferramentas de diagramação |Figma |
|Ferramentas de modelagem de processos |Astah, BPMN.iO |
|Ferramentas de gestão de projetos |Github, ProjectLibre, MS Excel |
|Ferramentas de teste | Insomnia |

O editor de código foi escolhido porque ele possui uma integração com o sistema de versão. As ferramentas de comunicação utilizadas possuem integração semelhante e por isso foram selecionadas. Por fim, para criar diagramas utilizamos essa ferramenta por melhor captar as necessidades da nossa solução.
