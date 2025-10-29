# Pasos para correr el proyecto
## Backend:

Recuerda que para poder correr esto es necesario crear un entorno virtual:

```bash
python -m venv venv
venv\Scripts\activate
```

Instala los requerimientos:

```bash
pip install -r requirements.txt
```

Ve al proyecto:

```bash
cd adopta_amigo
```

Haz las migraciones:

```bash
python manage.py makemigrations
python manage.py migrate
```

Crea un usuario administrador:

```bash
python manage.py createsuperuser
```

Inicia el servidor:

```bash
python manage.py runserver
```

Accede al panel de administración en:

```
http://127.0.0.1:8000/admin/
```


## Frontend:

Ve a la carpeta de frontend:

```bash
cd frontend
```

instala los paquetes:

```bash
npm install
```

Corre el proyecto:

```bash
npm run dev
```
