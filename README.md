
운영체제 수업에서 Process Scheduling 을 웹에서 시뮬레이션 해볼 수 있도록 구현해봤습니다.

[Demo](https://seung-00.github.io/scheduling-queue-visualization/)


### feature

1. 유저는 원하는 I/O Interrupt 시점을 설정하고 프로세스를 생성한다.

2. 모든 프로세스는 terminated 될 때까지 job qeuue에 저장되며 ready queue의 프로세스들은 순서대로 CPU 에서 실행된다.

3. 입력된 I/O interrupt 시점이 됐을 때 Context Switching이 일어나며 작업 중이던 프로세스는 device queue로 이동한다.

4. device queue의 프로세스는 잠시 대기한 뒤 ready queue 에 들어간다. context switching이 일어나면 CPU는 그 다음 ready queue의 프로세스를 dispatch해 실행한다.
