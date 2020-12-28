## 🛠️ 기술 스택

------

- pure javascript



## 📘 소개

운영체제 수업에서 Process Scheduling 을 웹에서 시뮬레이션 해볼 수 있도록 구현해봤습니다.

[Demo](https://seung-00.github.io/scheduling-queue-visualization/)



## 📖 상세 설명

### 기능

1️⃣ 유저는 원하는 I/O Interrupt 시점을 설정하고 프로세스를 생성한다.

2️⃣ 모든 프로세스는 terminated 될 때까지 job qeuue에 저장되며 ready queue의 프로세스들은 순서대로 CPU 에서 실행된다.

3️⃣ 입력된 I/O interrupt 시점이 됐을 때 Context Switching이 일어나며 작업 중이던 프로세스는 device queue로 이동한다.

4️⃣ device queue의 프로세스는 잠시 대기한 뒤 ready queue 에 들어간다. context switching이 일어나면 CPU는 그 다음 ready queue의 프로세스를 dispatch해 실행한다.



### 참고한 이론

각 프로세스들은 목적에 맞는 컨테이너로 이동하며 상태가 변경된다.

프로세스는 3.1의 Process State에 따라 스케줄링된다. 프로세스 스케줄링은 위 그림처럼 **큐잉 다이어그램** 으로 표현될 수 있다.

1. 새로운 프로세스(New)는 처음에 Ready Queue에 놓인다. 프로세스는 Dispatch 되기 위해 기다린다.
2. CPU에 할당되어 Running 상태가 된 프로세스는 그대로 종료될 수 있고, 여러 이벤트로 인해 상태가 바뀔 수도 있다.
   - I/O 요청, 자식 프로세스 생성 등의 이벤트 발생 ⇒ Waiting Queue 에 프로세스 삽입
     - 이때 이벤트별로 별도의 메모리 공간에 waiting queue가 존재함(I/O, 자식 프로세스, ...)
   - time sharing(시분할 시스템)을 위해 Timer 인터럽트로 CPU ⇒ Ready Queue
3. 2에서 waiting 상태로 전환된 프로세스들은 다시 Ready Queue 로 삽입된다.
4. 프로세스는 종료될때까지 1, 2, 3 주기를 반복한다.



## 💡고민과 배움

운영체제의 process life-cycle에 대한 이해도 상승

`setTimeout()` 에 대한 이해도 상승