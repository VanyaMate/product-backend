# Product backend

## Technologies

- TypeScript
- Nest
- Prisma
- MongoDB

## Structure

- src
    - domain - `domain modules`
        - services - `любые сервисы`
        - lib - `библиотека функций`
        - types - `типы`
    - nest - `nest deps`
        - modules - `nest modules`
            - api - `модули относящиеся к api`
            - services - `любые другое модули`
        - pipes - `nest pipes`
        - guards - `nest guards`
        - decorators - `nest decorators`
        - filters - `nest filters`
        - interceptors - `nest interceptors`