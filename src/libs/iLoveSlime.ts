import ordinal from "@/libs/ordinal"

interface DialogContext {
    count : number

}

const SECRET_DIALOGS_ES : Record<number | "default", (ctx : DialogContext) => string> = {
    1 : () => "How lucky! you got 0.1 random value!",
    2 : () => "Twice? wtff",
    5 : () => "interesting...",
    100 : () => "wtf dude get a life!",
    "default" : ({count}) => `You got 0.1 random value the ${ordinal(count)} time!`
}

export function getSecretDialogES(ctx : DialogContext) : string {
    const dialog = SECRET_DIALOGS_ES[ctx.count] ?? SECRET_DIALOGS_ES["default"]

    return dialog(ctx)
}