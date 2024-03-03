# ENV 
需要在 ubuntu 环境下执行下面目录才能运行 server
```shell
sudo apt-get install libdlib-dev libblas-dev liblapack-dev libjpeg-turbo8-dev
```
- goface 库允许需要在 ubuntu 运行，且需要安装，
```
sudo apt-get install libdlib-dev libblas-dev libatlas-base-dev liblapack-dev libjpeg-turbo8-dev
```

- 详情请看
https://uxtynntzvhi.feishu.cn/docx/OdkSd3dOvosM50xKcisctBiEndg

# TODO
- preload 可以与 create 一起使用吗？
- 获取用户的时候不要返回密码信息
- 密码加密
- 添加分页查询
- 目前 log 直接使用 zap.S()，但是不去作用
- faces 的名称是否可以相同？且 faces 对应的 userid 无法联系
  - 如果相同在 checkRole 中会返回多个 user，如果 faces 可以与 userid 对应就没有问题
  - 目前先设 name 不能重复
