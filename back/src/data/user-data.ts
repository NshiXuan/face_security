import { Random } from 'mockjs'
import { IUser } from '@/type'

export const TestUserList: IUser[] = []

for (let i = 1; i <= 30; i++) {
  TestUserList.push({
    id: i,
    name: Random.cname(),
    password: '123456',
    // email: Random.email(),
    gender: 1,
    phone: '12312312311',
    address: '01单元211',
    // role: Math.floor(Math.random() * 3 + 1),
    ctime: new Date().getTime(),
    mtime: new Date().getTime()
  })
}
