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
            - services - `любые другие модули`
        - pipes - `nest pipes`
        - guards - `nest guards`
        - decorators - `nest decorators`
        - filters - `nest filters`
        - interceptors - `nest interceptors`


- DB
    - Notifications
        - 1 коллекция для уведомлений
        - получатель в модели уведомления
        - тип уведомления в модели уведомлении
        - отправитель (id) в данных уведомления
        - информация в данных уведомления
        - данные уведомления в формате объекта (prisma.jsonValue)
        - хранение уведомлений 1 месяц (readed: false) и конец дня (readed: true)