# Authentication API

REST-baserad webbtjänst skapad med Node.js, Express, MongoDB, Mongoose, JWT och bcrypt.

APIet används för registrering, inloggning och åtkomst till skyddad data.

## Länk

https://backend-labb4.onrender.com/

## Routes

| Metod  | Ändpunkt       | Beskrivning |
| POST   | /api/register  | Registrerar ny användare |
| POST   | /api/login     | Loggar in användare |
| GET    | /api/protected | Skyddad route |

## Exempel på JSON

```json
{
  "username": "testuser",
  "password": "123456"
}
```
