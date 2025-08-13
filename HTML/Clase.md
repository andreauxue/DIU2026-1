

# 1) ¿Qué es HTML? (Definición general)
HTML (HyperText Markup Language) es un lenguaje de marcado usado para estructurar el contenido de las páginas web.
No es un lenguaje de programación: no realiza cálculos ni tiene lógica de control, sino que describe la información para que el navegador sepa qué es cada cosa.



# 3) Cómo funciona HTML en el navegador
Aunque a veces se diga “compilar HTML”, en realidad el proceso es interpretación y renderizado, no compilación como en C++ o Java.
Flujo simplificado:

Petición HTTP
El navegador envía una solicitud al servidor pidiendo un archivo .html.
Recepción del HTML
El servidor devuelve el documento HTML como texto plano.
Parseo (análisis)
El parser HTML lee el texto de arriba hacia abajo y lo convierte en un árbol DOM (Document Object Model).
Si el HTML tiene errores, el parser intenta “corregirlos” (los navegadores son muy tolerantes).
Carga de recursos externos
Mientras parsea, el navegador encuentra referencias a CSS, JS, imágenes, etc. y los descarga en paralelo.
Aplicación de estilos
El motor CSS analiza los estilos y los aplica al DOM para generar el Render Tree (árbol visual).
Layout y render
El navegador calcula el tamaño y posición de cada elemento.
Finalmente, dibuja en la pantalla (rasterizado).

HTML → Parser → DOM
CSS  → Parser → CSSOM
DOM + CSSOM → Render Tree → Layout → Pintado (paint)


# 2) Historia de HTML (ampliada y útil)

| Año        | Versión              | Claves                                                                                                  |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------------- |
| 1991       | HTML 1.0             | Estructura básica de documentos. Nada de estilos ni scripts.                                            |
| 1995       | HTML 2.0             | Formularios, tablas; ya se podía enviar datos.                                                          |
| 1997       | HTML 4.0/4.01        | Separación contenido/presentación (se impulsa CSS). Aparecen atributos en desuso hoy (`bgcolor`, etc.). |
| 1999       | XHTML 1.0            | Sintaxis estricta basada en XML (autocierre, minúsculas).                                               |
| 2008       | HTML5 (borrador)     | Nace el enfoque **semántico** moderno: `<header>`, `<nav>`, `<main>`, `<article>`, multimedia, APIs.    |
| 2014 → hoy | HTML Living Standard | Evolución continua (WHATWG). El estándar se **actualiza** sin “versionazos” cerrados.                   |

**Idea clave:** HTML5 marcó un hito al dar **significado** al contenido. Eso beneficia a:

* Usuarios (mejor comprensión y navegación),
* Lectores de pantalla (accesibilidad),
* Motores de búsqueda (SEO),
* Y a ti cuando mantienes el código.

---


# 2) Definición de HTML semántico
HTML semántico es escribir HTML usando etiquetas que describan el significado del contenido, no solo su apariencia.
En vez de usar <div> o <span> para todo, se utilizan etiquetas como <header>, <article>, <nav>, <section>, etc.
Esto mejora:
Accesibilidad: lectores de pantalla entienden mejor la página.
SEO: buscadores interpretan mejor el contenido.
Mantenibilidad: otros desarrolladores leen el código más fácil.


* **No semántico:** `<div>` y `<span>` (genéricos).
* **Semántico:** `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, etc.

### Ejemplo mínimo

```html
<!-- ❌ No semántico -->
<div id="menu">Inicio</div>

