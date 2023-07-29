OSI 7Layer
======

# contact

## [OSI 7Layer 간단하게 알아보기](#1-osi-7layer)

## [식별자](#2-식별자)

## [Host 란](#3-Host)

## [Switch 란](#4-Switch)
======

# 1. OSI-7Layer

```html
<table>
    <thead>
        <tr>
            <th>-<th>
            <th>-<th>
            <th>-<th>
            <th>DOD분류</th>
            <th>OSI 7Layer</th>
            <th>실제</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=5>S/W</td>
            <td rowspan=3>User mode</td>
            <td rowspan=3>Application</td>
            <td>응용계층 (HTTP)</td>
            <td rowspan=3>Chrome</td>
        </tr>
        <tr>
            <td>세션계층 (SSL/TLS)</td>
        </tr>
        <tr>
            <td rowspan=4>Kernel node</td>
            <td>Host to Host</td>
            <td>전송계층 (TCP/UDP)</td>
            <td>TCP/UDP</td>
        </tr>
        <tr>
            <td>Internet</td>
            <td>네트워크계층 (Internet)</td>
            <td>Driver</td>
        </tr>
        <tr>
            <td rowspan=2>H/W</td>
            <td>Network</td>
            <td>데이터링크 (Ethernet)</td>
            <td rowspan=2>NIC card</td>
        </tr>
        <tr>
            <td>Network</td>
            <td>데이터링크 (Ethernet)</td>
        </tr>
    </tbody>
</table>
```


# 2. 식별자

L2, L3, L4에 총 3가지의 식별자가 존재한다.

- L2 (데이터링크계층) : MAC 주소 > NIC Card 식별(랜카드) : 48bit, 16진수

- L3 (네트워크계층) : IP 주소 > Host 에 대한 식별 : 32bit, 10진수 단위 끊어 표기

- L4 (전송계층) : Port 번호  : 16bit

** Port 번호에 대한 다른 명칭들 interface (L2), service (L3), Process(S/W)


# 3. Host 

Computer + Network = Host > __Internet 에 연결된 컴퓨터__

Switch : Network 자체를 이루는 Host
    - Client
    - Server
    - Peer 등

Endpoint : 단말, 클라이언트나 서버 등 Host 의 이용주체 
    - Router
    - IPS
    - Tab
    - Aggre 등


# 4. Switch (L2)

## 1. Switch 의 업무

Network 에서 Switch 가 하는 일은 실제 도로망으로 비유하면 간단하게 이해할 수 있다.

* Network : 도로망
* Switch(Router) : 교차로
* Package : 자동차

## 2. Switch 의 비용

Metric : Router(Switch) 가 최적의 경로를 결정하는 기준값.

Network 에서 이동을 하면 비용이 발생하므로, Network 이동량이 커지면 비용을 고려하게 되고, 비용에 대한 하나의 주제로써 Metric 이 있다. Router 는 가장 적은 Metric 값을 갖는 경로를 찾게한다.


[정보통신기술용어해설](http://www.ktword.co.kr/test/view/view.php?m_temp1=1919)
[Network-Metric](https://onduway.tistory.com/3)