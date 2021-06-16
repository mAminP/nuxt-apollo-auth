import { moduleDefaults, ModuleOptions } from "../../src/Options";
import consola from 'consola';
import { Debugger } from "../../src/utils/debugger";
const options: ModuleOptions = moduleDefaults

const msg = "test-msg"
const consolaInfoSpy = jest.spyOn(consola, 'info').mockImplementation()
const consolaErrorSpy = jest.spyOn(consola, 'error').mockImplementation()
const consolaSuccessSpy = jest.spyOn(consola, 'success').mockImplementation()
const consolaWarnSpy = jest.spyOn(consola, 'warn').mockImplementation()


describe('Debugger Class', () => {

    beforeEach(() => {
        consolaInfoSpy.mockClear()
        consolaErrorSpy.mockClear()
        consolaSuccessSpy.mockClear()
        consolaWarnSpy.mockClear()
    })
    describe('info', () => {
        it('should log info', () => {
            options.debug = true
            const _debugger = new Debugger(options)
            _debugger.info(msg)
            expect(consola.info).toBeCalledTimes(1)
            expect(consola.info).toHaveBeenLastCalledWith(msg)
        })
        it('should not log info if debug is false', () => {
            options.debug = false
            const _debugger = new Debugger(options)
            _debugger.info(msg)
            expect(consola.info).toBeCalledTimes(0)
        })
    })
    describe('success', () => {
        it('should log success', () => {
            options.debug = true
            const _debugger = new Debugger(options)
            _debugger.success(msg)
            expect(consola.success).toBeCalledTimes(1)
            expect(consola.success).toHaveBeenLastCalledWith(msg)
        })
        it('should not log success if debug is false', () => {
            options.debug = false
            const _debugger = new Debugger(options)
            _debugger.success(msg)
            expect(consola.success).toBeCalledTimes(0)
        })
    })
    describe('warn', () => {
        it('should log warn', () => {
            options.debug = true
            const _debugger = new Debugger(options)
            _debugger.warn(msg)
            expect(consola.warn).toBeCalledTimes(1)
            expect(consola.warn).toHaveBeenLastCalledWith(msg)
        })
        it('should not log warn if debug is false', () => {
            options.debug = false
            const _debugger = new Debugger(options)
            _debugger.warn(msg)
            expect(consola.warn).toBeCalledTimes(0)
        })
    })

    describe('error', () => {
        it('should log error', () => {
            options.debug = true
            const _debugger = new Debugger(options)
            _debugger.error(msg)
            expect(consola.error).toBeCalledTimes(1)
            expect(consola.error).toHaveBeenLastCalledWith(msg)
        })
        it('should not log error if debug is false', () => {
            options.debug = false
            const _debugger = new Debugger(options)
            _debugger.error(msg)
            expect(consola.error).toBeCalledTimes(0)
        })
    })
})