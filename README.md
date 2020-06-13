# Action Items Frontend 
built with React via Create react app

## Getting started
1. Make sure you have an up to date version of [node.js][node_source] installed on your workstation

2. Move into the directory where you wish to create your new project 
3. Run the either of the following commands (depending on your package manager) replacing "app_name" with whatever you desire to name the folder containing your new project

```sh
npx create-react-app app_name

npm init react-app my-app

yarn create react-app my-app
```

4. Move into your newly created directory with the following command

```sh
cd app_name
```
5. finally you can start your project in development mode with either of the following commands. Then open the server http://localhost:3000/ to see your app.

```sh
npm start

yarn start
```

## Inegrating Bootstrap

In your project directory run the following command to install [bootstrap][bootstrap_source]. 

```sh
npm install react-bootstrap bootstrap

yarn install react-bootstrap bootstrap
```

## Using Icons

To use [icons][icons_source] in react as components run the following command

```sh
 npm install @material-ui/icons

 yarn add @material-ui/icons
```

# Project todo list 
* Keep README up to date
* ~~make "edit" button~~ 
* make "delete button
* hit enter to create new task





[node_source]: https://nodejs.org/en/download/
[bootstrap_source]: https://react-bootstrap.github.io/getting-started/introduction
[icons_source]: https://material-ui.com/components/icons/

curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/users/token/obtain/ --data '{"username":"hoa","password":"pass"}'


$ curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/users/token/refresh/ --data '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5MjExMDAxMCwianRpIjoiNTgxNmU5MzE3NTcwNGFkNTg3ZWQ3NjkzOGFkODIxN2MiLCJ1c2VyX2lkIjoxfQ.F3_cYZb65DHz6Bt7uG8-dY5eozFy9RU5KtvSBoInyK8"}'

curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/users/token/create/ --data '{"username":"u1","password":"konnichiwa"}'

curl --header "Content-Type: application/json" --header "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkyMDI4Nzk1LCJqdGkiOiIwODEwMTEyNWRiMTc0MzU1OTFlZDY0N2I3ODNiYmUyZSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiaG9hIn0.wH3VB4VLLSowMlt04w8oKihoUea0QhmHEu_dpj8PB_s" -X GET http://127.0.0.1:8000/api/tasks/

curl --header "Content-Type: application/json" --header "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkyMDI4Nzk1LCJqdGkiOiIwODEwMTEyNWRiMTc0MzU1OTFlZDY0N2I3ODNiYmUyZSIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiaG9hIn0.wH3VB4VLLSowMlt04w8oKihoUea0QhmHEu_dpj8PB_s" -X POST http://127.0.0.1:8000/api/tasks/ --data '{"title":"r_t1","due_date":"r_dd1","duration":"r_d1","interest":"5"}'

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTkyMDI4NTk3LCJqdGkiOiJjMDBhNjNlOGY4NzY0ZTU3OTU0ZTNiZTRiMDg2NjUyNCIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoiaG9hIn0.r6EsYoWXxjRiITjMXzNOad_n9ZGjZ02UeY8ZxxUX4CE
