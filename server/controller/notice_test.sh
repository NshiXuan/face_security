curl http://localhost:8088/api/v1/notices | json

curl http://localhost:8088/api/v1/notice?start=1709359981658&end=1709532783658 | json

curl -H "Content-Type: application/json" -d '{"message":"测试"}' http://localhost:8088/api/v1/notice | json

curl -X DELETE http://localhost:8088/api/v1/notice/21 | json