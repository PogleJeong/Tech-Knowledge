Virtual DOM
======

# 1. Virtual DOM

Virtual DOM 은 DOM 의 가벼운 버전으로 이해할 수 있음.

DOM 은 node tree 를 복제한 JS 객체이다.

Virtual DOM 은 기존 DOM 과 같이 class, style 등의 속성을 가지고 있지만
화면에 변화를 줄 수 있는 기능인 DOM api method 는 가지고 있지 않다.
(DOM api - getElementById 등)


# 2. Virtual DOM 의 동작

- DOM tree 생성 이후 브라우저에 UI Render 완료
- DOM tree 를 일부 복사하여 Virtual DOM 생성
- DOM node 변화가 생길 시, virtual DOM 을 새로 재생성

>>DOM 조작에서 발생하는 비효율성은 전체를 다시 랜더링 한다는 점에서 나타나지만 Virtual DOM 은 랜더링이 아닌 메모리 상에서 tree 만 수정하는 일이기 때문에 보다 효율적임.

- DOM 과 Virtual DOM Tree 를 비교하면서 변화를 감지하고, 변화된 부분만을 DOM 에 적용시키고 랜더링하게 됨.

** virtual DOM 은 buffering 이나 caching 의 역할을 함. 
>>DOM 조작 시에 브라우저 랜더링을 반복하는 것이 아니라, 변화들을 vitual DOM에 반영한 후 변경된 부분만을 가져와 실제 DOM 에 적용하여, 단 한번만 랜더링을 함으로써 성능을 최적화함.