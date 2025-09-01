import { healthCheckRoutes } from '@controllers/health-check/health-check.routes'
import { usersRoutes } from '@controllers/users/users.routes'
import type { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(healthCheckRoutes, { prefix: '/health' })
}
