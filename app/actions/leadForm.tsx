function submit(data: any) {
    return fetch('https://ac-api.lathos.club/api/enroll_vsl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

const LeadFormAPI = {
    submit,
}

export default LeadFormAPI
