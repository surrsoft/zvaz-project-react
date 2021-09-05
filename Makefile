
# запуск на порту 22101
start:
	yarn start

build:
	yarn build

# запуск на порту 22102
server_start:
	json-server -p 22102 --watch jsonServer/db.json
