const jobQueueDOM = document.querySelector('.job-queue')
    , readyQueueDOM = document.querySelector('.ready-queue')
    , deviceQueueDOM = document.querySelector('.device-queue')
    , cpuDOM = document.querySelector('.cpu')
    , log = document.querySelector('.log')
    , newProcess = document.querySelector('.new-process')
    , interruptSelect = newProcess.querySelector('#interrupt')
    , newBtn = newProcess.querySelector('input');

let pidCount = 0,
    interrptTimeMap = new Map();

const logInterrupt = (pid) => {
    const pidLog = log.querySelector(`.pid${pid}`)
        , msg = document.createElement('span');
    msg.innerText = `=> I/O interrupt! `;
    pidLog.appendChild(msg);
}

const logNew = (pid) => {
    const pidLog = document.createElement('li');
    pidLog.className = `pid${pid}`;
    pidLog.innerText = `PID: ${pid} => New! `;
    log.appendChild(pidLog);
}

const logTerminate = (pid) => {
    const pidLog = log.querySelector(`.pid${pid}`)
        , msg = document.createElement('span');
    msg.innerText = `=> Terminate! `;
    pidLog.appendChild(msg);
}

const logDispatch = (pid) => {
    const pidLog = log.querySelector(`.pid${pid}`)
        , msg = document.createElement('span');
    msg.innerText = `=> Dispatch! `;
    pidLog.appendChild(msg);
}

const createProcess = () => {
    pidCount += 1;

    const pcb = document.createElement('li')
        , pid = document.createElement('div')
        , processInfo = document.createElement('div')
        , pidValue = document.createElement('span')
        , processedValue = document.createElement('span')
        , percent = document.createElement('span');
    
    const pidStr = String(pidCount);
    
    pcb.className = 'pcb'
    pcb.classList.add('pid'+pidStr)

    pid.className = 'PID';
    pid.innerText = 'PID: ';

    pidValue.className = 'pidValue';
    pidValue.innerText = pidStr;

    processInfo.className = 'processInfo';
    processInfo.innerText = 'processed: ';

    processedValue.className = 'processedValue';
    processedValue.innerText = 0;
    percent.innerText = '%';
    
    const interruptTime = parseInt(interruptSelect.value)
    if (interruptTime) {
        interrptTimeMap.set(pidStr, interruptTime)
    }
    
    pcb.appendChild(pid);
    pid.appendChild(pidValue);

    pcb.appendChild(processInfo);
    processInfo.appendChild(processedValue);
    processInfo.appendChild(percent);
    
    return pcb;
}

const contextSwitch = (runningProcess) => {
    const storedProcess = runningProcess.cloneNode(true);
    cpuDOM.removeChild(runningProcess);
    deviceQueueDOM.appendChild(storedProcess);
    setTimeout(function(){
        console.log("I/O event complete");
        const restoredprocess = storedProcess.cloneNode(true);
        deviceQueueDOM.removeChild(storedProcess);
        readyQueueDOM.appendChild(restoredprocess);
     }, 1000);
}

const process = () => {
    let runningProcess = cpuDOM.firstElementChild,
        processValue = runningProcess.querySelector('.processedValue'),
        pidDOM = runningProcess.querySelector('.pidValue'),
        pid = pidDOM.innerText,
        interrptTime = interrptTimeMap.get(pid);

    // let's process
    let pVlaue = parseInt(processValue.innerText);
    if (pVlaue < 100) {
        pVlaue += 25;
        processValue.innerText = pVlaue;
        if (interrptTime && pVlaue/25 == interrptTime) {

            // interrupt
            logInterrupt(pid);
            interrptTimeMap.delete(pid);
            contextSwitch(runningProcess);
        }
    } else {

        // terminated
        const processInDisk = jobQueueDOM.querySelector('.pid'+pid)
        cpuDOM.removeChild(runningProcess);
        jobQueueDOM.removeChild(processInDisk);
        logTerminate(pid);
    }
}

const run = () => {
    const timerId = setInterval(() => {
        let cpuIsIdle = cpuDOM.querySelector('.pcb') == null
            , readyQIsEmpty = readyQueueDOM.querySelector('.pcb') == null;

        if (!cpuIsIdle) {
            process();
        } else if (!readyQIsEmpty) {
                
                // cpu is idle
                clearInterval(timerId);
                dispatch();
        }
 
        console.log("cpu is running...")
    }, 1000);
}

const dispatch = () => {
    const timerId = setInterval(() => {
        const cpuIsIdle = cpuDOM.querySelector('.pcb') == null;
        if (cpuIsIdle) {
            clearInterval(timerId);
            const targetPcb = readyQueueDOM.firstElementChild // dequeue
                , pidDOM = targetPcb.querySelector('.pidValue')
                , pid = pidDOM.innerText;
            logDispatch(pid);
            cpuDOM.appendChild(targetPcb);  // enqueue
            run();        
        }
    }, 100);
}

const handleNew = (e) => {
    e.preventDefault();
    const pcbDOM = createProcess()
        , pcbDisk = pcbDOM.cloneNode(true)
        , pidDOM = pcbDOM.querySelector('.pidValue')
        , pid = pidDOM.innerText;

    logNew(pid);
    jobQueueDOM.appendChild(pcbDisk);
    readyQueueDOM.appendChild(pcbDOM);

    if (cpuDOM.querySelector('.pcb') == null) {
        dispatch();
    }
}

newProcess.addEventListener('submit', handleNew);