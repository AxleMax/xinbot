const mineflayer = require('mineflayer')
const fs = require('fs')

let bot
const sleep = async (s) => {
    return new Promise(resolve => setTimeout(() => { resolve() }, s * 1000))
}
class Bot {
    constructor() {
        this.bot = null
        this.config = null
        this.username = null
        this.init()
    }
    async unlock() {
        return new Promise(async (resolve, reject) => {
            const compass = this.bot.inventory.items().find(item => item.name === 'compass')
            if (compass) {
                this.bot.equip(compass, 'hand')
                await this.bot.activateItem()
                console.log('成功使用指南针')
                await sleep(2)
                resolve()
            }
            reject('背包没有指南针')
        })

    }

    init() {
        try {
            if (!fs.existsSync('config.json')) throw new Error('config path is error')
            this.config = JSON.parse(fs.readFileSync('config.json'))
            this.username = this.config.username
            this.bot = mineflayer.createBot({
                host: '2b2t.xin',
                port: 25565,
                username: this.config.username,
                auth: this.config.mode ? this.config.mode : "offline",
                checkTimeoutInterval: 60 * 1000
            })

            this.bot.once('login', async () => {
                console.log('logged')
            });

            this.bot.once('spawn', async () => {
                console.log(`${this.config.username} 已进入游戏`);
            })
            this.bot.on('kicked', (reason) => {
                console.log(`被踢出游戏，原因：${JSON.stringify(reason)}`);
            });
            this.bot.on('end', (reason) => {
                console.log(`与服务器断开连接，原因：${JSON.stringify(reason)}`);
            });
            this.bot.on('error', (err) => {
                console.log(err);
            });
            this.bot.on('dimension', (dimension) => {
                console.log(`Bot switched to dimension: ${dimension}`);
            });


            this.bot.on('title', async (data) => {
                if (data && data?.value.includes('/L <密码>')) {
                    this.bot.chat(`/L ${this.config.password}`)
                }
                if (data && data?.value.includes('/reg <密码>')) {
                    this.bot.chat(`/reg ${this.config.password} ${this.config.password}`)
                }
                if (data && data?.value.includes('登陆成功')) {
                    console.log('登录成功')
                    await sleep(3)
                    await this.unlock()
                }
                if (data && data?.value.includes('注册成功')) {
                    console.log('注册成功')
                    await sleep(3)
                    await this.unlock()

                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}




const createBot = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            bot = new Bot()
            resolve()
        }
        catch (err) {
            console.log(err)
            reject()
        }
    })
}


const main = async () => {
    try {
        const bot = await createBot()
    } catch (err) {
        console.log(err)
    }

}

main()
