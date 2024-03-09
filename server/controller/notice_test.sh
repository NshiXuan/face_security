curl http://localhost:8088/api/v1/notices | json

curl "http://localhost:8088/api/v1/notice?start=1709359981&end=1709532783" | json

curl -H "Content-Type: application/json" -d '{"message":"测试"}' http://localhost:8088/api/v1/notice | json

curl -X DELETE http://localhost:8088/api/v1/notice/21 | json

curl -X DELETE "http://localhost:8088/api/v1/notices?ids=8,9,10" | json