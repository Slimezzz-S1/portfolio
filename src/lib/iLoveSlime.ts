import ordinal from "@/lib/ordinal"

interface DialogContext {
    count : number
}

const SECRET_DIALOGS_ES : Record<number | "default", (ctx : DialogContext) => string> = {
    1 : () => "How lucky! you got 0.1 random value!",
    2 : () => "Twice? wtff",
    5 : () => "interesting...",
    7 : () => "if you stay here, there will be a big surprise",
    10 : () => "10th!",
    20 : () => "now its 20th!",
    30 : () => "30th now!",
    40 : () => "40!",
    50 : () => "a cool vid you should see : https://youtu.be/ZzUsKizhb8o?si=QCyprytK_GLt2qs7",
    51 : () => "a cooler vid you should see right now! : https://youtu.be/Mdq6sQPKYqQ?si=6BjOAm6_NkWj6qz3",
    55 : () => "cute puppy doing cute things : https://youtu.be/j5a0jTc9S10?si=9qyzC5kDagQSyP18",
    56 : () => "okay jkjk, im not gonna send anymore vids",
    67 : () => "676767676767676767",
    68 : () => "... well this is awkward",
    69 : () => "69696969696969696969",
    80 : () => "dayum",
    90 : () => "How long have you been here? its 90th!",
    91 : () => "wtf dude get a life!",
    92 : () => "You want a secret or something? fine. get to 100th",
    98 : () => "Youre getting it...",
    99 : () => "One more...",
    100 : () => "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29tL2ZpbGUvZC8xY1pEcjNLRUVNY1RFeFA2OWlTUWNSNVVZMDNnUWRKejcvdmlldz91c3A9c2hhcmluZw==",
    "default" : ({count}) => `You got 0.1 random value the ${ordinal(count)} time!`
}

export function getSecretDialogES(ctx : DialogContext) : string {
    const dialog = SECRET_DIALOGS_ES[ctx.count] ?? SECRET_DIALOGS_ES["default"]

    return dialog(ctx)
}