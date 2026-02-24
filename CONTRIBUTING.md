# Guia de Contribucion

¡Gracias por tu interes en contribuir a Toari Bot! Cualquier aporte es bienvenido, ya sea reportando un bug, sugiriendo una mejora o enviando codigo.

## Antes de empezar

Por favor lee nuestro [Codigo de Conducta](./CODE_OF_CONDUCT.md). Al participar en este proyecto aceptas cumplirlo.

## ¿Como puedo contribuir?

### Reportando bugs

Si encontraste un error, abre un [Issue](https://github.com/rdev32/toari-bot/issues) e incluye:

- Una descripcion clara del problema
- Los pasos exactos para reproducirlo
- El comportamiento que esperabas ver
- El comportamiento que realmente ocurrio
- Version de Node.js que estas usando (`node -v`)

### Sugiriendo mejoras

Si tienes una idea para un nuevo comando u otra mejora, abre un Issue con el prefijo `[Sugerencia]` en el titulo. Describe que quieres lograr y por que seria util para la comunidad.

### Enviando codigo

**1. Haz un fork del repositorio** y clonalo en tu maquina:

```bash
git clone https://github.com/tu-usuario/toari-bot.git
cd toari-bot
```

**2. Crea una rama** con un nombre descriptivo:

```bash
# Para un nuevo comando
git checkout -b feature/nombre-del-comando

# Para corregir un bug
git checkout -b fix/descripcion-del-bug
```

**3. Instala las dependencias** y configura el entorno:

```bash
npm install
cp .env.sample .env
# Completa el .env con tus credenciales de desarrollo
```

**4. Realiza tus cambios** siguiendo las convenciones del proyecto (ver abajo).

**5. Verifica que el codigo compile** sin errores:

```bash
npm run build
```

**6. Formatea el codigo:**

```bash
npm run format
npm run lint
```

**7. Abre un Pull Request** hacia la rama `main` describiendo que cambiaste y por que.

## Convenciones de codigo

### Estructura de un comando

Todos los comandos deben seguir la misma estructura: un archivo en `src/commands/` con el nombre `nombre.command.ts` que exporte por defecto un objeto con `data` y `service`:

```typescript
import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder().setName('nombre').setDescription('Descripcion del comando'),
  service: async (interaction: CommandInteraction) => {
    // logica del comando
  }
}
```

### Estructura de un evento

Los eventos van en `src/events/` con el nombre `nombre.event.ts`:

```typescript
import { Events } from 'discord.js'

export default {
  name: Events.NombreDelEvento,
  once: false, // true si solo debe ejecutarse una vez
  controller: async (...args) => {
    // logica del evento
  }
}
```

### Estilo general

- Todo el codigo y los mensajes al usuario van **en español**
- Los nombres de variables, funciones y archivos van **en ingles**
- Usa `async/await` en lugar de `.then()/.catch()`
- Maneja siempre los errores con `try/catch` y lanza errores con mensajes descriptivos
- No uses `require()`, usa siempre `import` dinamico o estatico segun corresponda

## Preguntas

Si tienes dudas sobre como contribuir o sobre la arquitectura del proyecto, abre un Issue con el prefijo `[Pregunta]` y con gusto te ayudamos.
