<?php
$t1 = microtime(true);


// test 1
// function logger($fileName) {
//     $fileHandle = fopen($fileName, 'a');
//     while (true) {
//         fwrite($fileHandle, yield . "\n");
//     }
// }
 
// $logger = logger(__DIR__ . '/log');
// $logger->send('Foo');
// $logger->send('Bar')

// test 2
// function gen() {
//     $ret = (yield 'yield1');
//     var_dump($ret);
//     $ret = (yield 'yield2');
//     var_dump($ret);
// }
 
// $gen = gen();
// var_dump($gen->current());    // string(6) "yield1"
// var_dump($gen->send('ret1')); // string(4) "ret1"   (the first var_dump in gen)
//                               // string(6) "yield2" (the var_dump of the ->send() return value)
// var_dump($gen->send('ret2')); // string(4) "ret2"   (again from within gen)
                              // NULL               (the return value of ->send())


class Task {
    protected $taskId;
    protected $coroutine;
    protected $sendValue = null;
    protected $beforeFirstYield = true;
 
    public function __construct($taskId, Generator $coroutine) {
        $this->taskId = $taskId;
        $this->coroutine = $coroutine;
    }
 
    public function getTaskId() {
        return $this->taskId;
    }
 
    public function setSendValue($sendValue) {
        $this->sendValue = $sendValue;
    }
 
    public function run() {
        if ($this->beforeFirstYield) {
            $this->beforeFirstYield = false;
            return $this->coroutine->current();
        } else {
            $retval = $this->coroutine->send($this->sendValue);
            $this->sendValue = null;
            return $retval;
        }
    }
 
    public function isFinished() {
        return !$this->coroutine->valid();
    }
}

class Scheduler {
    protected $maxTaskId = 0;
    protected $taskMap = []; // taskId => task
    protected $taskQueue;
 
    public function __construct() {
        $this->taskQueue = new SplQueue();
    }
 
    public function newTask(Generator $coroutine) {
        $tid = ++$this->maxTaskId;
        $task = new Task($tid, $coroutine);
        $this->taskMap[$tid] = $task;
        $this->schedule($task);
        return $tid;
    }
 
    public function schedule(Task $task) {
        $this->taskQueue->enqueue($task);
    }
 
    public function run() {
        while (!$this->taskQueue->isEmpty()) {
            $task = $this->taskQueue->dequeue();
            $task->run();
 
            if ($task->isFinished()) {
                unset($this->taskMap[$task->getTaskId()]);
            } else {
                $this->schedule($task);
            }
        }
    }
}


function task1() {
    for ($i = 1; $i <= 10; ++$i) {
        echo "This is task 1 iteration $i.\n";
        yield;
    }
}
 
function task2() {
    for ($i = 1; $i <= 5; ++$i) {
        echo "This is task 2 iteration $i.\n";
        yield;
    }
}
 
$scheduler = new Scheduler;
 
$scheduler->newTask(task1());
$scheduler->newTask(task2());
 
$scheduler->run();









// ... 执行代码 ...
$t2 = microtime(true);
echo '耗时'.round($t2-$t1,3).'秒<br>'.PHP_EOL;
echo 'Now memory_get_usage: ' . memory_get_usage() . '<br />'.PHP_EOL;
?>