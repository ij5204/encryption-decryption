async function handleCrypto() {
    const text = document.getElementById('text').value;
    const key = document.getElementById('key').value;
    const mode = document.getElementById('mode').value;

    const response = await fetch('/crypto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, key, mode }),
    });

    const data = await response.json();
    document.getElementById('result').innerText = data.result;
}
