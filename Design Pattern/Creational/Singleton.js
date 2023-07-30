// 시스템로깅이나 애플리케이션설정(환경 및 상태설정) 리소스 관리에 주요 사용.

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return console.warn("warning: Singleton class already instantiated");
        }
        Singleton.instance = this;
        this.version = Date.now();
        this.config = "test";
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

// 1. 하나의 객체 인스턴스만 존재한다.

const s1 = new Singleton();
console.log("s1", s1);
const s2 = new Singleton();
console.log("s2", s2); // s1 에서 Singleton 의 instance 가 존재하므로 새로 만들어지지 않음.

// 2. 오직 Static 함수로 객체에 접근한다.

const s3 = Singleton.getInstance();
console.log(s3);
const s4 = Singleton.getInstance();
console.log(s4);

console.log(s3 === s4); // true


/*
    장점 : 하나의 인스턴스에서 리소스를 관리할 수 있다
    Static 멤버함수(get)를 통해서 애플리케이션 전역에서 Singleton class 에 접근할 수 있음.
 */