export default async function fetchJsonSafe(url, opts) {
    const res = await fetch(url, opts);
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
        console.error('fetch error', { url, status: res.status, body: text.slice(0, 1000) });
        throw new Error(`HTTP ${res.status}`);
    }

    if (!contentType.includes('application/json')) {
        try {
            return JSON.parse(text.replace(/^\uFEFF/, ''));
        } catch (e) {
            console.warn('Resposta não é JSON', { url, contentType, bodyPreview: text.slice(0, 400) });
            throw new Error('Resposta não é JSON');
        }
    }

    try {
        return JSON.parse(text.replace(/^\uFEFF/, ''));
    } catch (err) {
        console.error('JSON parse failed', { url, bodyPreview: text.slice(0, 1000) });
        throw err;
    }
}