function getFileExtension(fileName: string): string {
  console.log(fileName)
  const parts = fileName.split('.')
  return parts.length > 1 ? parts.pop()! : ''
}

export default getFileExtension