<!-- ✅ Semántico -->
<nav>Inicio</nav>
```

### Landmarks (puntos de referencia)

Son áreas grandes de la página que ayudan a lectores de pantalla y a saltar por zonas:

* `<header>`: cabecera del sitio o de una sección.
* `<nav>`: navegación principal o secundaria.
* `<main>`: contenido **principal** (1 por página).
* `<aside>`: información relacionada o secundaria.
* `<footer>`: pie del sitio o de una sección.

> Tip: Evita duplicar landmarks innecesariamente. Por ejemplo, solo **un** `<main>` por documento.

---

# 4) ¿Cuándo usar cada etiqueta?

Piensa en **clave de propósito**:

* `<section>`: agrupa contenidos **relacionados por tema** dentro del documento. Suele llevar un **encabezado** (`<h2>`, `<h3>`, …).
* `<article>`: bloque **independiente** y reutilizable (post, tarjeta de producto, noticia) que tiene sentido por sí mismo.
* `<div>`: última opción cuando **ninguna** etiqueta semántica aplica (sirve para “envolver” con fines de layout o hooks de JS).
* `<aside>`: datos contextuales, promos, biografía corta, enlaces relacionados.
* `<header>`/`<footer>`: cabecera/pie del **sitio** o de una **sección/artículo**. Puedes tener varios (uno por sección/artículo).
* `<nav>`: grupos de enlaces de navegación (principal o internos).
* `<figure>` + `<figcaption>`: imágenes/medios **con leyenda**.
* `<main>`: el contenido único principal (solo uno).

**Regla de oro:** si quitas estilos, ¿el documento “se entiende”? Si la respuesta es sí, vas bien.

---

# 5) Estructura base semántica (con comentarios)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <!-- Hace que el sitio sea “responsive” en móviles -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mi sitio semántico</title>
</head>
<body>
  <!-- HEADER del sitio (branding + navegación principal) -->
  <header>
    <h1>Adopta un Amigo</h1>
    <nav aria-label="Navegación principal">
      <ul>
        <li><a href="#adopciones">Adopciones</a></li>
        <li><a href="#historias">Historias</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenido principal único -->
  <main id="contenido">
    <!-- SECTION: bloque temático -->
    <section id="adopciones" aria-labelledby="sec-adopciones">
      <h2 id="sec-adopciones">Animales en adopción</h2>

      <!-- ARTICLE: cada tarjeta es independiente -->
      <article>
        <header>
          <h3>Luna</h3>
        </header>

        <!-- FIGURE: imagen con leyenda -->
        <figure>
          <img src="luna.jpg" alt="Perrita mestiza color café llamada Luna" />
          <figcaption>Luna, 3 años, muy juguetona.</figcaption>
        </figure>

        <p>Convive bien con niños y otros perros.</p>

        <!-- DATOS especiales -->
        <p>Vacunada: <mark>Sí</mark></p>
        <p>Última revisión: <time datetime="2025-07-15">15 julio 2025</time></p>

        <footer>
          <a href="#contacto">Quiero adoptarla</a>
        </footer>
      </article>
    </section>

    <aside aria-label="Información adicional">
      <h2>Requisitos de adopción</h2>
      <ul>
        <li>Identificación oficial</li>
        <li>Compromiso de esterilización</li>
      </ul>
    </aside>
  </main>

  <!-- FOOTER del sitio -->
  <footer>
    <!-- ADDRESS: datos de contacto (de la organización, no del autor del artículo) -->
    <address>
      <p>Contacto: <a href="mailto:info@adopta.mx">info@adopta.mx</a></p>
      <p>CDMX, México</p>
    </address>
    <small>© 2025 Adopta un Amigo</small>
  </footer>
</body>
</html>
```

**Por qué es correcto:**

* Landmarks claros: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.
* `<article>` independiente (una tarjeta que podrías extraer).
* `<figure>` con `<figcaption>` describe la imagen.
* `<time>` agrega valor semántico con `datetime`.
* `<address>` para contacto de la **organización** (no es para cualquier dirección postal genérica).

---

# 6) Encabezados y “outline” (jerarquía correcta)

* Solo un `<h1>` para el **título principal de la página** (recomendado).
* Luego, subsecciones con `<h2>`, `<h3>`, … en orden **sin saltos caprichosos**.
* Cada `<section>` y `<article>` debería tener un título (encabezado).

**Anti‑patrón:** usar `<h1>` muchas veces para estilos. **Solución:** usa CSS para estilos y respeta la jerarquía.

---

# 7) Semántica útil menos conocida

* `<abbr title="…">`: abreviaturas (mejor accesibilidad y SEO).
* `<dfn>`: término que se está definiendo.
* `<kbd>`, `<samp>`, `<code>`: contenido técnico / de consola.
* `<blockquote>` (con `cite`) y `<q>`: citas largas y cortas.
* `<dl>`, `<dt>`, `<dd>`: listas de definiciones (glosarios, pares pregunta-respuesta).
* `<details>` + `<summary>`: acordeón **nativo** accesible (sin JS).
* `<data value="…">`: vincular un valor de máquina a un texto humano.

---

# 8) Formularios semánticos y accesibles

### Reglas de oro

* **Siempre** usa `<label for="id">` y asigna `id` único al `<input>`.
* Agrupa campos relacionados con `<fieldset>` y titúlalos con `<legend>`.
* Usa tipos HTML5: `email`, `tel`, `url`, `date`, `number`, etc.
* Ayudas accesibles: `aria-describedby` apuntando a mensajes de ayuda/errores.

### Ejemplo comentado

