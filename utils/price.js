export function toCents(text) {
    const match = text.match(/\d+\.\d{2}/);
    if (!match) {
        throw new Error(`No price found in: "${text}"`);
    }
    return Math.round(parseFloat(match[0]) * 100);
}