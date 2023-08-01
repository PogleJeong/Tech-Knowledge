/*
    Facade(퍼사드) 패턴은 프랑스어에서 "건축물의 앞면"의 의미를 가지고 있다.
    건물앞면처럼 Client 에게는 간단한 interface 를제공

    하나의 단순화된 interface 를 통해서 시스템 안에 내포되어있는 기능들에 쉽게 접근할 수 있도록 도와준다.
    간단하고, 쉽게 다수의 sub class 또는 interface 등을 한 class 내에서 관리할 수 있도록 함
    코드 중복을 방지하고 유지보수가 쉬움.

    목적
    1. 간략화된 인터페이스.
    2. 직접적인 접근에 제약을 줌. (내부 동작이나 구조를 알 수 없음)

    예제로 햄버거가게에서 세트주문을 받는 키오스크가 facade 로 비유될 수 있음.
*/

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

// sub class 2
class FoodService {
    serve() {
        console.log("Order ready, serving food now");
    }
}

// client 에게 보여주는 interface
class RestaurantFacade {
    newOrder() {
        // sub system 으로 구성됨.
        const kitchen = new Kitchen();
        kitchen.cookBurger();
        kitchen.cookSide();
        kitchen.prepareDrinks();

        const foodService = new FoodService();
        return foodService.serve();
    }
}

// test
const facade = new RestaurantFacade();
facade.newOrder();