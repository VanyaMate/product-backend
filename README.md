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

## Замеры 2 октября 2024

Autocannon

```
Connections:    10
Duration:       10 s
Method:         GET
Enpoint:        /api/v1/friends

Min: 300 ms
Avg: 1188 ms
Max: 1913 ms

80 requests in 10s
```

```
Connections:    50
Duration:       10 s
Method:         GET
Enpoint:        /api/v1/friends

Min: 3791 ms
Avg: 4617 ms
Max: 4819 ms

100 requests in 10s
```

```
Connections:    100
Duration:       10 s
Method:         GET
Enpoint:        /api/v1/friends

Min: 7224 ms
Avg: 8248 ms
Max: 9257 ms

200 requests in 10s
57 errors (timeouts)
```