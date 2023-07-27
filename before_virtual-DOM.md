브라우저 렌더링 과정
======

# 1. DOM Tree 생성

- 개발자가 작성한 HTML 을 브라우저가 전달받음.
- 브라우저 엔진이 HTML 을 parsing 
- DOM Node 로 이루어진 DOM Tree 를 생성

# 2. Render Tree 생성

- CSS 파일과 inline style을 parsing 하여 스타일 정보를 추가
- Render Tree 생성

# 3. Layout

- 각 node 들은 screen 의 좌표가 주어지고 정학한 위치가 정해짐

# 4. Painting

- 앞의 과정에서 얻을 수 있는 정보들을 통해 모든 element 들에 색을 입힘.
- 화면에 UI Render 됨.


DOM 조작의 비효율성
======
DOM을 조작할 때마다 HTML, CSS Parsing 과 painting 과정 모두를 진행하기 때문에
많은 연산을 수반하기 때문에 성능저하의 문제가 생김.

이전에는 Server Side Rendering 을 통해 서버에서 데이터와 함께 페이지를 Render 해주는 방식을 택했고, 이전에는 동적페이지보다 정적페이지가 많이 사용되었기 때문에 DOM 의 동적인 변화가 큰 문제가 되지 않았음.

하지만 최근에는 Client Side Rendering 방식이 많이 사용되면서 DOM 의 변화가 자주발생하는 웹이나 애플리케이션이 많아지게 되었다.
직접적인 DOM 조작을 통해 화면을 Rendering 하는 방식은 비효율적이기에, 이러한 문제를 해결하여 최적화를 시키기 위한 해결책이 대두되었다.

이러한 해결책에서 나온 것이 Virtual DOM