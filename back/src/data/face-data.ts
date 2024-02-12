import { IFace } from "@/type";
import { Random } from "mockjs";

export const TestFaces: IFace[] = []

for (let i = 1; i <= 20; i++) {
  // console.log("🚀 ~ Random.id():", Random.id())
  TestFaces.push({
    id: i,
    name: Random.cname(),
    image_url: Random.image(),
    remake: Random.csentence(),
    ctime: new Date().getTime(),
    mtime: new Date().getTime()
  })
}