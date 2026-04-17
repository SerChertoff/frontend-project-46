import { readFileSync } from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const parseJson = (data) => JSON.parse(data)
const parseYaml = (data) => yaml.load(data)

const chooseParser = (extension) => {
  switch (extension) {
    case 'json':
      return parseJson
    case 'yml':
    case 'yaml':
      return parseYaml
    default:
      throw new Error(`Unsupported extension: ${extension}`)
  }
}

const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const extension = path.extname(filepath).slice(1).toLowerCase()
  const readData = readFileSync(absolutePath, 'utf-8')
  const parse = chooseParser(extension)
  return parse(readData)
}

export default parseFile
