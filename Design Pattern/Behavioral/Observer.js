/* 
    관찰대상의 "주제객체", 관찰을 하는 "구독객체"
    구독객체는 자유롭게 주제객체를 등록/비등록
    한 주제 객체의 상태가 바뀌면 다른 구독객체들에게 상태와 변경을 알림.

    실무에선 이벤트 기반의 기능을 구현할때 원하는 기능이 동적으로 동작이 수해되도록 해주는 역할을 함
    ex) 알림, 메세지, UI 이벤트 등록
*/
class Subject {
    constructor() {
        this.observers = []; // 구독자 리스트
    }
    getObserversList() {
        return this.observers;
    }
    subscribe(observer) { // 구독하면 구독자 리스트에 추가
        this.observers.push(observer);
    }
    unsubscribe(observer) { // 구독취소하면 구독자 리스트에서 제거
        this.observes= this.observers.filter((obs)=> obs !== observer);
    }
    notifyAll() { // 구독자들에게 알리기!
        this.observers.forEach((subscriber)=> {
            try {
                subscriber.update(this.constructor.name);
            }catch(err){
                console.error("error", err);
            }
        });
    }
}

class Observer { // 구독자들
    constructor(name) {
        this.name = name;
    }
    update(subj) { 
        console.log(`${this.name}: notified from ${subj} class!`)
    }
}

// test
const subj = new Subject();

const a = new Observer("A");
const b = new Observer("B");
const c = new Observer("C");

subj.subscribe(a);
subj.subscribe(b);
subj.subscribe(c);

console.log(subj.getObserversList());

subj.notifyAll();
