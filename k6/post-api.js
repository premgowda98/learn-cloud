import http from 'k6/http'
import { check } from 'k6'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options={
    vus: 10,
    duration: '5s'
}

export default function(){
    const response = http.post("https://reqres.in/api/users", {
        "name": "hi",
        "age": randomIntBetween(20,29)
    })

    // console.log(response.body)

    check(response, {
        "success": (response) => response.status === 201
    })
}