import { INotice } from "@/type";
import { Random } from "mockjs";

export const TestNotices: INotice[] = []

for (let i = 1; i <= 20; i++) {
  TestNotices.push({
    id: i,
    message: Random.csentence(),
    ctime: new Date().getTime(),
    mtime: new Date().getTime()
  })
}