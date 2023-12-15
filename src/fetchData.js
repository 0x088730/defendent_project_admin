const apiUrl = "https://proxy.cors.sh/http://135.181.226.131:8553/api/v1"
// const apiUrl = "http://127.0.0.1:8553/api/v1"

export const fetchData = async (url, method, data) => {
     return await fetch(`${apiUrl}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'x-cors-api-key': 'temp_9869bffe28387073bf3e222797cc7350'
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
}