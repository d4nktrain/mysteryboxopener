//MAKE SURE YOU LOG OUT IN THE HOUSING LOBBY

let vec3 = require('vec3')

let mineflayer = require('mineflayer')
let navigatePlugin = require('mineflayer-navigate')(mineflayer)

let details = require("./details.json")

let standCoordsZero = vec3(0, 65, 15)
let boxCoordsZero = vec3(1, 67, 17)

let standCoordsOne = vec3(-16, 65, 15)
let boxCoordsOne = vec3(-15, 67, 17)

let isZero = (Math.floor(Math.random() * 2) === 0)

let bot = mineflayer.createBot({
    host: "mc.hypixel.net",
    username: details.email,
    password: details.password,
    version: "1.8.9"
})

navigatePlugin(bot)

bot.on("spawn", () => {
    setTimeout(() => {
        bot.setQuickBarSlot(2)
        bot.navigate.to(isZero ? standCoordsZero : standCoordsOne)
    }, 6000)
    setTimeout(() => {
        bot.chat("/l housing")
    }, 60000)
})

bot.navigate.on("arrived", () => {
    bot.openChest(bot.blockAt(isZero ? boxCoordsZero : boxCoordsOne))
})

bot.on('windowOpen', (window) => {
    setTimeout(() => {
        let windowInv = JSON.parse(JSON.stringify(window.slots, null, 2))
        if(windowInv[0] === null) {
            if(windowInv[29] === null) {
                console.log("finished opening boxes")
                process.exit(0)
            }
            bot.clickWindow(29,0, 0)
            console.log("opened box")
            setTimeout(() => {
                bot.openChest(bot.blockAt(isZero ? boxCoordsZero : boxCoordsOne))
            }, 10000)
        } else if(windowInv[0].type === 130) {
            bot.clickWindow(0, 0, 0)
        }
    }, 1000)
})

process.on('uncaughtException', function (err) {
    console.error(err)
    console.log("Node NOT Exiting...")
})
