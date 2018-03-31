# Arquitectura
_Jorge Pinilla López_

_29/03/2018_

Descripción de los puertos utilizados y las IPS de las máquinas

Para connectarse es necesario estar dentro de la red de unizar (mediante Cisco OpenConnect (Windows) o Openvpn(linux))

Para connectarse, connectarse directamente al host kira y al puerto deseado
## IPs y Puertos
| Maquina  | IP(NAT)        | Puerto SSH | SERVICIO Puerto      |
| -------- | -------------- | ---------- | -------------------- |
| ceph01   | 192.168.200.10 | 2000       | RGW 7480             |
| ceph02   | 192.168.200.11 | 2001       | RGW 7480             |
| ceph03   | 192.168.200.12 | 2002       | RGW 7480             |
| proxmox  | 192.168.200.20 | X          | WEB X(8006)          |
| backend  | 192.168.200.16 | 2006       | HTTP 7800 HTTPS 7880 |
| postgres | 192.168.200.17 | 2007       | POSTGRES 7850        |
## Esquema de virtualización
  - ceph01
  - ceph02
  - ceph03
  - proxmox
      - backend
      - postgres
