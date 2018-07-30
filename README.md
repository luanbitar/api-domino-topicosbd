# API-Dominó

## Ambiente remoto

https://apidomino.herokuapp.com/api/duplas

## Ambiente local

Clone ou baixe o projeto, entre na pasta e execute o comando:
```
docker-compose up
```

Para rodar o projeto totalmente sem internet é só trocar a url do mongo, descomentando a linha 15 e comentando a linha 16 do arquivo app/app.js


## Requisições
Todas as requisições ```POST, PUT e PATCH``` devem ser realizadas utilizando ```x-www-form-urlencoded```.

As requisições ```PUT, PATCH e DELETE``` devem passar o _id do elemento na rota.

### Duplas
###### GET: https://apidomino.herokuapp.com/api/duplas
```
{
  _id: exemplo_id_3213jc,
  nome_1: "Fulano de tal",
  nome_2: "Ciclaninho"
}
```
###### POST: https://apidomino.herokuapp.com/api/dupla/_id
```
{
  nome_1: "Fulano de tal",
  nome_2: "Ciclaninho"
}
```
###### PUT: https://apidomino.herokuapp.com/api/dupla/_id 
```
{
  nome_1: "Joãozinho",
  nome_2: "Beltrano"
}
```
###### PATCH: https://apidomino.herokuapp.com/api/dupla/_id
```
{
  nome_2: "Beltrano"
}
```
###### DELETE: https://apidomino.herokuapp.com/api/dupla/_id
```
{}
```
### Partidas
###### GET: https://apidomino.herokuapp.com/api/partidas
```
{
  _id: exemplo_id_3213jc,
  dupla_1: "dupla__id_exemplo_321321cd", // _id da dupla
  dupla_2: "dupla__id_exemplo_321321cd",
  pontos_1: "30",
  pontos_2: "25",
  tempo: "12" // número inteiro representando minutos
}
```
###### POST: https://apidomino.herokuapp.com/api/partida/_id
```
{
  dupla_1: "dupla__id_exemplo_321321cd", // _id da dupla
  dupla_2: "dupla__id_exemplo_321321cd",
  pontos_1: "60",
  pontos_2: "75",
  tempo: "12" // número inteiro representando minutos
}
```
###### PUT: https://apidomino.herokuapp.com/api/partida/_id
```
{
  dupla_1: "dupla__id_exemplo_321321cd", // _id da dupla
  dupla_2: "dupla__id_exemplo_321321cd",
  pontos_1: "50",
  pontos_2: "25",
  tempo: "12" // número inteiro representando minutos
}
```
###### PATCH: https://apidomino.herokuapp.com/api/partida/_id
```
{
  pontos_2: "120",
}
```
###### DELETE: https://apidomino.herokuapp.com/api/partida/_id
```
{}
```
### Jogos
###### GET: https://apidomino.herokuapp.com/api/jogos
```
{
  _id: exemplo_id_3213jc,
  dupla_vencedora: "dupla__id_exemplo_321321cd", // _id da dupla
  partida: "partida__id_exemplo_321321cd", // id da partida
  pontuacao: "230", // pontuacao total da dupla vencedora
  tempo: "12" // número inteiro representando minutos
}
```
###### POST: https://apidomino.herokuapp.com/api/jogo/_id
```
{
  _id: exemplo_id_3213jc,
  dupla_vencedora: "dupla__id_exemplo_321321cd", // _id da dupla
  partida: "partida__id_exemplo_321321cd", // id da partida
  pontuacao: "230", // pontuacao total da dupla vencedora
  tempo: "12" // número inteiro representando minutos
}
```
###### PUT: https://apidomino.herokuapp.com/api/jogo/_id
```
{
  dupla_1: "dupla__id_exemplo_321321cd", // _id da dupla
  dupla_2: "dupla__id_exemplo_321321cd",
  pontos_1: "230",
  pontos_2: "120",
  tempo: "12" // número inteiro representando minutos
}
```
###### PATCH: https://apidomino.herokuapp.com/api/jogo/_id
```
{
  pontos_2: "3287183",
}
```
###### DELETE: https://apidomino.herokuapp.com/api/jogo/_id
```
{}
```