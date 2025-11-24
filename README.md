# Sistema Distribuido – Proyecto Unidad 3

Este repositorio contiene la implementación completa del proyecto de **Sistemas Distribuidos**, correspondiente a la Unidad 3.  
Incluye:

- Tres aplicaciones independientes  
- Un middleware central (API Gateway)  
- Réplicas de aplicación en modo acotado  
- Comunicación mediante API REST  
- Contenedores Docker para cada servicio  
- Pruebas de tolerancia a fallos  

El objetivo del proyecto es demostrar **tolerancia a fallos**, **transparencia hacia el usuario**, **independencia tecnológica**, y **alta disponibilidad parcial** mediante réplicas.

---

## 🚀 Arquitectura General

La arquitectura está compuesta por:

- **App1 – Gestión de Clientes (Python/Flask)**
- **App2 – Órdenes (Node.js)**
- **App3 – Reportes (Node.js)**
- **Middleware – API Gateway (Node.js)**
- **Réplicas:**
  - app1_replica (solo lectura)
  - app2_replica (solo lectura)

### Diagrama general

- Pendiente


---

## 🧱 Tecnologías utilizadas

| Componente | Tecnología |
|-----------|------------|
| App1 | Python, Flask |
| App2 | Node.js, Express |
| App3 | Node.js, Axios |
| Middleware | Node.js (API Gateway) |
| Contenedores | Docker, Docker Compose |
| Comunicación | HTTP/REST |
| Réplicas | Containers simulados (modo lectura) |

---

## 📦 Estructura del Proyecto

    Sistema-distribuido-3/
    │
    ├── app1_clientes/
    │ ├── main.py
    │ ├── requirements.txt
    │ └── Dockerfile
    │
    ├── app1_replica/
    │ ├── main.py
    │ ├── requirements.txt
    │ └── Dockerfile
    │
    ├── app2_ordenes/
    │ ├── index.js
    │ ├── package.json
    │ └── Dockerfile
    │
    ├── app2_replica/
    │ ├── index.js
    │ ├── package.json
    │ └── Dockerfile
    │
    ├── app3_reportes/
    │ ├── index.js
    │ ├── package.json
    │ └── Dockerfile
    │
    ├── middleware/
    │ ├── index.js
    │ ├── package.json
    │ └── Dockerfile
    │
    └── docker-compose.yml


---


