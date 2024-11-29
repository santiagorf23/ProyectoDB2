# 🎥 **Sistema de Gestión de Salas de Cine**  
**Proyecto Final Bases de Datos II**

---

## 📚 **Asignatura**  
**Electiva:** Bases de Datos II - Bases de Datos No Relacionales  
**Docente:** Andres Felipe Ramirez Correa  

---

## 👥 **Equipo del Proyecto**  
- 👦🏻 **Juan Jose Valencia**  
  Código: 1089598459  
- 🧒🏻 **Santiago Ramirez Flores**  
  Código: 1004777657  
- 👩🏻 **Mariana Henao Bedoya**  
  Código: 1004686093  

---

## 🎯 **Objetivo del Proyecto**  
Desarrollar un sistema de gestión de inventario y registro de usuarios para una sala de cine.  

---

## 🚀 **Alcance**  
Este sistema permitirá:  
🎬 A los **administradores** gestionar películas, horarios y asientos disponibles.  
🎟️ A los **usuarios** registrarse, consultar películas, comprar entradas y visualizar su historial de compras.  

---

## ✅ **Requerimientos Funcionales**  
1. 📋 Registro de usuarios con nombre, correo electrónico, historial de compras y preferencias.  
2. 🎞️ Gestión de inventario de películas:  
   - Nombre  
   - Género  
   - Duración  
   - Horarios  
   - Disponibilidad de entradas  
3. 💳 Compra de entradas con:  
   - Consulta de disponibilidad en tiempo real  
   - Realización de pagos  
   - Generación de recibos  
4. 🪑 Actualización en tiempo real del inventario de asientos por película y función.  

---

## 🔒 **Requerimientos No Funcionales**  
- 🔐 **Seguridad:** Proteger los datos de usuarios y transacciones.  
- ⚡ **Rendimiento:** Consultas y actualizaciones en tiempo real.  
- 🤝 **Interactividad:** Interfaces amigables para usuarios y administradores.  

---

## 🛠️ **Diseño del Sistema**  

### **Modelo de Base de Datos**  
MongoDB será utilizado para almacenar documentos JSON que representen las entidades principales:  
- 👤 **Usuarios**  
- 🎬 **Películas**  
- 🧾 **Transacciones**  

---

### **Arquitectura del Sistema**  
📡 **Cliente-Servidor**  
- 🌐 **Frontend:** Aplicación web interactiva.  
- 🖥️ **Backend:** Desarrollo en Javascript con el framework Vue.  
- 🗂️ **Base de Datos:** MongoDB para almacenamiento de datos no estructurados.  

---

## 🧰 **Herramientas y Tecnologías Utilizadas**  
- 🖋️ **Lenguaje de programación:** Javascript  
- ⚙️ **Framework de backend:** Vue  
- 🗃️ **Base de datos:** MongoDB  
- 🖥️ **Otros:** Visual Studio Code, GitHub, Cursor IA  

---

> **📌 Nota:** Este proyecto fue desarrollado como parte de la asignatura **Bases de Datos II**, destacando la importancia de sistemas no relacionales en aplicaciones modernas.


# 🚀 **Plantilla de Inicio con Vue 3 + Vite**

---

## 🛠️ **Configuración Recomendada del IDE**  
Para optimizar tu experiencia de desarrollo:  
- **Editor:** [VSCode](https://code.visualstudio.com/)  
- **Extensiones:**  
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (recomendado para proyectos Vue 3).  
  - **Desactiva Vetur** para evitar conflictos.  

---

## ⚙️ **Personalización de la Configuración**  
Para configuraciones avanzadas, consulta la [Referencia de Configuración de Vite](https://vite.dev/config/).  

---

## 📦 **Configuración del Proyecto**  

Sigue estos pasos para configurar y ejecutar el proyecto:  

1. **Instalar dependencias**  
   Ejecuta el siguiente comando para instalar todos los paquetes necesarios:  
   ```sh
   npm install

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

