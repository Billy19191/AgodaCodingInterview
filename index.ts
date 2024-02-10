class TreeNode {
  name: string
  type: 'file' | 'dir'
  children: TreeNode[]

  constructor(name: string, type: 'file' | 'dir') {
    this.name = name // Name of the file/dir
    this.type = type // 'file' or 'dir'
    this.children = [] // Array to store children nodes
  }

  addChild(childNode: TreeNode): void {
    this.children.push(childNode)
  }
}

class FileSystem {
  root: TreeNode
  constructor() {
    this.root = new TreeNode('root', 'dir')
  }

  createFolder(folderName: string, parentFolderName: string): void {
    const parentNode = this.findNodeByName(parentFolderName)
    if (!parentNode || parentNode.type !== 'dir') {
      console.log(`Parent folder '${parentFolderName}' not found.`)
      return
    }
    if (this.findNodeByName(folderName)) {
      console.log(
        `An item with the name '${folderName}' already exists in the file system.`
      )
      return
    }
    const newFolder = new TreeNode(folderName, 'dir')
    parentNode.addChild(newFolder)
  }

  createFile(fileName: string, parentFolderName: string): void {
    const parentNode = this.findNodeByName(parentFolderName)
    if (!parentNode || parentNode.type !== 'dir') {
      console.log(`Parent folder '${parentFolderName}' not found.`)
      return
    }
    if (this.findNodeByName(fileName)) {
      console.log(
        `An item with the name '${fileName}' already exists in the file system.`
      )
      return
    }
    const newFile = new TreeNode(fileName, 'file')
    parentNode.addChild(newFile)
  }

  moveItem(itemName: string, destinationFolderName: string): void {
    const itemNode = this.findNodeByName(itemName)
    if (!itemNode) {
      console.log(`Item '${itemName}' not found.`)
      return
    }
    const destinationNode = this.findNodeByName(destinationFolderName)
    if (!destinationNode || destinationNode.type !== 'dir') {
      console.log(`Destination folder '${destinationFolderName}' not found.`)
      return
    }
    const parent = this.findParentNode(itemName)
    if (!parent) {
      console.log(`Parent of '${itemName}' not found.`)
      return
    }
    parent.children = parent.children.filter((node) => node.name !== itemName)
    destinationNode.addChild(itemNode)
  }

  deleteItem(itemName: string): void {
    const parent = this.findParentNode(itemName)
    if (!parent) {
      console.log(`Item '${itemName}' not found.`)
      return
    }
    parent.children = parent.children.filter((node) => node.name !== itemName)
  }

  printFileSystem(): void {
    this.printNode(this.root)
  }

  printNode(node: TreeNode, depth: number = 0): void {
    const indent = ' '.repeat(depth * 4)
    console.log(indent + node.name)
    if (node.type === 'dir') {
      node.children.forEach((child) => this.printNode(child, depth + 1))
    }
  }

  findNodeByName(name: string, node: TreeNode = this.root): TreeNode | null {
    if (node.name === name) {
      return node
    }
    for (const child of node.children) {
      const result = this.findNodeByName(name, child)
      if (result) {
        return result
      }
    }
    return null
  }

  findParentNode(name: string, node: TreeNode = this.root): TreeNode | null {
    for (const child of node.children) {
      if (child.name === name) {
        return node
      }
      const parent = this.findParentNode(name, child)
      if (parent) {
        return parent
      }
    }
    return null
  }
}

// Example usage
const fileSystem = new FileSystem()
fileSystem.createFolder('dir A', 'root')
fileSystem.createFolder('dir B', 'root')
fileSystem.createFile('fileC', 'dir B')
fileSystem.createFile('fileD', 'dir A')
fileSystem.createFile('fileE', 'root')
fileSystem.createFile('fileF', 'dir B')
fileSystem.moveItem('dir B', 'dir A')
fileSystem.printFileSystem()
