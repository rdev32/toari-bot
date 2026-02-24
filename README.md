# 🤖 Toari Bot

Bot de Discord desarrollado en TypeScript para comunidades de habla hispana. Permite a los usuarios interactuar entre si, crear invitaciones para partidas de Phasmophobia y enviar reportes directamente a los moderadores del servidor.

## ✨ Comandos

| Comando            | Descripcion                                                     |
| ------------------ | --------------------------------------------------------------- |
| `/ayuda`           | Muestra la lista de comandos disponibles                        |
| `/phasmo <codigo>` | Crea una tarjeta de invitacion para una partida de Phasmophobia |
| `/poke`            | Envia un toque a un miembro aleatorio del servidor              |
| `/report <razon>`  | Crea un reporte privado para los moderadores                    |

## 🛠️ Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [discord.js v14](https://discord.js.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [libSQL / SQLite](https://turso.tech/libsql)
- [dotenv](https://github.com/motdotla/dotenv)

## 📋 Requisitos previos

- Node.js 18 o superior
- Una cuenta de Discord Developer y un bot registrado en el [Portal de Desarrolladores](https://discord.com/developers/applications)

## 🚀 Instalacion

**1. Clona el repositorio**

```bash
git clone https://github.com/rdev32/toari-bot.git
cd toari-bot
```

**2. Instala las dependencias**

```bash
npm install
```

**3. Configura las variables de entorno**

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.sample .env
```

| Variable       | Descripcion                                                          |
| -------------- | -------------------------------------------------------------------- |
| `TOKEN`        | Token del bot obtenido desde el Portal de Desarrolladores            |
| `CLIENT`       | ID de la aplicacion del bot                                          |
| `PERMISSIONS`  | Entero de permisos para el link de invitacion (puede dejarse en `0`) |
| `DB_FILE_NAME` | Ruta al archivo SQLite, por ejemplo `file:toari.db`                  |

**4. Genera el link de invitacion** _(opcional)_

```bash
npm run build
npm run invite
```

**5. Registra los slash commands en Discord**

Este paso es necesario la primera vez y cada vez que agregues o modifiques comandos:

```bash
npm run build
npm run upload
```

**6. Inicia el bot**

En modo desarrollo:

```bash
npm run dev
```

En produccion:

```bash
npm run build
npm start
```

## 📁 Estructura del proyecto

```
src/
├── app.ts               # Inicializacion del cliente, carga de comandos y eventos
├── index.ts             # Punto de entrada, login del bot
├── commands/
│   ├── help.command.ts
│   ├── phasmo.command.ts
│   ├── poke.command.ts
│   └── report.command.ts
├── db/
│   └── schema.ts        # Esquema de base de datos con Drizzle ORM
├── events/
│   ├── interaction.event.ts
│   └── ready.event.ts
└── utils/
    ├── invite.ts        # Genera el link de invitacion al servidor
    └── load.ts          # Registra los slash commands en la API de Discord
```

## 🗄️ Base de datos

El bot utiliza SQLite a traves de Drizzle ORM. El esquema define dos tablas:

- **`users`** — Almacena informacion de los usuarios de Discord (id, tag, fecha de creacion).
- **`reports`** — Almacena los reportes creados con `/report`, vinculados al usuario y servidor.

## 📜 Licencia

Distribuido bajo la licencia [MIT](./LICENSE). © 2024 Renato Monroy.
