>Design Pattern
>>Structural 
>>> Proxy Pattern

<hr/>

## 1. 구조 및 설명

### 1. 구조

    - Proxy 는 대리인 역할
    - 클라이언트가 실제 객체 대신 Proxy 객체를통해 작업을 요청한다.
    - Proxy 는 실제 객체와 클라이언트 사이에 존재한다.
    - Proxy 는 실제 객체를 참조하고 있음

    [구성]
    - Client (사용자)
    - Subject (인터페이스)
    - Proxy (대리인)
    - Real Subject (실제객체)

### 2. 대표사례

    - Access control(접근권한) / Validation 
    - Caching / Logging
    - Debit / Check Card (신용/체크카드)

    ** 체크카드 사례
    client: 소비자
    Proxy: 체크카드
    Real Subject: 실제계좌

<hr/>

## 2. Code

### 1. Subject : 인터페이스

```ts
interface Payment {
    request(amount:number):void;
}
```

### 2. Real Subject : 실제객체

```ts
class Cash implements Payment {
    request(amount: number): void{
        console.log(`결제요청 완료.. 금액: ${amount}`)
    }
}

const targetObject = new Cash();
```

### 3. Proxy 

```js
// Proxy : JS 에서 기본적으로 제공함.
const paymentProxy = new Proxy(targetObject, {
    get: (object, prop) => {
        if(prop === "request") {
            return object[prop];
        }
        throw new Error("operation not implemented");
    }
})
```

<hr/>

### 4. Test

```js
// test
paymentProxy.request(100); // 카드로 100원 결제
```

<hr/>

## 3. 참고

[MDN-Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)