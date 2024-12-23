# Solana-balance-checker
A Node.js utility to check SOL balances for multiple Solana addresses

# Solana Balance Checker

A Node.js utility to check SOL balances for multiple Solana addresses efficiently. This tool processes addresses in batches with configurable delays to avoid rate limiting while querying the Solana network.

## Features

- Batch processing of Solana addresses
- Rate limiting with configurable delays
- Error handling for invalid addresses
- CSV output with timestamp
- Progress tracking with visual indicators
- Detailed success/failure statistics

## Prerequisites

Before running this tool, make sure you have:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A text file containing Solana addresses (one per line)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solana-balance-checker.git
cd solana-balance-checker
```

2. Install dependencies:
```bash
npm install @solana/web3.js
```

## Configuration

The script has two main configurable parameters at the top of the file:

```javascript
const BATCH_SIZE = 15;     // Number of addresses to process in each batch
const DELAY_MS = 30000;    // Delay between batches in milliseconds (30 seconds)
```

You can adjust these values based on your needs and the Solana RPC endpoint's rate limits.

## Usage

1. Create a text file (e.g., `solana_addresses.txt`) containing Solana addresses, one per line:
```
9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin
6Aj1PJvxn9JLRH5QozKJCUqUTX1u6APuUFY1tXA1KBZY
...
```

2. Run the script:
```bash
node check_balances.js
```

The script will:
- Process addresses in batches
- Display real-time progress
- Show success/failure for each address
- Generate a CSV file with results

## Output

### Console Output
The script provides real-time feedback:
```
Checking 100 addresses...
Batch size: 15, Delay: 30000ms

Processing batch 1... (1 - 15)
✓ 9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin: 1.2345 SOL
✓ 6Aj1PJvxn9JLRH5QozKJCUqUTX1u6APuUFY1tXA1KBZY: 0.5678 SOL
...

Waiting 30 seconds...
```

### CSV Output
Results are saved to a timestamped CSV file (e.g., `solana_balances_2024-12-23T10-30-45Z.csv`):
```csv
Address,Balance(SOL)
9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin,1.234500000
6Aj1PJvxn9JLRH5QozKJCUqUTX1u6APuUFY1tXA1KBZY,0.567800000
```

## Error Handling

The script handles various error cases:
- Invalid addresses
- Network connection issues
- RPC endpoint failures

Failed addresses are logged but don't stop the overall process.

## Rate Limiting

The tool implements rate limiting to avoid overwhelming the Solana RPC endpoint:
- Processes addresses in configurable batch sizes (default: 15)
- Waits between batches (default: 30 seconds)
- Provides visual feedback during delays

## Customization

### Changing RPC Endpoint
You can modify the Solana RPC endpoint in the code:
```javascript
const connection = new Connection('https://your-preferred-endpoint.com', 'confirmed');
```

### Adjusting Output Format
The CSV output format can be customized by modifying the `outputData` construction in the code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is provided as-is. Please ensure you comply with the rate limits and terms of service of any Solana RPC endpoint you use.

## Support

If you encounter any issues or have questions, please:
1. Check existing issues in the GitHub repository
2. Create a new issue with detailed information about your problem
3. Include your Node.js version and operating system details when reporting issues

## Twitter @RedKyTeny
https://x.com/RedKyTeny
