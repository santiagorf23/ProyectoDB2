# Documentación del Proyecto: Sistema de Gestión de Salas de Cine  
**Proyecto final Bases de datos II**

---

### **Asignatura**  
Electiva Bases de datos II - Bases de datos no relacionales.

**Docente:**  
Andres Felipe Ramirez Correa  

**Grupo conformado por:**  
👦🏻 **Juan Jose Valencia**  
Código: 1089598459  

🧒🏻 **Santiago Ramirez Flores**  
Código: 1004777657  

👩🏻 **Mariana Henao Bedoya**  
Código: 1004686093  

---

## **Objetivo del proyecto**  
Desarrollar un sistema de gestión de inventario y registro de usuarios para una sala de cine.

---

## **Alcance**  
Este sistema permitirá a los administradores gestionar eficientemente las películas, horarios, y asientos disponibles, mientras que los usuarios podrán registrarse, ver películas, comprar entradas y ver su historial de compras.

---

## **Requerimientos Funcionales**  
✅ El registro de usuarios, con detalles como nombre, correo electrónico, historial de compras, y preferencias de películas.  
✅ La gestión de inventario de películas, con datos como nombre, género, duración, horario de función, y disponibilidad de entradas.  
✅ La compra de entradas por parte de los usuarios, con la capacidad de consultar disponibilidad en tiempo real, realizar pagos y generar un recibo.  
✅ La actualización en tiempo real del inventario de asientos disponibles por película y función.  

---

## **Requerimientos no funcionales**  
✅ Seguridad: Proteger los datos de usuarios y transacciones.  
✅ Rendimiento: Consultas y actualizaciones en tiempo real.  
✅ Interactividad:  

---

## **Diseño del Sistema**  
### Modelo de bases de datos  
MongoDB será utilizado para almacenar documentos JSON que representen las entidades principales: usuarios, películas y transacciones.

### Arquitectura del Sistema  
El sistema sigue una arquitectura cliente-servidor:  
- **Frontend:** Aplicación web para los usuarios.  
- **Backend:** Javascript con el framework Vue.  
- **Base de Datos:** MongoDB para el almacenamiento de datos.  

---

## **Herramientas y Tecnologías Utilizadas**  
- **Lenguaje de programación:** Javascript.  
- **Framework de backend:** Vue.  
- **Base de datos:** MongoDB.  
- **Otros:** Visual Studio Code, GitHub, Cursor IA.  


This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
