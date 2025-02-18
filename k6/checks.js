import http from 'k6/http'
import { check } from 'k6'

export const options={
    vus: 10,
    iterations: 10
}

export default function(){
    const response = http.get("https://test.k6.io")

    check(response, {
        "success": (response) => response.status === 200
    })
}