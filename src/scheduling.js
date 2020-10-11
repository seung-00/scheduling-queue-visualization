const newBtn = document.querySelector('.new-btn')
    , jobQueueDOM = document.querySelector('.job-queue')
    , readyQueueDOM = document.querySelector('.ready-queue')
    , cpuDOM = document.querySelector('.CPU');

let count = 0;

const createProcess = () => {
    count += 1;

    const pcb = document.createElement('li')
        , pid = document.createElement('div')
        , processInfo = document.createElement('div')
        , pidValue = document.createElement('span')
        , processedValue = document.createElement('span')
        , percent = document.createElement('span');

    pcb.className = 'pcb'

    pid.className = 'PID';
    pid.innerText = 'PID: ';
    pidValue.innerText = count;

    processInfo.className = 'processInfo';
    processInfo.innerText = 'processed: ';

    processedValue.className = 'processedValue';
    processedValue.innerText = 0;
    percent.innerText = '%';
    
    
    pcb.appendChild(pid);
    pcb.appendChild(processInfo);
    pid.appendChild(pidValue);
    processInfo.appendChild(processedValue);
    processInfo.appendChild(percent);
    return pcb;
}

const run = (pcbDOM) => {
    const processValue = pcbDOM.querySelector('.processedValue');
    const pidDOM = pcbDOM.querySelector('.PID');
    const pid = pidDOM.innerText;

    const timerId = setInterval(() => {
        let pVlaue = parseInt(processValue.innerText);
        if (pVlaue < 100) {
            pVlaue += 25;
            processValue.innerText = pVlaue;
        } else {
            console.log(`done ${pid}`);
            cpuDOM.removeChild(pcbDOM);
            const newPcbDOM = readyQueueDOM.querySelector('.pcb');
            clearInterval(timerId);

            if (newPcbDOM) {
                dispatch(newPcbDOM);
            }
        }
    }, 1000);
}

const dispatch = (pcbDOM) => {
    cpuDOM.appendChild(pcbDOM);
    console.log('test')
    console.log(pcbDOM)
    run(pcbDOM);
}

const handleNew = (e) => {
    const pcbDOM = createProcess();
    const checker = cpuDOM.querySelector('.pcb');
    
    if (checker === null) {
        dispatch(pcbDOM);
    } else {
        readyQueueDOM.appendChild(pcbDOM);
    }
}

newBtn.addEventListener('click', handleNew);
