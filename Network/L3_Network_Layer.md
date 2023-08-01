L3 : Network Layer
======

# Contact

## [IPv4](#1-IPv4-기본구조))

## [L3 Packet](#2-L3-Packet)

## [Encapsulation and Decapsualation](#3-Encapsulation-and-Decapsualation)

## [Packet 의 생성, 전달, 소멸](#4-Packet의-생성-전달-소멸)

## [계층별 데이터 단위](#5-계층별-데이터-단위)

# 1. IPv4 기본구조

network 계층에서의 IPv4 주소는 32ibt(8bit * 4) 주소쳬게를 가지며, 0.0.0.0 ~ 255.255.255.255 의 주소를 가진다.


[IP configuration]

대부분의 사설 공유기(ip time 등) 은 192.168.0.10 주소를 가진다.

IP 주소는 Network ID 와 Host ID 로 분류할 수 있다.

앞의 8bit * 3 은 Network ID (192.168.0) 
뒤의 8bit * 1 은 Host ID (10)

이는 택배주문으로 비유할 수 있다.
Network ID 가 지역의 물류센터고, Host 가 택배도착지(집)이다.


# 2. L3 Packet

**Packet 은 단위 데이터로**, 보통 Packet 이라 함은 L3 IP Packet 을 의미한다.
Packet은 **Header 와 Payload 로 나뉘는데** 상대적인 분류로 나뉜다.

Packet 의 최대 크기는 MTU(Maxium Transmission Unit) 이다. 보통 1500 Byte 이다.

* MTU : 네트워크에 연결된 장치가 받아들일 수 있는 최대 데이터 패킷 크기

택배로 비유한다면 Header 는 택배송장, Payload 는 택배내용물이다.


# 3. Encapsulation and Decapsualation

**Encapsulation**

캡슐화가 되었다는 것은 어떤 __단위화__ 되었다는 것


L2 Frame 의 Header, Payload 에서 

L2 Frame 의 Payload 안에 L3 IP Packet 이 있고

L3 IP Packet 의 Header, Payload 에서

L3 IP Packet 의 Payload 안에 L4 의 TCP Segment 가 있고 ...

어떤 계층의 데이터단위를 payload 로 감싸고, 그 감싼 계층의 데이터 단위를 payload 로 감싸고 하는 포장안에 포장이 있는, 마트료시카의 구조로 이해하면 된다.


# 4. Packet의 생성, 전달, 소멸

두가지 관점에서 보기

1. 택배 관점 : 철수가 영희에게 서적을 택배로 보내려고한다.

철수, 영희 = Process
서적 = 데이터
서적을 택배상자에 포장하고 송장 붙이기 = Packet 화
택배기사 = Gateway
택배운송 = Routing
출발지 및 목적지 = Host
택배송장에 붙어있는 받는사람 이름 = Port 번호


2. OSI Layer 관점 : 어떤 Process 가 인터넷을 통해 정보를 전달하려고함

*socket : file 의 일종, User mode 의 Process 가 kernel mode protocol에 접근할 수 있도록 추상화한 interface

Data 가 Process 에서 socket 을 거침 TCP 를 만남
TCP 가 Data 에 TCP Header 를 추가하여 Segment 로 포장하고 IP 를 만남
IP 가 Segment 에 IP Header 를 추가하여 Packet 으로 포장. Driver 를 만남.
Driver 가 Packet 에 Ethernet Header 를 추가하여 Frame 으로 포장

L2 Access Switch 를 타고, Router 로 이동, Router 를 통해 internet 으로 보내진다.


# 5. 계층별 데이터 단위

[User mode] - App

Process
|Socket|**Stream**|단위라기보다는 데이터덩어리|

[Kernel mode] - OS

|TCP|**Segment**|최대단위 Maximum Segment Size(MSS)-1460Byte|
|IP|**Packet**|최대단위 Maximum Transmission Unit(MTU)-1500Byte|
|L1 ~ L2| **Frame**|-|
