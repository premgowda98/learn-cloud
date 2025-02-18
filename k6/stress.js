import http from 'k6/http'

export const options={
    stages: [
        {"duration":"1m", target:50},
        {"duration":"2m", target:200},
        {"duration":"30s", target:10},
    ]
}

export default function(){
    http.get("https://test.k6.io")
}