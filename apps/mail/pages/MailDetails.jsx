
const {useParams} = ReactRouterDOM

const { useState,useEffect,Fragment } = React


import { mailService } from "../services/mail.service.js"

export function MailDetails() {
 
    const params = useParams()

    const [mail,setMail] = useState()
    
    useEffect(()=>{
        loadMail()
    },[])



    function loadMail() {
        mailService.get(params.mailId).then(mail => setMail(mail))

    }

if (!mail) return <div>Loading...</div>
    return (
        <Fragment>  
            <h1>mail details</h1>
          
                <div>Subject:{mail.subject}</div>
                <div>From:{mail.from}</div>
                <div>To:{mail.to}</div>
                <div>{mail.body}</div>
            
        </Fragment>
      
    )
}