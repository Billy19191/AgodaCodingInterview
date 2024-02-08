class TreeNode {
  constructor(name, type) {
    this.name = name // Name of the file/dir
    this.type = type // 'file' or 'dir'
    this.children = [] // Array to store children nodes
  }

  addChild(childNode) {
    this.children.push(childNode)
  }
}

class FileSystem {
  constructor() {
    this.root = new TreeNode('root', 'dir')
  }

  createFolder(folderName, parentFolderName) {
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

  createFile(fileName, parentFolderName) {
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

  moveItem(itemName, destinationFolderName) {
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
    parent.children = parent.children.filter((node) => node.name !== itemName)
    destinationNode.addChild(itemNode)
  }

  deleteItem(itemName) {
    const parent = this.findParentNode(itemName)
    if (!parent) {
      console.log(`Item '${itemName}' not found.`)
      return
    }
    parent.children = parent.children.filter((node) => node.name !== itemName)
  }

  printFileSystem() {
    this.printNode(this.root)
  }

  printNode(node, depth = 0) {
    const indent = ' '.repeat(depth * 4)
    console.log(indent + node.name)
    if (node.type === 'dir') {
      node.children.forEach((child) => this.printNode(child, depth + 1))
    }
  }

  findNodeByName(name, node = this.root) {
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

  findParentNode(name, node = this.root) {
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
// Example usage
const fileSystem = new FileSystem()
// fileSystem.createFolder('dir A', 'root')
// fileSystem.createFolder('dir A', 'root')
// fileSystem.createFolder('dir B', 'root')
// fileSystem.createFile('fileC', 'dir B')
// fileSystem.createFile('fileC', 'dir A')
// fileSystem.createFolder('dir B', 'root')
// fileSystem.createFile('fileC', 'dir B')
// fileSystem.createFile('fileD', 'dir A')
// fileSystem.createFile('fileE', 'root')
// fileSystem.createFile('fileF', 'dir B')
// fileSystem.moveItem('dir B', 'dir A')
fileSystem.createFolder('dir A', 'root')
fileSystem.createFolder('dir B', 'root')
fileSystem.createFile('fileC', 'dir B')
fileSystem.createFile('fileD', 'dir A')
fileSystem.createFile('fileE', 'root')
fileSystem.createFile('fileF', 'dir B')
fileSystem.moveItem('dir B', 'dir A')
// fileSystem.moveItem('fileC', 'root')
// fileSystem.deleteItem('dir A')

fileSystem.printFileSystem()

// fileSystem.createFolder('dir A', 'root')
// fileSystem.createFolder('folder1', 'root')
// fileSystem.createFolder('folder2', 'folder1')
// fileSystem.createFile('file1.txt', 'root')
// fileSystem.createFile('file2.txt', 'folder2')
// fileSystem.moveItem('file2.txt', 'root')
// fileSystem.deleteItem('folder1') // work
// fileSystem.createFolder('New Folder', 'root')
// fileSystem.printFileSystem()
// fileSystem.moveItem('file2.txt', 'New Folder') // work
// fileSystem.printFileSystem()
// console.log('Initial file system:')
// fileSystem.printFileSystem()

// console.log('\nAfter moving file2.txt to root:')
// fileSystem.moveItem('file2.txt', 'root')
// fileSystem.printFileSystem()

// console.log('\nAfter deleting folder1:')
// fileSystem.deleteItem('folder1')
// fileSystem.printFileSystem()

//default test cases
// fileSystem.createFolder('dir A', 'root')
// fileSystem.createFolder('dir B', 'root')
// fileSystem.createFile('fileC', 'dir B')
// fileSystem.createFile('fileD', 'dir A')
// fileSystem.createFile('fileE', 'root')
// fileSystem.createFile('fileF', 'dir B')
// fileSystem.moveItem('dir B', 'dir A')
// fileSystem.printFileSystem()
