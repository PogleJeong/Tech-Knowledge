/**
    명령을 캡슐화해서 처리하며, 명령/수신자/발동자/클라이언트로 구성됨,
    Command/Receiver/Invoker/Client

    은행업무를 예로 든다면

    고객 = Client
    은행매니저 = Invoker
    은행계좌 = Receiver
    은행업무행위(입금,출금,이체 등) = Command

    [흐름]
    1. Client 가 Command 인스턴스들을 생성
    2. Invoker 가 Command 인스턴스를 통해서 필요한 클래스 함수를 통해 등록을 함
    3. client 가 receiver 를 설정하여 receiver class 를 인스턴스화 함.
    4. receiver 가 Invoker 에 등록이 됨,
    5. client 가 Invoker 에 command 를 전달함. 
    6. Invoker 가 command 에 따라 진행됨.

    장점: 확장이 용이하고, 의존도를 최소화 할 수 있다.
 */


//Interface (js/ts 에서는 interface 가 있으나 다른 OOP 에서는 abstact class)
abstract class ICommand {
    abstract execute(args): void;
}

// Receiver : 은행계좌
class State {
 private _state: number;
 constructor(state) {
    this._state = state;
 }
 getState() {
    return this._state;
 }
 setState(value) {
    return this._state = value;
 }
}

// Invoker : 은행매니저
class BankManager {
    private _state;
    private _commands = {}; // 처리해야할 고객요청 리스트
    constructor(state) {
        this._state = state;
    }
    registerCommands(...args) { // 고객요청 등록하기
        for (const cmd of args) {
            this._commands[cmd.constructor.name] = cmd;
        }
    }
    executeCmd(cmdName, param) { // 고객요청 들어주기(업무실행)
        this._commands[cmdName].execute(this._state, param);
    }
}

// Command : 저축
class Deposit implements ICommand {
    execute(...params): void {
        const [ state, amount ] = params; // 명령과 금액
        const prevState = state.getState(); // 업무실행 이전값
        state.setState(prevState + amount);
    }
}
// Command : 인출
class Withdrawal implements ICommand {
    execute(...params): void {
        const [ state, amount ] = params; // 명령과 금액
        const prevState = state.getState(); // 업무실행 이전값
        state.setState(prevState - amount);
    }
}

// test

// 1. Command 생성
const deposit = new Deposit();
const withdrawal = new Withdrawal();

// 2. Receiver 생성
const state = new State(0);

// 3. Invoker 인스턴스 & receiver 등록
const bankManager = new BankManager(state);

// 4. Command 등록
bankManager.registerCommands(deposit, withdrawal);

// 5. Command 지시
bankManager.executeCmd("Deposite", 100); // 100원 저금
bankManager.executeCmd("Deposite", 1000); // 1000원 저금
console.log(state.getState());

bankManager.executeCmd("withdrawal", 1000); // 1000원 출금
console.log(state.getState());

