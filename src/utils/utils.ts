export type ArrItemType = {
  id: number,
  parentId: number,
  [prosName: string]: any,
  children?: Array<ArrItemType>
}
export type ArrayType = Array<ArrItemType>

export const arrToTree = (arr: ArrayType) => {
  type ObjMapType = {
    [id: number]: ArrItemType
  }
  const tree:ArrayType = []
  const map:ObjMapType = {}
  arr.forEach(i => {
    map[i.id] = i
  })
  arr.map(i => {
    const parent = map[i.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(i)
    } else {
      tree.push(i)
    }
  })
  return tree
}
