interface TreeItem {
  id: number
  parentId: number
  key: number
  title: string
  children?: TreeItem[]
  [prosName: string]: any
}

export const arrToTree = <T extends TreeItem>(arr: T[]) => {
  type ObjMapType = {
    [id: number]: TreeItem
  }
  const tree: TreeItem[] = []
  const map: ObjMapType = {}
  arr.forEach((i) => {
    map[i.id] = i
  })
  arr.map((i) => {
    const parent = map[i.parentId]
    if (parent) {
      ;(parent.children || (parent.children = [])).push(i)
    } else {
      tree.push(i)
    }
  })
  return tree
}
