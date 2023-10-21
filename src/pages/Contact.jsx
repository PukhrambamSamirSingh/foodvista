import { useRef, useState } from "react"
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE_ID, formRef.current, 'LVfSehbI5qQ36UFRC')
            .then((result) => {
                console.log(result.text);
                setSuccess(true)
            }, (error) => {
                console.log(error.text);
                setError(true)
            });
    };

    return (
        <div className="w-full pb-6">
            <div className="pt-4 pb-6 flex gap-2 font-bold text-3xl lg:text-4xl">
                <h1>Contact</h1>
                <h1 className="text-orange-500">Us</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-4xl md:text-6xl">{"Let's"} talk</h1>
                    <h3 className="text-xl md:text-2xl text-orange-500">Feel free to ask us anything!</h3>
                    <div className="w-72 h-72 rounded-full bg-gray-500 flex items-center justify-center">
                        <img className="w-56 h-56 object-contain" src="https://freepngimg.com/save/44611-calling-png-file-hd/500x400" alt="" />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <form ref={formRef} className="flex flex-col gap-6" onSubmit={sendEmail}>
                        {error && (
                            <h1 className="text-xl text-red-500 italic">An error occurred!</h1>
                        )}
                        {success && (
                            <p className="text-xl italic">Email send successfully!</p>
                        )}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">NAME</label>
                            <input className="border border-gray-500 outline-none p-2 bg-transparent" type="text" name="name" id="name" placeholder="Your name" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">EMAIL</label>
                            <input className="border border-gray-500 outline-none p-2 bg-transparent" type="text" name="email" id="email" placeholder="Your email" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message">MESSAGE</label>
                            <textarea className="border border-gray-500 outline-none p-2 bg-transparent" rows={6} type="text" name="message" id="message" placeholder="Your message" />
                        </div>
                        <button className="max-w-max px-8 py-2 rounded-md bg-orange-500">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
