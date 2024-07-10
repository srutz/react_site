import {EventEmitter, Listener} from "events"
import {useEffect, useState} from "react";


export class AppState {
    private static instance: AppState = new AppState()
    public static getInstance() { return AppState.instance }

    private usermail = ""
    emitter = new EventEmitter()
    private constructor() { }
    getUsermail() { return this.usermail }
    setUsermail(usermail: string) {
        const oldmail = this.usermail
        this.usermail = usermail
        if (oldmail != this.usermail) {
            this.emitter.emit("usermail")
        }
    }
}

export function useAppState() {
    const [ trigger, setTrigger ] = useState<boolean>(false)
    useEffect(() => {
        const l: Listener = () => {
            setTrigger(!trigger)
        }
        AppState.getInstance().emitter.on("usermail", l)
        return () => {
            AppState.getInstance().emitter.off("usermail", l)
        }
    }, [])
}