Javascript
======

# context

## [브라우저동작원리](#1-브라우저-동작원리)
## [실행컨택스트](#2-실행컨텍스트execute-context)



<hr/>

# 1. 브라우저 동작원리

웹 어플리케이션를 만들기 위한 html, css, JS 를 작성하면, 웹 브라우저라는 엔진이 이를 해석하고 동작하게 된다. 따라서 웹브라우저 동작원리를 이해해야한다.

기본적으로 알아야 하는 것은 javascript 는 보통은 코드작성한순서대로 작동하는 동기적처리를 하나 **ajax 나 eventListener 등 비동기처리** 도 가능하다.

코드를 먼저 작성했든 나중에 작성했든 상관없이 빠르게 처리할 수 있는 코드먼저 실행한다.

[간단한예시] 
```js
console.log(1+1);
setTimeout(function(){
    console.log(console.log(2+2))
}, 1000)
console.log(3+3)

/*
    결과는 2, 6, 4 순서로 출력된다.
    setTimeout 에서 1초를 기다리긴 하나 그 안에 있는 2+2 가 아닌 다음코드인 3+3 이 출력된다
*/
```

## 1. Stack

- 코드를 실행시켜주는 곳이며, 오로지 하나만 존재(Single thread language)하기에 한번에 코드를 하나밖에 처리하지 못한다.
- JS 를 작성한 코드를 Stack 에 한 줄씩 쌓아가고 실행한다.
- 만약 변수를 만나게 되면, 변수정보가 저장된 Heap 에서 찾아서 실행한다.
- 만약 setTimeout 과 같은 기다림이 필요한 함수들은 Stack 에서 대기실으로 이동된다. 기다림이 끝난 코드는 Queue(Event Queue)로 이동시키고, Stack 으로 하나씩 전달한다(**Stack이 모두 비워져있어야함**)

** 대기실로 보내는 코드들(기다림이 필요한 코드들)
- ajax 요청
- eventListener
- setTimeout 등

## 2. Queue

- 비동기적처리가 필요한 ajax, eventListener 등의 함수들이 Stack 에서 대기실로, 대기실에서 Queue 로 이동된다.
- 비동기처리가 필요한 함수들이 Queue 에 차례대로 채워진다
- Stack 이 모두 비워졌을 때, Queue 에서 Stack 으로 하나씩 비동기처리함수들을 전달한다.

## 3. 주의점

처리시간이 오래걸리는 많이 중첩된 반복문이나, 어려운 수학적계산을 JS로 작성하면 안된다. Stack 에서 모두 처리 될때까지 ajax, eventListener 등이 그 동안에 실행되지 않음.

물론 Queue 에서도 너무 많은 작업을 시키면 브라우저가 느려짐으로 많은 eventListener 를 작성하면 안됨.

<hr/>

# 2. 실행컨텍스트(Execute context)

**javascript 에서 가장 중요한 핵심개념**

## 1. 개념

> 실행할 코드에 제공할 환경정보들을 모아놓은 객체(변수, 인자, 함수, scope, this 등)
> 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념

실행컨텍스트가 활성화되는 시점에 다음과 같은 일이 발생한다.

1. 호이스팅발생 (변수와 함수의 메모리 공간을 선언 전에 미리 할당)
2. 외부환경정보구성
3. this 값 설정

## 2. 생성

> 실행컨텍스트는 call stack 에 쌓이게된다.
> 처음에 전체코드를 대상으로하는 전역 컨텍스트가 생성되고, 각 함수에 따라 함수 컨텍스트가 생긴다.
> **가장 최근**에 만들어진 실행컨텍스트만이 활성화된다

