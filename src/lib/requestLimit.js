// 在前端页面中需要同时发送20个请求，但是服务端有限制，需要前端控制并发数，保证最多只能同时发送5个请求。
/**
 * 1、最多同时执行的任务数为10个
 * 2、当前任务执行完成后，释放队列空间，自动执行下一个任务
 * 3、所有任务添加到任务队列后，自动开始执行任务
 */
// 
function createTaskQueue(len) {
    var tasks = [];
    var _loop_1 = function (i) {
        tasks.push(function () {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(i);
                }, 2000);
            });
        });
    };
    for (var i = 0; i < len; i++) {
        _loop_1(i);
    }
    return tasks;
}
var TaskQueue = /** @class */ (function () {
    function TaskQueue(max) {
        this.max = max;
        this.taskList = [];
    }
    TaskQueue.prototype.addTask = function (task) {
        var _a;
        if (Array.isArray(task)) {
            (_a = this.taskList).push.apply(_a, task);
        }
        else {
            this.taskList.push(task);
        }
        //  创建好任务队列之后运行任务
        this.run();
    };
    TaskQueue.prototype.run = function () {
        var _this = this;
        var len = this.taskList.length;
        if (!len)
            return false;
        var min = Math.min(this.max, len);
        for (var i = 0; i < min; i++) {
            this.max--;
            var task = this.taskList.shift();
            task().then(function (res) {
                console.log('result', res);
            })["catch"](function (e) {
                throw new Error(e);
            })["finally"](function () {
                // 释放一个任务空间
                _this.max++;
                console.log(_this.max, 'max');
                _this.run();
            });
        }
    };
    return TaskQueue;
}());
function requestLimit(limit, taskLen) {
    if (limit === void 0) { limit = 5; }
    var taskQueue = new TaskQueue(limit);
    taskQueue.addTask(createTaskQueue(taskLen));
}
requestLimit(5, 20);
