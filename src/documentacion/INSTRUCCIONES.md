# Instrucciones de instalación, configuración y despliegue del proyecto ColorBakery. Stack Vue, Pinia, Laravel y despliegue con DockerCompose:


## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados los siguientes elementos:

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

## Pasos para el despliegue

1. Clona el repositorio del backend:

    ```bash
    git clone https://github.com/DeboraMed/proyecto-6-color-bakery-laravel backend
    ```

2. Clona el repositorio del frontend:

    ```bash
    git clone https://github.com/DeboraMed/proyecto-6-color-bakery.git frontend
    ```

3. Levanta los contenedores Docker:

    ```bash
    sudo docker compose up -d --build
    ```

4. Por último, ejecutaremos las migraciones de la base de datos, desde el contenedor del backend. Incluyendo "--seed" podemos generar datos de prueba. (Si es necesario, ajusta los nombres de los contenedores Docker según tu configuración.):

    ```bash
    sudo docker exec colorbakery-backend-1 php artisan migrate:fresh --seed
    ```

## Cómo probar la herramienta

1. Una vez que los contenedores están en ejecución, accede a la aplicación desde tu navegador web en la siguiente dirección:

    ```
    http://localhost:5173
    ```

2. Utiliza las siguientes credenciales para iniciar sesión como usuario:

    - Email: user@test.com
    - Contraseña: test_password

```yaml
services:

  # Servidor de Base de datos
  db:
    # Usamos la imagen de MariaDB
    image: mariadb
    #Establece variables de entorno para indicar base de datos, usuario y password
    volumes:
      # Guardamos la persistencia de la base de datos
      - ./db-data:/var/lib/mysql
    #ports: No es necesario exponer el puerto. El backend tiene visibilidad.
    #  - "3306:3306"
    environment:
      MARIADB_ROOT_PASSWORD: pestillo
      MARIADB_DATABASE: color-bakery
      
  # Servicio Backend
  backend:
    # Contruye la imagen desde un Dockerfile del Backend
    build: backend/.
    # Mapeamos nuestra aplicación 
    volumes:
      - ./backend:/app
    working_dir: /app
    # Variables de entorno
    environment:
      - COMPOSER_ALLOW_SUPERUSER=1
      - APP_ENV=docker
    # Instala composer, actualiza dependencias y ejecuta la aplicacion
    command: >
      sh -c "composer install &&
             php artisan serve --host=0.0.0.0 --port=8000"    
    # Exponemos el puerto para que nuestra maquina pueda encontrar el backend
    ports:
      - "8000:8000"
    # Definimos dependencia con el servicio de base de datos
    depends_on:
      - db
      
  # Servicio Frontend
  frontend:
    # Imagen de Node
    image: node:18
    # Mapeamos nuestra aplicación
    volumes:
      - ./frontend:/home/node/app
    working_dir: /home/node/app
    # Instala dependencias y ejecuta la aplicacion
    command: >
      sh -c "npm install &&
             npm run dev -- --host"
    # Exponemos el puerto para que nuestra maquina pueda encontrar el frontend
    ports:
      - "5173:5173"
    # Definimos dependencia con el servicio de backend
    depends_on:
      - backend      

````
