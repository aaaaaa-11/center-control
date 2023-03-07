export type ArrItem = {
  id: number,
  parentId: number,
  key: number,
  title: string,
  children?: ArrItem[],
  [prosName: string]: any,
}

export const arrToTree = (arr: ArrItem[]) => {
  type ObjMapType = {
    [id: number]: ArrItem
  }
  const tree:ArrItem[] = []
  const map:ObjMapType = {}
  arr.forEach(i => {
    i.title = i.name
    i.key = i.id
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
