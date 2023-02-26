import Storage from 'vue-ls'

const options = {
  namespace: 'cc-demo__',
  name: 'ls',
  storage: 'local'
}

const { ls } = Storage.useStorage(options)

export default ls