```html
<form action="/enviar" method="post">
  <!-- Título del grupo -->
  <fieldset>
    <legend>Contacto</legend>

    <div>
      <label for="nombre">Nombre</label>
      <input id="nombre" name="nombre" type="text" placeholder="Tu nombre completo" required />
    </div>

    <div>
      <label for="correo">Correo</label>
      <input id="correo" name="correo" type="email" placeholder="tucorreo@ejemplo.com" required />
      <small id="ayuda-correo">Usaremos tu correo solo para responderte.</small>
    </div>

    <div>
      <label for="mensaje">Mensaje</label>
      <textarea id="mensaje" name="mensaje" rows="5" aria-describedby="ayuda-correo"></textarea>
    </div>

    <button type="submit">Enviar</button>
  </fieldset>
</form>
```

---

# 9) Accesibilidad (A11y) y ARIA: cuándo sí / cuándo no

* **Primero HTML semántico**: la mayoría de roles ARIA ya están **implícitos**.
* Evita `role="navigation"` en `<nav>` (ya lo tiene).
* Usa `aria-label` o `aria-labelledby` cuando necesites **desambiguar** (p. ej., dos `<nav>` distintos).
* `aria-live` útil para mensajes dinámicos.
* **No abuses** de ARIA si el elemento nativo ya lo resuelve.

---

# 10) SEO y datos enriquecidos (visión rápida)

* Encabezados bien jerarquizados y contenido relevante.
* Usa `<title>` y `<meta name="description">`.
* Para datos estructurados: **JSON-LD** (schema.org) en `<script type="application/ld+json">`.
* No confundir: **microdata** y **RDFa** existen, pero JSON-LD es el enfoque más moderno.

---

# 11) Errores comunes (y cómo evitarlos)

* **Divitis:** abusar de `<div>` para todo.
* Landmarks repetidos sin sentido (varios `<main>`).
* Encabezados en desorden (`<h1>`, luego `<h4>`).
* Usar semántica por “estética” (p. ej., `<h1>` porque es grande).
* Imágenes sin `alt` descriptivo.
* Formularios sin `<label>`.

---

# 12) Ejercicio guiado (versión extendida)

**Objetivo:** construir una **tarjeta de perfil** realmente semántica, con imagen, datos y formulario de contacto.
Iremos por partes. Copia y pega en un archivo: `perfil.html`.

## 12.1 Estructura base + encabezados

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tarjeta de Perfil — HTML semántico</title>
  <meta name="description" content="Tarjeta de perfil accesible y semántica para práctica de HTML5." />
</head>
<body>
  <header>
    <h1>Perfil de Usuario</h1>
    <nav aria-label="Atajos de la página">
      <a href="#perfil">Perfil</a>
      <a href="#contacto">Contacto</a>
    </nav>
  </header>

  <main id="perfil">
    <!-- Aquí añadiremos el artículo -->
  </main>

  <footer>
    <small>© 2025 Adopta un Amigo</small>
  </footer>
</body>
</html>
```

## 12.2 Tarjeta como `<article>` con `<figure>`

```html
<article aria-labelledby="nombre-usuario">
  <header>
    <h2 id="nombre-usuario">Andrea Amaya</h2>
    <p>Diseñadora de interfaces y amante de los gatos.</p>
  </header>

  <figure>
    <!-- alt describe lo relevante para quien no ve la imagen -->
    <img src="andrea.jpg" alt="Retrato de Andrea Amaya sonriendo" width="320" height="320" />
    <figcaption>Foto de perfil actualizada en <time datetime="2025-08-01">agosto de 2025</time>.</figcaption>
  </figure>

  <section aria-labelledby="info-contacto">
    <h3 id="info-contacto">Información de contacto</h3>
    <!-- address: datos de contacto de la persona -->
    <address>
      <p>Correo: <a href="mailto:andrea@email.com">
        andrea@email.com</a></p>
      <p>Ciudad de México, MX</p>
    </address>
  </section>

  <footer>
    <p><small>Última actualización: <time datetime="2025-08-12">12 de agosto de 2025</time></small></p>
  </footer>
</article>
```

> Explicación rápida:
>
> * `<article>` porque la tarjeta tiene sentido en cualquier contexto.
> * `<figure>` + `<figcaption>` para la imagen con descripción contextual.
> * `<address>` porque son datos de contacto **de la persona**.
> * `<time>` mejora comprensión para máquinas.

## 12.3 Formulario semántico dentro de `<section>`

```html
<section id="contacto" aria-labelledby="titulo-contacto">
  <h2 id="titulo-contacto">Envíame un mensaje</h2>

  <form action="/enviar" method="post" novalidate>
    <fieldset>
      <legend>Datos del mensaje</legend>

      <div>
        <label for="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" required />
      </div>

      <div>
        <label for="correo">Correo</label>
        <input id="correo" name="correo" type="email" required aria-describedby="ayuda-correo" />
        <small id="ayuda-correo">Te responderé a este correo.</small>
      </div>

      <div>
        <label for="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
      </div>

      <button type="submit">Enviar</button>
    </fieldset>
  </form>
