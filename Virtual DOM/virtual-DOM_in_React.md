React 에서의 Virtual DOM
======

# 1. React 에서의 element rendering

- JSX 문법을 통해 element 를 작성. 
- JSX 는 확장문법이기 때문에 Babel을 통해 일반 JS 로 변환
- JS 객체로 변환됨.

**JSX 문법**
```javascript
const element = <h1 title="foo">Hello</h1>;
```
**JS Object 로 변환**
```javascript
const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello",
    },
};
```

변환된 JS Object 를 사용하여 Virtual DOM tree을 구성

이후 ReactDOM.render 를 통해 랜더링하면 실제 DOM 이 만들어짐


# 2. 재조정(React component 변화)

**react docs**
Virtual DOM 은 UI 의 이상적인 또는 가상적인 표현을 메모리에 저장하고 reactDOM과 같은 라이브러리에 의해 실제 DOM과 동기화하는 프로그래밍 개념

재조정이란 Virtual DOM 과 실제 DOM 을 비교하고 일치시키는 과정


## 1. React 에서의 재조정

React 는 변경전 Virtual DOM 과 변경후 Virtual DOM 을 모두 가지고 있음
React 는 두 Virtual DOM Tree 의 스냅샷을 비교하여, 변화된 부분만을 감지한 후 실제 DOM에 적용함.

비교하는 과정에서 Diffing 알고리즘이 사용됨

## 2. Diffing 알고리즘의 간단한 이해

JSX 에서 변환된 JS Object 을 예로들면
```javascript
const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello",
    },
};
```

1. 변경전 type 과 변경후 type 이 같다면 속성만 변경
2. 변경전 type 과 변경후 type 이 다르다면 Tree 를 재생성

## 3. React 에서 리스트 구현시 나타나는 오류인 key prop 문제

문제발생하지 않는 리스트

- 자식노드가 맨뒤에 추가 될 때
```javascript
// before
<ul>
    <li>first</li>
    <li>second</li>
</ul>

// after
<ul>
    <li>first</li>
    <li>second</li>
    <li>third</li>
</ul>
```

문제발생하는 리스트

- 자식노드가 맨앞에 추가 될 때
- React 가 모든 요소가 변화했다고 인식하기 때문에 자식노드를 모두 재생성하게 됨.
```javascript
// before
<ul>
    <li>second</li>
    <li>first</li>
</ul>

// after
<ul>
    <li>third</li>
    <li>second</li>
    <li>first</li>
</ul>
```

이러한 문제를 해결하기 위해 React 에서는 Key prop 을 제공. 하지만 key Prop 을 배열의 index 로 주면 안됨. key prop은 변경되지 않는 유일한 값으로 해야한다.
새로운 리스트가 맨앞에 추가될때 value 값이 제대로 추가되지않는 문제가 발생.