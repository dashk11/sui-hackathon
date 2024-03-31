# ByteGuard

![ByteGuard Logo](https://sui-nft-assets.s3.us-east-2.amazonaws.com/full-logo-3.png "ByteGuard Logo")

ByteGuard is a decentralized data management system designed to protect digital creators' intellectual property. Built on the SUI blockchain, it enables users to mint their data as NFTs with embedded smart contracts, ensuring transparency and fair compensation for data usage.

## Inspiration

Our motivation is to empower creators in the digital space by providing them with control over their content, ensuring their creative rights are respected and rewarded in the age of AI and machine learning.

## Features

- **Data Ownership:** Upload and mint your data as NFTs on the SUI blockchain.
- **Smart Contract Integration:** Define the terms of data usage through smart contracts.
- **Real-Time Alerts:** Get immediate notifications when your data is accessed or used.
- **Ethical Data Sourcing:** Organizations can access data transparently and ethically.


### Install Sui cli

Before deploying your move code, ensure that you have installed the Sui CLI. You
can follow the [Sui installation instruction](https://docs.sui.io/build/install)
to get everything set up.

This template uses `devnet` by default, so we'll need to set up a devnet
environment in the CLI:

```bash
sui client new-env --alias devnet --rpc https://fullnode.devnet.sui.io:443
sui client switch --env devnet
```

If you haven't set up an address in the sui client yet, you can use the
following command to get a new address:

```bash
sui client new-address secp256k1
```

This well generate a new address and recover phrase for you. You can mark a
newly created address as you active address by running the following command
with your new address:

```bash
sui client switch --address 0xYOUR_ADDRESS...
```

We can ensure we have some Sui in our new wallet by requesting Sui from the
faucet (make sure to replace the address with your address):

```bash
curl --location --request POST 'https://faucet.devnet.sui.io/gas' \
--header 'Content-Type: application/json' \
--data-raw '{
    "FixedAmountRequest": {
        "recipient": "<YOUR_ADDRESS>"
    }
}'
```

### Publishing the move package

The move code for this template is located in the `move` directory. To publish
it, you can enter the `move` directory, and publish it with the Sui CLI:

```bash
cd move
sui client publish --gas-budget 100000000 assetdb
```

In the output there will be an object with a `"packageId"` property. You'll want
to save that package ID to the `src/constants.ts` file as `PACKAGE_ID`:

```ts
export const DEVNET_COUNTER_PACKAGE_ID = "<YOUR_PACKAGE_ID>";
```

Now that we have published the move code, and update the package ID, we can
start the app.

## Starting your dApp

To install dependencies you can run

```bash
pnpm install
```

To start your dApp in development mode run

```bash
pnpm dev
```

## Building

To build your app for deployment you can run

```bash
pnpm build
```
