'use server'

async function GetEvents(events) {
    const url = "https://mmission007.org/wp-json/wp/v2/eventinfo"
    const res = await fetch(url) 
    const data = await res.json()
    console.log('data::a: ' ,data)
}
