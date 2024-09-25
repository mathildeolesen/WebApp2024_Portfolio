import { FormEvent, useState } from "react";


type ContactProps = {
    email: string;
}

type Message = {
    id: string,
    senderName: string,
    senderEmail: string,
    topic: string,
    message: string
}

export default function Contact(props: ContactProps) {

    const [messages, setMessages] = useState<Message[]>([]);

    const { email } = props;

    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const [senderEmailIsValid, setSenderEmailIsValid] = useState(false)
    const [senderEmailIsTouched, setSenderEmailIsTouched] = useState(false);
    const [senderEmailIsDirty, setSenderEmailIsDirty] = useState(false);

    const [topicIsValid, setTopicIsValid] = useState(false)
    const [topicIsTouched, setTopicIsTouched] = useState(false);
    const [topicIsDirty, setTopicIsDirty] = useState(false);
    
    const [messageIsValid, setMessageIsValid] = useState(false)
    const [messageIsTouched, setMessageIsTouched] = useState(false);
    const [messageIsDirty, setMessageIsDirty] = useState(false);

    const validateEmailInput = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (senderEmailIsTouched && senderEmailIsDirty) {
            setSenderEmailIsValid(emailRegex.test(email));
        }
    }

    const validateTopicInput = (topic: string) => {
        if (topicIsTouched && topicIsDirty) {
            setTopicIsValid(topic.trim().length > 3)
        }
    }

    const validateMessageInput = (message: string) => {
        if (messageIsTouched && messageIsDirty) {
            setMessageIsValid(message.trim().split(/\s+/).length > 2)
        }
    }

    const updateSenderName = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setSenderName(input.value);
    };

    const updateSenderEmail = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setSenderEmailIsDirty(true);
        setSenderEmail(input.value);
    };
    
    const updateTopic = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setTopicIsDirty(true);
        setTopic(input.value);
    };

    const updateMessage = (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        setMessageIsDirty(true);
        setMessage(input.value);
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
        setSenderEmail("");
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
                    onChange={updateSenderName}
                    value={senderName} required/>
                </div>

                <div id="senderEmail">
                    <label htmlFor="senderEmail">Din e-post</label>
                    <input type="text" id="senderEmail" name="senderEmail" 
                    onChange={updateSenderEmail}
                    onFocus={() => { setSenderEmailIsTouched(true) }}
                    onBlur={() => {validateEmailInput(senderEmail)}}
                    value={senderEmail} required/>
                    {!senderEmailIsValid && senderEmailIsDirty ? (
                        <p className="warning">E-posten er ikke gyldig 🙂</p>
                    ) : null}
                </div>

                <div id="topic">
                    <label htmlFor="topic">Emne</label>
                    <input type="text" id="topic" name="topic" 
                    onChange={updateTopic}
                    onFocus={() => { setTopicIsTouched(true) }}
                    onBlur={() => { validateTopicInput(topic) }}
                    value={topic} required/>
                    {!topicIsValid && topicIsDirty ? (
                        <p className="warning">Emne må være lengre enn 3 tegn 🙂</p>
                    ) : null}
                </div>

                <div id="message">
                    <label htmlFor="message">Melding</label>
                    <input type="textarea" id="message" name="message"
                    onChange={updateMessage}
                    onFocus={() => { setMessageIsTouched(true) }}
                    onBlur={() => { validateMessageInput(message) }}
                    value={message} required/>
                    {!messageIsValid && messageIsDirty ? (
                        <p className="warning">Meldingen må være mer enn 2 ord 🙂</p>
                    ) : null}
                </div>

                <button type="submit">Send melding</button>
          </form>
        </section>
    )
}