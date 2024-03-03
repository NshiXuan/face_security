curl -H "Content-Type: application/json" -d '{"name":"admin","password":"123456","gender":1,"phone":"18888888888","address":"01单元","role_id":1}' http://localhost:8088/api/v1/user | json

curl http://localhost:8088/api/v1/users | json

curl http://localhost:8088/api/v1/user?name="codersx" | json

curl http://localhost:8088/api/v1/user/11 | json

curl -X PUT -H "Content-Type: application/json" -d '{"name":"codersx","password":"123456","gender":1,"phone":"19370795256","address":"01单元","role_id":1}' http://localhost:8088/api/v1/user/11 | json

curl -X DELETE http://localhost:8088/api/v1/user/8 | json