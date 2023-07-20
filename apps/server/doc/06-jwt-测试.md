


```bash
$ # POST to /auth/login
curl -X POST http://localhost:3888/user/login -d '{"username": "ruome", "password": "123456"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}

curl http://localhost:3888/user/7 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6InJ1b21lIiwiaWF0IjoxNjg2NDQ2NTQyLCJleHAiOjE2ODY0NDY2MDJ9.i1vdRERJ9aroIsqNw4dwmUcUfjWxuMFSvfi4ufNuEgA"


curl http://localhost:3888/user/7 -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJ1c2VybmFtZSI6InJ1b21lIiwiaWF0IjoxNjg2NDQ5OTg4LCJleHAiOjE2ODY0NTM1ODh9.BxjqqDRXCQ77_QzteaNTvD0gNIbfX6EOqghRIT5YoqA"
```

## 实例代码：
https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt/src