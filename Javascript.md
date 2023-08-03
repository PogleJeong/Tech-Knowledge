Javascript
======

# context


<hr/>

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

<hr/>

# 1. 브라우저 동작원리

웹 브라우저 내부

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

# 2. Execute context 







<hr/>

참고자료
======

실행컨텍스트 - [생활코딩](https://www.youtube.com/watch?v=QtOF0uMBy7k)
