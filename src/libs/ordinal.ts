export default function ordinal(number : number, onlySuffix : boolean = false) {
    const mod10 = number % 10
    const mod100 = number % 100

    const suffix = (
        mod10 === 1 && mod100 !== 11 ? "st" :
        mod10 === 2 && mod100 !== 12 ? "nd" :
        mod10 === 3 && mod100 !== 13 ? "rd" :
        "th"
    )

    return onlySuffix ? suffix : number.toString() + suffix
}