import { readFile } from "fs";

readFile('./package.json', (err: Error, buffer: Buffer)=> {
  if(err) throw err // 오류 발샐 시 처리 코드
  else {
    const content: string = buffer.toString();
    console.log(content)
  }
})