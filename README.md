<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Orders MicroService

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Development pasos

1. Clonar el proyecto
2. Crear un archivo `.env` basado en el archivo `.env.template`
3. Levantar la base de datos con `docker compose up -d`
4. Levantar el servidor de NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. Levantar el proyecto con `npm run start:dev`


## Nats
```bash
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Jordy Rojas](https://github.com/dasH128)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