```js
var a = 1; // 전역 컨텍스트
function outer () { // outer 컨텍스트
  function inner () { // inner 컨텍스트
    console.log(a); // undefined : 지역변수로 선언된 var a = 3 이 호이스팅되면서 undefined 로 초기화됨
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

|순서|Call Stack|
|---|---|
|프로그램실행|[전역컨텍스트]|
|outer 함수실행|[전역컨텍스트, outer]|
|inner 함수실행|[전역컨텍스트, outer, inner]|
|inner 함수종료|[전역컨텍스트, outer]|
|outer 함수종료|[전역컨텍스트]|
|프로그램실행완료| - |


## 3. 구성

실행컨택스트가 구성되면 Variable Environment, Lexical Environment, This Binding 의 세가지 정보를 수집한다.

### 3.1 Variable Environment

Variable Environment에 정보를 먼저 담은 다음, 이를 복사해서 Lexical Environment를 만든다.

> - 현재 컨택스트 내의 식별자(변수)들에 대한 정보
> - 외부환경 정보
> - 선언 시점의 LexicalEnvironment 의 스냅샷(변경사항이 반영되지 않은)

### 3.2 Lexical Environment

> - 처음에는 Variable Environment 와 같음
> - 변경사항이 실시간으로 반영

또한 Lexical Environment 는 내부에 Environment Record 와 Outer Environment Reference 로 구성되어있다.

### 3.2.1 Environment Record

현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.

- 매개변수 식별자
- 함수 자체
- 함수 내부 식별자

코드가 실행되기 전에 Environment Record 를 통해, 실행컨텍스트 안의 속한 변수를 알 수 있게 되고, 이때 __호이스팅__ 이라는 개념이 사용된다.


> __호이스팅__
> JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미. 
>> **변수 호이스팅**
>> - var로 선언한 변수의 경우 호이스팅 시 undefined로 변수값(Environment Record 값)를 초기화한다.
>> - let과 const로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않는다.
>> **함수 호이스팅**
>> - 화살표 함수(함수표현식) 사용시 변수 호이스팅과 동일하게 동작한다
>> - function 키워드를 통한 함수(함수선언문) 사용시 선언과 동시에 함수가 생성되어 Environment Record에 저장됨.

let, const 는 "선언 라인 이전에는 변수를 참조할 수 없다"는 일반적인 프로그래밍 방식을 추구할 수 있도록 보완된 기능

### 3.2.2 Outer Environment Reference

현재 호출된 함수가 선언될 당시의 Lexical Environment 를 참조

    ```js
    var a = 1; // 전역 컨텍스트
    function outer () { // outer 컨텍스트
    function inner () { // inner 컨텍스트
        console.log(a);
        var a = 3;
        console.log(a);
    }
    inner(); // inner가 실행될 때 outer의 Lexical Environment 를 outerEnvironmentReference로 참조한다.
    console.log(a);
    }
    outer(); // outer가 실행될 때 전역 컨텍스트의 Lexical Environment 를 outerEnvironmentReference로 참조한다.
    console.log(a);
    ```

이러한 구조적 특성 덕분에 여러 Scope 동일한 식별자를 선언할 경우, **무조건 scope chain 상에서 가장 먼저 발견된 식별자에만 접근 가능**하게 된다.

> * 만약 a 라는 변수가 Local, Script, Global scope 에 모두 존재하더라도 scope chain 에서는 Local > Script > Global 순으로 탐색하기 때문에 Local Scope 에 있는 a 변수에만 접근한다.

### 3.2.2.1. Scope 

**변수에 접근이 가능한 유효범위**

Javascript 에 작성한 변수들은 Scope 에서 볼 수 있으며, Scope 은 Local, Script, Global Scope 3개로 이루어져있으며 각각의 속한 변수들을 확인할 수 있다.

Javascript 는 어떤 변수를 읽을려할때, Scope 에서 변수를 찾는다. 찾아보는 순서는 Local > Script > Global 순서로 찾는다. 앞선 Scope 에서 변수값을 찾게되면 더이상의 탐색은 진행하지 않는다. 

    ```html
    <script>
    n0='n0';
    var v0='v0';
    let l0='l0';
    const c0 = 'c0';
    console.log(v0, n0, l0, c0);
    console.log(window.v0, window.n0, window.l0, window.c0);
    function fn2(){
        n2='n2';
        console.log(n0, n1, n2);
        var v2='v2';
        console.log(v0, v2);
        // console.log(v1)
        let l2='l2'; 
        console.log(l0, l2);
        // console.log(l1);
        const c2='c2;';
        console.log(c0, c2);
        // console.log(c1);
    }
    function fn1(){
        n1='n1';
        var v1='v1';
        let l1='l1';
        const c1='c1';
        fn2();
    }
    fn1();
    console.log(n2);
    // console.log(v2, l2, c2);
    </script>
    ```


### 3.2.2.1. Scope chain

**식별자를 결정할 때 활용하는 Scope 들의 연결리스트**

    ```js
    function goTo_1F() {


        let lamp = false;

        
        function goTo_2F() {


            let lamp = true;


            function goTo_3F() {
                let pet = "cat"

                console.log(lamp); // 해당 컨택스트에는 lamp 라는 식별자(변수)가 없으므로, outerEnvironmentReference를 통해서 goTo_2F 컨텍스트의 Lexical Environment 를 보고 lamp 를 탐색한다.
                // 결과값 : true
            }

            goTo_3F();
            // goTo_3F가 실행될 때 goTo_2F 컨텍스트의 Lexical Environment 를 outerEnvironmentReference로 참조한다. 즉 goTo_3F가 goTo_2F 가 연결된 것이다.
        }

        goTo_2F();
        // goTo_2F가 실행될 때 goTo_1F 컨텍스트의 Lexical Environment 를 outerEnvironmentReference로 참조한다. 즉 goTo_2F가 goTo_1F 과 연결된 것이다.
    }

    goTo_1F(); 
    // goTo_1F가 실행될 때 전역 컨텍스트의 Lexical Environment 를 outerEnvironmentReference로 참조한다. 즉 goTo_1F 컨택스트와 전역 컨택스트가 연결된 것이다.
    ```



### 3. This Binding

>> - 식별자가 바라봐야할 대상 객체
>> - this 가 무엇을 가르키는기 정함







<hr/>

참고자료
======

호이스팅 - [MDN-호이스팅](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)
실행컨텍스트 - [생활코딩](https://www.youtube.com/watch?v=QtOF0uMBy7k)
실행컨텍스트 2- [개발자 황준일](https://junilhwang.github.io/TIL/Javascript/Domain/Execution-Context/#_2-%E1%84%89%E1%85%B5%E1%86%AF%E1%84%92%E1%85%A2%E1%86%BC-%E1%84%8F%E1%85%A5%E1%86%AB%E1%84%90%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3-%E1%84%80%E1%85%AE%E1%84%89%E1%85%A5%E1%86%BC)
