
//  全局的变量声明

type Task = () => Promise<number>
declare function requestLimit(limit:number, tasks:[]):void
declare function createTaskQueue(len: number):Task[]