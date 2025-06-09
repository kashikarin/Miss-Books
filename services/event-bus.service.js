
function createEventEmitter() {
    const listenersMap = {}
    return {
        //* Use this function to subscribe to an event
        on(evName, listener) {
            listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },

        //* Use this function to emit an event
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()

////////////////////////////////////////////////////

function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}

window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg



// * Service Testing:
// * Example for using the service
//  

// eventBusService.on('some-event', (data) => {
//     console.log('I have also got it!:', data)
// })


// setInterval(() => {
//     eventBusService.emit('some-event', 123456)
// }, 1000)


//* Unsubscribing first listener
// setTimeout(() => {
//     unsubscribe()
// }, 3000);
