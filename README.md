## Installation

Install packages.
```bash
npm install
```

### Prepare DataBase
Create MySQL DB `messenger`. See `ormconfig.json` for details.

Execute migrations.
```bash
npm run migration:run
```

## Running the app

```bash
# run application (watch mode)
npm run start:dev
```

## API Documentation
After app start API documentation will be available at http://localhost:3000/api.

## Socket usage
### Subscribe on incoming user messages
```html
<script src="socket.io.js"></script>
<script>
 io('http://localhost:3000/messages')
  .emit('subscribe', { recipient: 1 }, response => console.log('"subscribe" response', response))
  .on('message.created', (data) => console.log('message.created', data))
  .on('exception', (data) => console.log('exception', data))
  .on('disconnect', () => console.log('Disconnected'));
</script>
```
## Tests

```bash
# unit tests (watch mode)
npm run test:watch

# run e2e tests (watch mode)
npm run test:e2e:watch

# test coverage
npm run test:cov
```

## Code style

```bash
# Run Eslint and Prettier
npm run format && npm run lint:fix
```
