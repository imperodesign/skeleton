import { EventEmitter } from 'events'

class App extends EventEmitter {
  constructor() {
    super()
  }
}

let app = window.app = new App()

console.log('Skeleton app started')
