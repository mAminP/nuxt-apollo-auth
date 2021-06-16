import consola from 'consola'
import { ModuleOptions } from './../Options'
export class Debugger {
    private readonly _options: ModuleOptions
    constructor(options: ModuleOptions) {
        this._options = options
    }

    public info(message: string, ...params: any): void {
        if (this._options.debug) {
            consola.info(message, ...params)
        }
    }


    public success(message: string, ...params: any): void {
        if (this._options.debug) {
            consola.success(message, ...params)
        }
    }


    public error(message: string, ...params: any): void {
        if (this._options.debug) {
            consola.error(message, ...params)
        }
    }


    public warn(message: string, ...params: any): void {
        if (this._options.debug) {
            consola.warn(message, ...params)
        }
    }
}

