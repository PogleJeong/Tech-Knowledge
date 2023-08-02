>Design Pattern
>>Creational 
>>> Factory Pattern

<hr/>

## 1. 구조 및 설명

### 1. 구조 및 특징

    - 새로운 객체를 생성(위임)하고 반환(return)
    - 속성, 매개함수를 공유하는 다른 타입의 객체를 생성
    - 하나의 인터페이스를 통해서 서로 다른 여러종류의 객체들을 생성
    - 동적환경에 최적화된 패턴
    - 하나의 api 를 통해, 같은 데이터를 반복적으로 사용해야할 때 자주 사용됨.

### 2. 대표예시

    - 신발공장

    클래스 객체의 생성처리를 Factory interface(Factory class)를 통해서 위임하여 처리한다.
    
    Factory class 는 조건 logic 필요, 조건 logic 에 따라 어떤 객체를 생성할 것인지 결정
        
### 3. 흐름

    1. Factory 인스턴스 생성
    2. Factory 객체안의 method 에 data 전달 (factory.create(data))
    3. Factory method 안의 조건 logic 에 따라 맞는 객체를 생성

### 4. 장점

    - class 간 의존도가 낮아, 확장이 쉽고 유지보수가 용이하다.

<hr/>

## 2. Code

### Class and interface
    ```js
    class Shoe {
        constructor(attrs) {
            this._attrs = attrs || {};
        }
        getName() {
            return this._attrs?.name;
        }
        getSize() {
            return this._attrs?.size;
        }
        getBrand() {
            return this.constructor.name;
        }
    }

    class Nike extends Shoe {}
    class Puma extends Shoe {}
    class Adidas extends Shoe {}
    ```

### Factory class(interface)

**조건 Logic 담당**

**데이터에 type** 을 보고 Factory class 에서 해당 type 에 따라 어떤 클래스의 인스턴스를 생성할지 결정.

    ```js
    class ShoeFactory {
        typeMap = {
            nike: Nike,
            puma: Puma,
            adidas: Adidas,
        };
        create(props) { // 객체생성 담당
            try {
                const Brand = this.typeMap[props?.type?.toLowerCase()];
                return new Brand(props.attrs);
            } catch (e) {
                console.error("error creating new shoes", e);
            }
        }
    }
    ```

<hr/>

### Test

    ```js
    // test data
    const data = [
        {type: "Nike", attrs: { name: "SB", size: 300} },
        {type: "Nike", attrs: { name: "Airforce", size: 240} },
        {type: "Puma", attrs: { name: "Jada", size: 270} },
        {type: "Nike", attrs: { name: "Cortez", size: 265} },
        {type: "Adidas", attrs: { name: "Sputer Star", size: 290} },
    ]

    const factory = new ShoeFactory();
    const items = data.map((item)=> factory.create(item));
    ```