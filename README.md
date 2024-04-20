# Product backend

## Technologies

- TypeScript
- Nest
- Prisma
- MongoDB

** AuthenticationService **

- [ LogData ] =>
- [ ValidateType ] =>
- [ GetUser ] => User
- [ Check: LogData === User ]
    - [ HashLogDataPassword ]
    - [ CheckPassword ]
- [ GenerateToken ] => Token
    - [ GetFingerPrint] => FingerPrint
    - [ GenerateRefreshToken ] => RefreshToken
    - [ GenerateAccessToken {User.login, RefreshToken} ]
- [ Return: AuthResponse {User, AccessToken, RefreshToken} ]