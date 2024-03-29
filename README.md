# Documentação do Projeto

#### Autores
- [Marcílio Júnior](https://github.com/jrsmarcilio) 
- [Lutchenca Medeiros](https://github.com/lutchenca) 
- [Renan Tokashiki](https://github.com/renantoka) 

## Desafio Atendimento Médico \ Prontuário
Criar um sistema para um consultório controlar o cadastro de seus clientes, atendimentos e prontuário dos pacientes.
### Backend

##### ROTAS DE USUÁRIOS

###### routes.get("/usuario", UsuarioController.index);
- Responde em JSON os atributos "id", "login", "nome" de todos os usuários

###### routes.get("/usuario/:id", UsuarioController.index);
- Recebe em Query Params o "id" do usuário logado
- Responde em JSON os atributos "id", "login", "nome" do usuário logado

###### routes.post("/usuario", UsuarioController.store);
- Recebe em JSON os atributos "login", "nome", "senha" para inserir o usuário

###### routes.put("/usuario/:id", UsuarioController.update);
- Recebe em Query Params o "id" do usuário logado
- Recebe em JSON os atributos "login" ou "senha" ou "nome" para editar o usuário

###### routes.delete("/usuario/:id", UsuarioController.destroy);
- Recebe em Query Params o "id" para remover o usuário

##### ROTAS DE ATENDIMENTO

###### routes.get("/atendimento", UsuarioController.index);
- Retorna JSON com todos os atendimentos

###### routes.get("/atendimento/:id", UsuarioController.show);
- Recebe em Query Params o "id" do usuário logado
- Responde em JSON os atributos "id", "login", "nome" do usuário logado

###### routes.post("/usuario", UsuarioController.store);
- Recebe em JSON os atributos "login", "nome", "senha" para inserir o usuário

###### routes.put("/usuario/:id", UsuarioController.update);
- Recebe em Query Params o "id" do usuário logado
- Recebe em JSON os atributos "login" ou "senha" ou "nome" para editar o usuário

###### routes.delete("/usuario/:id", UsuarioController.destroy);
- Recebe em Query Params o "id" para remover o usuário


##### Referências

Diagrama de classe: 
![](https://github.com/educacao-gama/desafios-gama/blob/main/atendimento%20medico/atendimento-medico.PNG)



# Build image Docker
```shell
  docker build . -t jrsmarcilio/backend-g4t2
```

# run image Docker
```shell
  docker run -p 80:3000 --name backend-g4t2 -d jrsmarcilio/backend-g4t2
```
