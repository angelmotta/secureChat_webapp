function UserContactList({ contact }) {
    return (<div>
        <p>{contact.firstname + " " + contact.lastname}</p>
        <p>{contact.email}</p>
    </div>);
}

export default UserContactList;
