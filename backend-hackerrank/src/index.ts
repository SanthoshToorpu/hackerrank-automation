import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
  }
}>()

app.post('/submit', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try {
    const entry = await prisma.user.create({
      // @ts-ignore
      data : {
        Problem : body.Problem,
        SolutionLink : body.SolutionLink,
        code : body.code
      }
    })
    console.log(entry)
  } catch (error) {
    c.status(500);
      if (typeof error === 'object' && error !== null && 'message' in error) {
        return c.json((error as Error).message);
      } else {
        return c.json('Unknown error occurred');
      }
  }
  return c.json(body)
})

.get('/get', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const entries = await prisma.user.findMany()
  return c.json(entries)
})

export default app
