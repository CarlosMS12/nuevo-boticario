1. Requerimientos Visuales (Archivos e Imágenes)

Antes de escribir código, asegúrate de tener estos 7 archivos en una carpeta listos para usar:

    1 Fondo: Imagen oscura de la habitación mágica (la "wide-angle" que generaste).

    5 Pociones: Imágenes PNG sin fondo (Chocolate, Filtro Paz, Felix Felicis, Espejo, Fuego).

    1 Pila de Cartas: Imagen PNG sin fondo de las cartas vintage.

    1 Favicon (Opcional): Un icono pequeño para la pestaña del navegador (puede ser una varita o poción).

2. Stack Tecnológico (La Estructura)

Solo instalaremos lo estrictamente necesario para que la web vuele.

    Core: React + Vite (Rápido y ligero).

    Estilos: Tailwind CSS (Para centrar todo sin sufrir con márgenes).

    Animaciones: Framer Motion (Para que las cartas aparezcan suavemente y las pociones floten).

    Backend: Supabase Client (Para conectar con la base de datos).

Comando de instalación único:
Bash

npm create vite@latest nuevo-boticario -- --template react
cd nuevo-boticario
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @supabase/supabase-js framer-motion

3. Requerimientos de Base de Datos (Supabase)

Necesitas exactamente 2 Tablas y 1 Bucket de almacenamiento.
A. Storage (Almacenamiento de Imágenes)

    Bucket Name: potions-images

    Configuración: Debe ser Public (Público).

    Acción: Sube ahí tus 5 imágenes de pociones y copia sus URLs públicas.

B. Tabla 1: potions (El Inventario)

Esta tabla controla qué frascos se muestran en la pantalla.
Columna Tipo Descripción
id int8 Llave primaria (Primary Key).
name text Nombre visible (ej: "Filtro de Paz").
image_url text La URL que copiaste del Storage.
color_hex text Color del brillo (ej: #00FFFF).
order int4 Número (1-5) para ordenarlas en la fila.
C. Tabla 2: magic_messages (Los Mensajes)

Esta tabla guarda las frases.
Columna Tipo Descripción
id int8 Llave primaria.
potion_id int8 Foreign Key (Relacionada a potions.id).
message text La frase bonita para ella.

⚠️ MUY IMPORTANTE: En ambas tablas, ve a la pestaña "Policies" y desactiva RLS (Row Level Security) o agrega una política que permita SELECT a "anon" (público). Si no haces esto, la app se verá vacía. 4. Requerimientos Funcionales (Lo que hará la App)

Diseñaremos una experiencia de "un solo camino" (Happy Path):

    Carga Inicial:

        La app carga el fondo oscuro.

        Consulta a Supabase la tabla potions.

        Muestra el título arriba, las 5 pociones alineadas en el centro y las cartas abajo.

    Interacción (El Click):

        El usuario hace clic en una poción.

        La app busca en Supabase un mensaje aleatorio que coincida con el ID de esa poción.

        (Mientras busca, puede mostrar un pequeño "Cargando magia...").

    El Resultado (El Modal):

        Aparece una tarjeta (Modal) sobre la pantalla (superpuesta).

        Fondo oscuro semitransparente detrás para resaltar la carta.

        Muestra la frase obtenida.

        Botón "X" o clic afuera para cerrar y volver a elegir.
