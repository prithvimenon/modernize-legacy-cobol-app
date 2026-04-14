# Modernizing a COBOL Accounting System to Node.js

This repo contains COBOL code for a simple accounting system and its modernized Node.js equivalent.

## COBOL Source (Legacy)
- `main.cob` — CLI menu loop
- `operations.cob` — Business logic (credit, debit, view balance)
- `data.cob` — In-memory data storage

## Node.js Application
Located in `node-accounting-app/`.

### Setup
```
cd node-accounting-app
npm install
```

### Run
```
npm start
```

### Test
```
npm test
```

## Test Plan
See [TESTPLAN.md](TESTPLAN.md) for the full test plan with 7 test cases.
