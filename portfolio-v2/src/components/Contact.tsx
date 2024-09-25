import { FormEvent, useState } from "react";

type Email = `${string}@${string}.${string}`;


type ContactProps = {
    email: Email;
}

type Message = {
    id: string,
    senderName: string,
    senderEmail: Email,
    topic: string,
    message: string
}

export default function Contact(props: ContactProps) {

    const [messages, setMessages] = useState<Message[]>([]);

    const { email } = props;

    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState<Email>("" as Email);
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const updateSenderName = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setSenderName(input.value);
    };

    const updateSenderEmail = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;

        setSenderEmail(input.value as Email);
    };
    
    const updateTopic = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setTopic(input.value)
    };

    const updateMessage = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setMessage(input.value)
    };
    
    
    const addProject = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Know I can combine, but for learning purposes.. :)
        if (!senderName) return;
        if (!senderEmail) return;
        if (!topic) return;
        if (!message) return;

        const form = event.target as HTMLFormElement | null;

        if (!form) return;

        setMessages((prevMessages) => [
            ...prevMessages, 
            {id: crypto.randomUUID(), senderName, senderEmail, topic, message}
        ])

        setSenderName("");
        setSenderEmail("" as Email);
        setTopic("");
        setMessage("");
        
    };


    return (
        <section>
            <h2>Ta kontakt!</h2>
            <pre>
                {JSON.stringify(
                    { senderName, senderEmail, topic, message },
                    null,
                    2
                )}
            </pre>
            <form id="contactForm" onSubmit={addProject}>
            <div id="senderName">
              <label htmlFor="senderName">Navn</label>
              <input type="text" id="senderName" name="senderName" 
                onChange={updateSenderName} value={senderName} required/>
            </div>
            <div id="senderEmail">
              <label htmlFor="senderEmail">Din e-post</label>
              <input type="text" id="senderEmail" name="senderEmail" 
              onChange={updateSenderEmail} value={senderEmail} required/>
            </div>
            <div id="topic">
              <label htmlFor="topic">Emne</label>
              <input type="text" id="topic" name="topic" 
              onChange={updateTopic} value={topic} required/>
            </div>
            <div id="message">
              <label htmlFor="message">Melding</label>
              <input type="textarea" id="message" name="message"
                onChange={updateMessage} value={message} required/>
            </div>
            <button type="submit">Send melding</button>
          </form>
        </section>
    )
}