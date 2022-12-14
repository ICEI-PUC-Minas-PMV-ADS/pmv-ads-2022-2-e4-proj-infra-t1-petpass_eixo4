# Programação de Funcionalidades

## API
Foi desenvolvida a API REST em ASP.NET, banco de dasos MySQL para os modelos relacionais e MongoDB para notícias.
Documentação em OpenAPI com swagger.

![Documentacao](./img/API_Doc1.png)
![Documentacao](./img/API_Doc2.png)

**Nível de maturidade de Richardson: Nível 3** - Controles hipermídia - API navegável pelo uso de HATEOAS (Hypertext As The Engine Of Application State).

![HATEOAS](./img/API_HATEOAS.jpg)

## Refatoração

Conforme detalhado em <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>, toda a API precisou ser refatorada para o padrão de projeto Repositório.

A refatoração incluiu:
- Criação da camada (diretório) Repositório, onde foram colocadas interfaces de Repositório para cada Entidade
- Criação da camada Contracts onde foram colocadas as interfaces de Repositório para cada Entidade:
    - IPetRepository.cs
    - IRepositoryBase.cs
    - IRepositoryWrapper.cs
    - IUsuarioRepository.cs
    - IVacinarepository.cs
- Criação da camada (diretório) Repositório, onde foram colocadas as classes de Repositório para cada Entidade, implementando as interfaces de Contracts:
    - PetRepository.cs
    - RepositoryBase.cs
    - RepositoryWrapper.cs
    - UsuarioRepository.cs
    - Vacinarepository.cs
- Alteração da classe de contexto AppContext.cs para RepositoryContext.cs
- Alteração de todos os controladores para injeção do repositório no lugar do contexto.
