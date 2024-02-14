curl -H "Content-Type: application/json" -d '{"name":"安保"}' http://localhost:8088/api/v1/role | json

curl http://localhost:8088/api/v1/roles | json

curl -X PUT -H "Content-Type: application/json" -d '{"name":"安保ddd","desc":"小区保安人员dd"}' http://localhost:8088/api/v1/role/4 | json

curl -X DELETE http://localhost:8088/api/v1/role/5 | json