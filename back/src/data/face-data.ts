import { IFace } from "@/type";
import { time } from "console";

export const faces: IFace[] = []

for (let i = 1; i <= 20; i++) {
  faces.push({
    id: i,
    name: 'name' + i,
    image: './images/' + i,
    remake: '',
    ctime: new Date().getTime(),
    mtime: new Date().getTime()
  })
}