# **firmachain-event-udc-swap-web**
![UDC swap event web](https://github.com/FirmaChain/firmachain-event-udc-swap-web/assets/93503020/4e4ef0cd-0013-4a24-9630-1a438d562e55)

<br/>

## **Overview**
The firmachain-event-udc-swap-web, developed for event purposes, is a DApp that provides the feature of swapping tokens received at offline events for FCT. Users can connect to the page via the DApps service from the logged-in FirmaStation mobile wallet, connect the wallet, and send the event tokens held in the wallet to the wallet after swapping for FCT.

<br/>

## **Build Process**
Follow these steps to build the project.
```bash
# Clone repository
$ git clone https://github.com/FirmaChain/firmachain-event-udc-swap-web.git

# Navigate to the project directory
$ cd firmachain-event-udc-swap-web

# Install necessary packages
$ npm install
```

<br/>

## **Configuration of .env and config.ts Files**
Copy the .env.sample file and the config.sample.ts file to .env and config.ts respectively, and set the environment configuration variables to appropriate values.
```bash
# Copy .env file
$ cp .env.sample .env

# Copy config.ts file
$ cp config.sample.ts config.ts
```

The environmental variables of the .env file are as follows:

- `PORT` : Specifies the port on which the web operates. (e.g., 3000).

- `CHAIN_NETWORK` : Specify either the mainnet or the testnet here.

- `API_HOST` : Enter the address of the Wallet Connect Relay server here. (e.g., https://firmaconnect.dev/)

- `EXPLORER_URL` : Enter the address of the FirmaChain Explorer website here.

The environmental variables of the config.ts file are as follows:
```typescript
export const NETWORK_CONFIG = {
  MAINNET: {}, // Mainnet configuration values
  TESTNET: {}, // Testnet configuration values
  DEVNET: {}   // Devnet configuration values
}

```
Each network configuration can be customized, and if you do not want to, you can use the publicly available configuration values using the FirmaConfig of @firmachain/firma-js.

<br/>

## **How to Run**
```bash
# Build the web
$ npm run build

# Start the web
$ npm run start
```
