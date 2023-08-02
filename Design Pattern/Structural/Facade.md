>Design Pattern
>>Structural 
>>> Facade Pattern

<hr/>

## 1. 구조 및 설명

### 1. 구조 및 특징

    > Facade(퍼사드) 패턴은 프랑스어에서 "건축물의 앞면"의 의미를 가지고 있다. 건물앞면처럼 Client 에게는 간단한 interface 를제공

    - 하나의 단순화된 interface 를 통해서 시스템 안에 내포되어있는 기능들에 쉽게 접근할 수 있도록 도와준다.
    
    1. 간략화된 인터페이스.
    2. 직접적인 접근에 제약을 줌. (내부 동작이나 구조를 알 수 없음)

### 2. 대표사례
    
    햄버거가게 세트주문을 과정 facade pattern로 비유될 수 있음.
    
    1. 키오스크에서 햄버거세트메뉴 주문 (Facade interface)
    2. 주문받고 주방에서 햄버거, 감자튀김, 음료를 준비
    3. 조리완료 후 카운터에서 손님에게 알림
    
    손님은 키오스크에서 메뉴하나 주문한 것으로 주방, 카운터 등 여러기능을 한번에 진행시킬 수 있음.

### 3. 흐름

    1. client 가 Facade interface 를 통해 요청전달
    2. Facade interface 의 method 를 통해 여러 sub class 들의 인스턴스를 생성하고, 각 정의되어있는 기능들을 진행
    3. 여러 sub class 의 인스턴스들을 사용하여 진행한 결과를 client 에게 결과를 전달

### 4. 장점

    - 간단하고, 쉽게 다수의 sub class 또는 interface 등을 한 class 내에서 관리할 수 있도록 함
    - 코드 중복을 방지하고 유지보수가 쉬움.

<hr/>

## 2. Code

### sub class 1 : 주방
```js
// sub class 1
class Kitchen {
    cookBurger() {
        console.log("cooking burger");
    }
    cookSide() {
        console.log("coolimg side dishes");
    }
    prepareDrinks() {
        console.log("preparing drinks");
    }
}
```

### 2. sub class 2 : 카운터
```js
// sub class 2
class FoodService {
    serve() {
        console.log("Order ready, serving food now");
    }
}
```

### 3. Facade class : 키오스크 주문
```js
// client 에게 보여주는 interface
class RestaurantFacade {
    newOrder() {
        // sub class 1 인스턴스 생성.
        const kitchen = new Kitchen();
        kitchen.cookBurger();
        kitchen.cookSide();
        kitchen.prepareDrinks();

        // sub class 2 인스턴스 생성.
        const foodService = new FoodService();
        return foodService.serve(); // client 에 결과전달
    }
}
```

<hr/>

### 4. Test
```js
const facade = new RestaurantFacade();
facade.newOrder();
```