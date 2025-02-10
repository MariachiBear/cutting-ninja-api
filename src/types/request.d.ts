import { FastifyRequest } from 'fastify';

type TRequest = FastifyRequest & { user: UserDocument };
