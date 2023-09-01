import { readFilePromise } from './readFilePromise';

const readFileAll = async (filenames: string[]) => {
  return await Promise.all(
    filenames.map(filename => readFilePromise(filename))
  )
}

readFileAll(['./package.json','./tsconfig.json'])
  .then(([packageJson, tsconfigJson]: string[]) =>{
    console.log('<package.json>', packageJson)
    console.log('<tsconfig.json>', tsconfigJson)
  })
  .catch(err => console.log('error:', err.message))