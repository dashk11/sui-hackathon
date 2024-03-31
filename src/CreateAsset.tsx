import React, { useState } from 'react';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";


export function CreateAsset({ onMinted }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const [nftId, setNftId] = useState('');


  const client = useSuiClient();
  const nftPackageId = useNetworkVariable("counterPackageId");
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const mintNFT = () => {
    console.log("minting....")
    const txb = new TransactionBlock();

    txb.moveCall({
      arguments: [
        new txb.pure(name),
        new txb.pure(description),
        new txb.pure(url),
      
      ],
        target: `${nftPackageId}::assetdb::mint_to_sender`,
    });

    signAndExecute({
      transactionBlock: txb,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    }, {
      onSuccess: (tx) => {
        client.waitForTransactionBlock({ digest: tx.digest }).then(() => {
          const objectId = tx.effects?.created?.[0]?.reference?.objectId;
          console.log(tx)
          if (objectId) {
            onMinted(objectId);
            alert("NFT minted successfully!");
          }
        });
      },
      onError: (error) => {
        console.error("Error minting NFT:", error);
        alert("Failed to mint NFT.");
      }
    });
  };


  const burnNFT = () => {
    console.log("Burning NFT ID:", nftId);
    const txb = new TransactionBlock();

    txb.moveCall({
      arguments: [txb.object(nftId)], // Assuming you need to pass the NFT ID as an argument to burn it
      target: `${nftPackageId}::assetdb::burn`,
    });

    signAndExecute({
      transactionBlock: txb,
      options: {
        showEffects: true,
        showObjectChanges: true,
      },
    }, {
      onSuccess: (tx) => {
        console.log("NFT burned successfully:", tx);
        alert("NFT burned successfully!");
        setNftId(''); // Clear the input field
      },
      onError: (error) => {
        console.error("Error burning NFT:", error);
        alert("Failed to burn NFT.");
      }
    });
};

  return (
    <div>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <br />
      <button onClick={mintNFT}>Mint NFT</button>

       <br /> <br />
      <label>
        NFT ID:
        <input type="text" value={nftId} onChange={(e) => setNftId(e.target.value)} />
      </label>
      <br />
  
      <button onClick={burnNFT} style={{marginLeft: "10px"}}>Burn NFT</button> {/* New burn button */}

    </div>
  );
}
