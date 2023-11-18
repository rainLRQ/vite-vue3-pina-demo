// 在前端页面中需要同时发送20个请求，但是服务端有限制，需要前端控制并发数，保证最多只能同时发送5个请求。
/**
 * 1、最多同时执行的任务数为10个
 * 2、当前任务执行完成后，释放队列空间，自动执行下一个任务
 * 3、所有任务添加到任务队列后，自动开始执行任务
 */


// 
function createTaskQueue (len: number) {
  let tasks:Array<Task> = []
  for(let i = 0; i < len; i++) {
    let task:Task = () => {
      return new Promise((resolve: Function)=> {
        setTimeout(() => {
          resolve(i)
        }, 2000)
      })
    }
    tasks.push(task)
  }
  return tasks
}

class TaskQueue {
  max: number
  taskList: Array<Task>
  constructor(max: number) {
    this.max = max
    this.taskList = []
  }
  addTask(task: Task | Array<Task>) {
    if(Array.isArray(task)){
      this.taskList.push(...task)
    } else {
      this.taskList.push(task)
    }
    //  创建好任务队列之后运行任务
    this.run()
  }
  run() {
    let len = this.taskList.length
    if(!len) return false
    let min = Math.min(this.max, len)
    for(let i = 0; i < min; i++) {
      // 开始占用一个个任务的空间
      this.max--  
      let task = this.taskList.shift()
      task!().then((res) => {
        console.log('result', res)
      }).catch((e: Error|string|undefined) => {
      throw e
      }).finally(() => {
        // 释放一个任务空间
        this.max++
        this.run()
      })
    }
  }
}

function requestLimit(limit:number = 5, taskLen:number) {
  const taskQueue = new TaskQueue(limit)
  taskQueue.addTask(createTaskQueue(taskLen))
}
requestLimit(5, 20)