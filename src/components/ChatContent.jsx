import "./ChatContent.css";

function ChatContent({message, myEmail}) {
    let cssMessageClass = message.sender == myEmail ? "myMessage" : "otherMessage";
    return (
        <div className={cssMessageClass}>
            <p>{message.message}</p>
        </div>
    );
}

export default ChatContent;