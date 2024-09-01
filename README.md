# TopWalletApi (тестовое задание)

## Деплой

**Установить зависимости**
```bash
$ npm install
```

**Заполнить `.env`**
```dotenv
PORT=
ETHERSCAN_TOKEN=
```

**Запустить**
```bash
$ npm run start
```

## Эндпоинт

```http request
GET http://localhost:3000/transactions/turnover/top?inLatestTransactions=3
```
**Query параметр `inLatestBlocks` определяет за сколько последних блоков будет происходить подсчет. По умолчанию: `100`**