L2 : Data-Link Layer
======

# Contact

## [NIC](#1-NIC(Network-Interface-Card))

## [L2 Frame](#2-L2-Frame)

## [L2 Access Switch](#3-L2-Access-Switch)

## [L2 Distribution Switch](#4-L2-Distribution-Switch)

## [LAN, WAN, Broadcast](#5-LAN-WAN-Broadcast)


# 1. NIC(Network Interface Card)

__LAN Card__ 라고도 하며, MAC 주소를 가지고 있음.


# 2. L2 Frame

**L2(유선 Ethernet) 수준에서 Network 환경에서 유통되는 데이터 단위**로 약 1514 byte 이다.

일반 PC 에서 사용되는 NIC 는 1Gbps 속도를 가지며, 광케이블을 사용할 경우 최대 10Gbps 의 속도를 가질 수 있음.


# 3. L2 Access Switch

**End-point 와 직접 연결되는 스위치로 MAC 주소를 근거로 스위칭**

1. Link-Up : End-point 와 Access Switch의 물리적 연결 성공 (Green LED)
2. Link-Down : End-point 와 Access Switch의 물리적 연결 실패 (Orange LED)
3. Up-Link : 네트워크가 상위 Layer(L3)와 연결된 상태


# 4. L2 Distribution Switch

** L2 Access Switch 를 위한 Switch 로 VLAN(Virtual LAN) 기능을 제공.

여러개의 End-point 가 하나의 Access Switch 에 연결되어있고,
여러개의 Access Switch 가 하나의 Distribution Switch 에 연결되어 있으며,
Distribution Switch 는 하나의 L3Switch (Router) 에 연결되어있다.


# 5. LAN, WAN, Broadcast

## 5-1 LAN (Local Area Network)

근거리 통신망, Router 및 Switch 와 같은 Connector 를 사용하여 물리적으로 서로 가까운 디바이스를 연결. 데이터를 교환하고 소규모로 안전하게 통신가능.

## 5-2 WAN (Wide Area Network)

[AWS-LAN](https://aws.amazon.com/ko/compare/the-difference-between-lan-and-wan/)

사무실, 데이터 센터, 클라우드 애플리케이션 및 클라우드 스토리지를 서로 연결하는 기술, 특정지역이나 전 세계에 분산된 여러 위치까지도 포함하기 때문에 광역네트워크(WAN)라고도 함.

## 5-3 LAN vs WAN 

**[주요 차이점]**

|-|LAN|WAN|
|---|---|---|
|구성요소|LAN은 전송에 OSI 계층 1 및 계층 2 데이터 연결 장비를 사용|WAN은 데이터 전송에 계층 1, 2 및 3 네트워크 디바이스를 사용|
|연결|LAN은 이더넷 케이블 및 무선 액세스 포인트와 같은 로컬 연결을 사용|WAN은 MPLS, VPN, 임대 회선 및 클라우드와 같은 광역 연결을 사용|
|속도|LAN은 거리가 짧고 정체가 적기 때문에 더 빠름|WAN은 약간 더 느리지만 사용자가 이를 인식하지 못할 수 있음|
|사용사례|LAN은 프라이빗 IoT 네트워크, 봇 네트워크 및 소규모 비즈니스 네트워크에 적합|WAN은 재해 복구, 전 세계에 사용자가 있는 애플리케이션 및 대기업 네트워크에 적합|

## 5-4 Broadcast

송신 Host 가 전송한 데이터가 Network 에 연결된 모든 HOst 에 전송되는 방식.

Network의 모든 Host 에 전송되기 때문에 꼭 필요할때만 써야하는 제한적인 방법이다. 또한 하나의 PC 에서 Broadcast 를 하면 종료될때 까지 다른 PC 가 통신을 할 수 없기 때문에 사용에 신중해야한다.

Broadcast 는 MAC 주소와 IP 가 모두 존재한다. 
MAC 주소는 48bit 주소체계를 가지고 있는데 FF:FF:FF:FF:FF:FF 와 같은 MAC 주소는 Broadcast 이며, 모든 End-point 에서 데이터를 받게 된다.

** IP 기반 네트워크에서 bROADCAST 의 범위는 IP 주소상 어떤 범위가 정해졌을 때 그 범위안에서 이루어진다.