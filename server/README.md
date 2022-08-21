### Routes
`https://mono-assessment-app.herokuapp.com/`

Live routes for the APIs

- `POST /auth/register` -- sign up a new user to the platform
- `POST /auth/login` -- sign into the platform
- `POST /auth/delete` -- delete user information from the platform
- `POST /account/connect/` -- link account for a user
- `POST /account/:accountId/disconnect` -- unlink account for a user
- `GET /account/:accountId/transactions` -- get all transactions for a users account
- `GET /account/accounts` -- get all linked accounts of a user

### Swagger documentation
https://mono-assessment-app.herokuapp.com/api/v1/docs/

### Backend Implementation

Create a simple platform with sign-in and sign-up flow that allows you to link your bank account using Mono, and view your transactions (using [manual data sync](https://docs.mono.co/docs/data-sync-1) and a cron job to fetch new transactions after every 3 hours is a plus).

A supporting node.js (typescript) REST API that securely provides data to the frontend service with the following resource;

1. A resource to sign up with email and a password
2. A resource to log in with the same password and email supplied during registration
3. A resource to save a linked account
4. A resource to fetch linked accounts of a user
5. A resource to fetch transactions of a user’s linked account
6. A resource to unlink my account
7. A resource to delete my account from the platform

### SET-UP (To set up project on local)
In the terminal, you can run:
* git clone `https://github.com/Oluwa-Femi/fullstack-assessment`
* cd server(for backend)
* create a .env file in the root directory replicating the keys in the .env.sample file. Attach values to the keys. 
* npm install - to set up Node modules and install packages
* backend - run npm run start:dev - to spin the application
* onboard as a user by signing up


