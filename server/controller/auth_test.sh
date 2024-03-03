curl -d '{"phone":"18888888889","password":"123456"}' http://localhost:8088/api/v1/auth/login | json

curl -d '{"token":""}' http://localhost:8088/api/v1/auth/check | json