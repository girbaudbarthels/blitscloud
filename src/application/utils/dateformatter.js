export function dateFormatter(ms) {
    const parsedDate = Date.parse(ms)
    const event = new Date(Date.UTC(0, 0, 0, 0, 0, 0, parsedDate + 2208986640000));
    return event.toLocaleString('nl-BE', { timeZone: 'CET' });
}