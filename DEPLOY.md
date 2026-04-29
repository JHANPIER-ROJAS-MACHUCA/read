# 🚀 Guía de Despliegue en Render + GitHub

## Estructura del proyecto
- `/` → Frontend React (se despliega como Static Site)
- `/backend` → API Node.js/Express (se despliega como Web Service)

## Paso 1: Subir a GitHub
1. Crear repositorio nuevo en github.com
2. Ejecutar en la carpeta del proyecto:
   ```
   git init
   git add .
   git commit -m "primer commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

## Paso 2: Desplegar el BACKEND en Render
1. Ir a render.com → New → Web Service
2. Conectar tu repositorio de GitHub
3. Configurar:
   - **Name:** mi-backend-crud
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Agregar las Variables de Entorno:
   | Variable | Valor |
   |----------|-------|
   | DB_HOST | aws-1-us-east-2.pooler.supabase.com |
   | DB_PORT | 5432 |
   | DB_NAME | postgres |
   | DB_USER | postgres.fepwhuevdtcjudxxzzjs |
   | DB_PASSWORD | TU_PASSWORD_REAL |
   | FRONTEND_URL | (poner luego la URL del frontend) |
5. Copiar la URL del backend: `https://mi-backend-crud.onrender.com`

## Paso 3: Desplegar el FRONTEND en Render
1. Ir a render.com → New → Static Site
2. Conectar el mismo repositorio
3. Configurar:
   - **Name:** mi-frontend-crud
   - **Root Directory:** (dejar vacío)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Agregar Variable de Entorno:
   | Variable | Valor |
   |----------|-------|
   | REACT_APP_API_URL | https://mi-backend-crud.onrender.com |
5. Volver al backend en Render → Environment → agregar FRONTEND_URL con la URL del frontend

## ⚠️ Notas importantes
- El plan gratuito de Render pone los servicios a "dormir" tras 15 min de inactividad
- La primera petición puede tardar ~30 segundos en despertar el backend
- NUNCA subas el .env con contraseñas a GitHub
