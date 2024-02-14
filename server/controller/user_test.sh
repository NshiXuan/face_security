curl -H "Content-Type: application/json" -d '{"name":"codersx","password":"123123","gender":1,"phone":"12370795256","address":"01单元","role_id":1}' http://localhost:8088/api/v1/user | json

curl http://localhost:8088/api/v1/user?name="codersx" | json