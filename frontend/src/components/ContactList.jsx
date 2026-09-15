export default function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty-state">Niciun contact gasit.</p>
  }

  return (
    <ul className="contact-list">
      {contacts.map((c) => (
        <li key={c.id} className="contact-item">
          <div className="contact-info">
            <strong>{c.name}</strong>
            <span>{c.phone}</span>
            {c.email && <span>{c.email}</span>}
            {c.address && <span>{c.address}</span>}
          </div>
          <div className="contact-actions">
            <button onClick={() => onEdit(c)}>Editeaza</button>
            <button onClick={() => onDelete(c.id)} className="danger">
              Sterge
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
