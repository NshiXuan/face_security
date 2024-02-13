# ENV 
需要在 ubuntu 环境下执行下面目录才能运行 server
```shell
sudo apt-get install libdlib-dev libblas-dev liblapack-dev libjpeg-turbo8-dev
```

# TODO
- preload 可以与 create 一起使用吗？
- 密码加密
- 目前 log 直接使用 zap.S()，但是不去作用
- cookie session 实现登录