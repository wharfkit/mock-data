import {
    AbstractUserInterface,
    cancelable,
    Cancelable,
    Checksum256,
    LocaleDefinitions,
    LoginContext,
    LoginOptions,
    PermissionLevel,
    PromptArgs,
    PromptResponse,
    UserInterface,
    UserInterfaceAccountCreationResponse,
    UserInterfaceLoginResponse,
} from '@wharfkit/session'

export class MockUserInterface extends AbstractUserInterface implements UserInterface {
    readonly logging = false
    public messages: string[] = []
    public localeDefinitions: LocaleDefinitions = {}

    log(message: string) {
        this.messages.push(message)
        if (this.logging) {
            // eslint-disable-next-line no-console
            console.info('MockUserInterface', message)
        }
    }

    async login(context: LoginContext): Promise<UserInterfaceLoginResponse> {
        let chainId = context.chain?.id
        if (!chainId) {
            chainId = Checksum256.from(context.chains[0].id)
        }
        let permissionLevel = context.permissionLevel
        if (!permissionLevel) {
            permissionLevel = PermissionLevel.from('mock@interface')
        }
        return {
            chainId,
            permissionLevel,
            walletPluginIndex: 0,
        }
    }

    async onError(error: Error) {
        this.log('onError: ' + JSON.stringify(error))
    }

    async onLogin(options?: LoginOptions) {
        this.log('onLogin: ' + JSON.stringify(options))
    }

    async onLoginComplete() {
        this.log('onLoginComplete')
    }

    async onTransact() {
        this.log('onTransact')
    }

    async onTransactComplete() {
        this.log('onTransactComplete')
    }

    async onSign() {
        this.log('onSign')
    }

    async onSignComplete() {
        this.log('onSignComplete')
    }

    async onBroadcast() {
        this.log('onBroadcast')
    }

    async onBroadcastComplete() {
        this.log('onBroadcastComplete')
    }

    prompt(args: PromptArgs): Cancelable<PromptResponse> {
        this.log('prompt' + JSON.stringify(args))
        return cancelable(
            new Promise(() => {
                // do things and resolve/reject
            }),
            (canceled) => {
                // do things to cancel promise
                throw canceled
            }
        )
    }

    status(message: string) {
        this.log(`status:('${message}')`)
    }

    addTranslations(definitions: LocaleDefinitions): void {
        this.log('addTranslations: ' + JSON.stringify(definitions))
    }

    async onAccountCreate(): Promise<UserInterfaceAccountCreationResponse> {
        this.log('onAccountCreate')
        return Promise.resolve({})
    }

    async onAccountCreateComplete(): Promise<void> {
        this.log('onAccountCreateComplete')
    }
}
