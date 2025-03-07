# XinBot

XinBot is a bot client for **2b2t.xin**, built using [Mineflayer](https://github.com/PrismarineJS/mineflayer). This bot allows automated login for the **2b2t.xin** Minecraft server.

## Features
- **Automatic Login**: Automatically logs into **2b2t.xin** without manual intervention.
- **Customizable Settings**: Modify bot behavior through configuration.

## Requirements
- Node.js (v18 or higher)
- npm or yarn
- A valid Minecraft Java Edition / offline account

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/AxleMax/xinbot.git
   cd xinbot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
1. Create a configuration file:
   ```sh
   cp config.example.json config.json
   ```
2. Edit `config.json` and fill in your Minecraft account credentials.
3. Start the bot:
   ```sh
   node index.js
   ```

## Configuration
Modify `config.json` to customize the bot settings:
```json
{
  "username": "your_minecraft_username",
  "password": "your_minecraft_password",
  "mode":"offline / microsoft"
}
```
## License
This project is open-source and licensed under the MIT License.

## Disclaimer
This project is intended for educational purposes only. Use at your own risk. The author is not responsible for any violations of server rules or account bans.

