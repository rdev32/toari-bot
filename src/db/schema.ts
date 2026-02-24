import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const client = createClient({ url: process.env.DB_FILE_NAME! })
const db = drizzle({ client })

// existira otra para accounts donde si se guardaran las credenciales
export const userSchema = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  discordId: text().unique(),
  discordTag: text().notNull(),
  createdAt: text().notNull()
})

export const reportsSchema = sqliteTable('reports', {
  id: int().primaryKey({ autoIncrement: true }),
  serverId: text().notNull(),
  userId: text().references(() => userSchema.id),
  reason: text().notNull(),
  createdAt: text().notNull()
})

export { db }
