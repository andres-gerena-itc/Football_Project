# ⚽ Inteligencia de Datos en Fútbol – UEFA Champions League

> **Proyecto Final – Bases de Datos III**  
> Universidad ESCUELA TECNOLÓGICA INSTITUTO TÉCNICO CENTRAL 
> Junio 2025  

---

## 📌 Descripción del Proyecto

Este sistema analiza datos reales de partidos de la UEFA Champions League utilizando herramientas modernas de inteligencia de datos. Abarca:

- Extracción desde una API pública.
- Almacenamiento en MongoDB.
- Visualización interactiva de KPIs.
- Modelo predictivo básico.
- Interfaz web con control de acceso por roles.

---

## 🛠 Tecnologías Utilizadas

**Frontend**: React + Vite  
**Backend**: Django + Django REST Framework  
**ETL**: Python (Requests, PyMongo, Pandas)  
**Base de Datos**: SQLITE
**Visualización**: Plotly / Dash  
**Seguridad**: JWT (Json Web Tokens)  
**Despliegue**: VPS Ubuntu + Gunicorn + Nginx  

---

## 🗂 Estructura del Proyecto

├── backend/ # API REST con Django

├── frontend/ # Interfaz en React

├── docs/ # Imágenes y documentación adicional

└── README.md # Este archivo


-------------------------------------------------------------

## 🌐 Enlace Público

🔗 [http://3.131.123.55:5173/login](http://3.131.123.55:5173/login)  

---

## 🔑 Credenciales de Prueba

- **Administrador**: andres / admin
- **Analista**: Fabian_analista / analista
- **Usuario básico**: Camila_Invitada / invitada 

---

## ⚙ Instalación Local

### Backend (Django)

```bash
cd backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### Frontend (React)

```bash
cd frontend/
npm install
npm run dev
```
Ejecutar el ETL
```bash
cd etl/
python etl_pipeline.py
```

## 📊 Dashboard Interactivo

Visualización de métricas clave como:

- Goles anotados y recibidos  
- Eficiencia ofensiva  
- Promedio de goles por partido  

![image](https://github.com/user-attachments/assets/f4b37e28-5254-4733-a3b0-1514188442a0)


---

## 🔁 Visualización de Grafo

Representa relaciones entre equipos, fases y resultados. KPIs derivados:

- Diferencia de goles  
- Participación ofensiva  
- Conectividad entre equipos  

![image](https://github.com/user-attachments/assets/9566e14d-c959-4222-b387-0642129caf77)


---

## 🤖 Modelo Predictivo

Se entrena un modelo de regresión lineal para predecir resultados con base en variables como:

- Goles marcados  
- Posesión  
- Historial reciente  

![image](https://github.com/user-attachments/assets/c201c1a3-9ec7-4b78-bad2-d0ada240382b)

---

## 🔐 Seguridad y Roles

- Autenticación con JWT  
- Control de acceso por perfil  
- Roles diferenciados: Administrador, Analista, Usuario básico  

![image](https://github.com/user-attachments/assets/de729f87-5ab4-403f-8c91-6fea4405cac0)

---

## ☁ Despliegue

Sistema desplegado en servidor VPS Ubuntu 22.04 con:

- Gunicorn + Nginx  
- SQLITE como motor persistente  
- PM2 para gestión de procesos  

![image](https://github.com/user-attachments/assets/1cc0a567-b4cf-48d1-866d-d07dadde74af)

---

## 👥 Equipo de Trabajo

- **Felipe Gerena** – Líder del proyecto y documentación  
- **Camila Mosquera** – Desarrollo frontend y analítica  
- **Fabián Suárez** – Backend, ETL y despliegue  

