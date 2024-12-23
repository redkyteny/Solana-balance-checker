const { Connection, PublicKey } = require('@solana/web3.js');
const fs = require('fs');

// Configure batch size and delay
const BATCH_SIZE = 15;
const DELAY_MS = 30000; // 30 seconds delay

// Delay function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Process address batch function
async function processBatch(connection, addresses) {
    const results = await Promise.all(addresses.map(async (address) => {
        try {
            const pubKey = new PublicKey(address);
            const balance = await connection.getBalance(pubKey);
            return {
                address,
                balance: balance / 1e9,
                status: 'success'
            };
        } catch (error) {
            return {
                address,
                balance: null,
                status: 'error',
                error: error.message
            };
        }
    }));
    return results;
}

async function checkSolanaBalances(addressesFilePath) {
    try {
        // Connect to Solana mainnet
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
        
        // Read addresses from file
        const addresses = fs.readFileSync(addressesFilePath, 'utf8')
            .split('\n')
            .map(addr => addr.trim())
            .filter(addr => addr);

        console.log(`Checking ${addresses.length} addresses...`);
        console.log(`Batch size: ${BATCH_SIZE}, Delay: ${DELAY_MS}ms\n`);

        const allResults = [];
        
        // Process in batches
        for (let i = 0; i < addresses.length; i += BATCH_SIZE) {
            const batch = addresses.slice(i, i + BATCH_SIZE);
            console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1}... (${i + 1} - ${Math.min(i + BATCH_SIZE, addresses.length)})`);
            
            const batchResults = await processBatch(connection, batch);
            allResults.push(...batchResults);

            // Print progress
            batchResults.forEach(result => {
                if (result.status === 'success') {
                    console.log(`✓ ${result.address}: ${result.balance.toFixed(4)} SOL`);
                } else {
                    console.log(`✗ ${result.address}: Error - ${result.error}`);
                }
            });

            // Apply delay if not the last batch
            if (i + BATCH_SIZE < addresses.length) {
                console.log(`\nWaiting ${DELAY_MS/1000} seconds...\n`);
                await sleep(DELAY_MS);
            }
        }

        // Save results to file
        const successResults = allResults.filter(r => r.status === 'success');
        const outputData = successResults.map(r => 
            `${r.address},${r.balance.toFixed(9)}`
        ).join('\n');
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputPath = `solana_balances_${timestamp}.csv`;
        fs.writeFileSync(outputPath, 'Address,Balance(SOL)\n' + outputData);
        
        // Print final statistics
        console.log('\n=== Final Results ===');
        console.log(`Total addresses processed: ${allResults.length}`);
        console.log(`Successful: ${successResults.length}`);
        console.log(`Failed: ${allResults.length - successResults.length}`);
        console.log(`Results saved to ${outputPath}`);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Usage example
checkSolanaBalances('solana_addresses.txt');