</section>
```

---

# 13) Variaciones para practicar en clase

1. **Múltiples tarjetas de usuario**

   * Repite `<article>` para tres perfiles.
   * Asegúrate de que cada `<h2>` y `id` sean **únicos**.

2. **Añadir `<details>`/`<summary>`**

   * “Más información” del usuario: intereses, skills, links.

3. **Lista de definiciones `<dl>`** para “Datos rápidos”

   * Ej.: “Rol”, “Experiencia”, “Disponibilidad”.

```html
<dl>
  <dt>Rol</dt>
  <dd>UI/UX Designer</dd>
  <dt>Experiencia</dt>
  <dd>5 años</dd>
</dl>
```

4. **Accesibilidad extra**

   * Si tienes dos `<nav>`, etiqueta uno como `aria-label="Navegación secundaria"`.

---

# 14) Mini‑checklist de calidad

* [ ] Solo un `<main>`.
* [ ] Jerarquía de `<h1>` → `<h2>` → `<h3>` lógica.
* [ ] Imágenes con `alt` útil (no decorativo).
* [ ] Formularios con `<label>` correcto.
* [ ] Landmarks claros y no redundantes.
* [ ] Evité `divitis`.
* [ ] Pasa el **validador W3C** (validator.w3.org).

---

# 15) Tarea (versión extendida con rúbrica)

**Consigna:** Crea `perfil.html` con **estructura semántica completa**:

**Requisitos mínimos (70%)**

* Usa: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
* Tarjeta personal con **nombre, foto, descripción, correo**.
* Un **formulario** con `Nombre`, `Correo`, `Mensaje` + `label`, `required` y `fieldset/legend`.
* Imágenes con `alt` descriptivo.
* Jerarquía de encabezados correcta.

**Más puntos (hasta 100%)**

* Usa `<figure>` + `<figcaption>`, `<time>`, `<address>`, `<abbr>`, `<dl>` si aplica.
* Incluye `<details>`/`<summary>` para información extra.
* Añade un **segundo `<nav>`** (por ejemplo, “Enlaces sociales”) correctamente etiquetado con `aria-label`.
* Sube el archivo validado (captura del validador) y una breve nota explicando **por qué** elegiste cada etiqueta clave.

**Rúbrica breve**

* Semántica correcta (40%)
* Accesibilidad básica (labels, alt, landmarks) (30%)
* Orden de encabezados (15%)
* Limpieza del código (indentación, atributos útiles) (15%)

---

# 16) Bonus: patrones semánticos típicos

**Blog/lista de artículos**

```html
<main>
  <section aria-labelledby="titulo-blog">
    <h1 id="titulo-blog">Blog</h1>

    <article>
      <header>
        <h2>Título del post</h2>
        <p>Por <a href="/autor/andrea">Andrea</a> • <time datetime="2025-06-20">20/06/2025</time></p>
      </header>

      <p>Resumen del artículo…</p>

      <footer>
        <a href="/post/titulo-del-post">Leer más</a>
      </footer>
    </article>

    <!-- Más <article>… -->
  </section>
</main>
```

**Producto / ficha**

```html
<article>
  <header>
    <h2>Gatito rascador deluxe</h2>
  </header>

  <figure>
    <img src="rascador.jpg" alt="Rascador para gato con base amplia" />
    <figcaption>Incluye repuesto de cuerda.</figcaption>
  </figure>

  <p>Ideal para gatos activos. Medidas: 60×30×30 cm.</p>

  <dl>
    <dt>Material</dt><dd>Yute y madera</dd>
    <dt>Color</dt><dd>Natural</dd>
  </dl>

  <footer>
    <a href="#comprar">Comprar</a>
  </footer>
</article>
```

---

# 17) Anti‑patrones (evítalos)

```html
<!-- ❌ Usar h1 como “estilo grande” repetido -->
<h1>Sección</h1>
<h1>Otra sección</h1>

<!-- ❌ Nav sin lista y sin contexto -->
<nav><a>Uno</a><a>Dos</a><a>Tres</a></nav>

<!-- ❌ Imagen decorativa con alt engañoso -->
<img src="decorativo.svg" alt="Gráfico complejo sobre adopciones">
```

**Correcciones rápidas**:

* Solo un `<h1>` global; usa `<h2>`, `<h3>`.
* En navegación, usa `<ul>` y, si hay varias navs, añade `aria-label`.
* Si la imagen es decorativa, usa `alt=""` (vacío) para que la “ignore” el lector de pantalla.
---


