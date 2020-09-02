//TODO прееименовать это (а лучше придумать более гуманный и менее затратный способ)
export function deleteSymbols(text: string): string {
    return text.replace(/\\r\\n/g, ' ');
}
