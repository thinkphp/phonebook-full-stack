import { useState, useEffect } from 'react'

const emptyForm = { name: '', phone: '', email: '', address: '' }

export default function ContactForm({ onSubmit, editingContact, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setForm(editingContact ? { ...editingContact } : emptyForm)
  }, [editingContact])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    onSubmit(form)
    setForm(emptyForm)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{editingContact ? 'Editeaza contact' : 'Adauga contact'}</h2>
      <input
        name="name"
        placeholder="Nume"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Telefon"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email (optional)"
        value={form.email || ''}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Adresa (optional)"
        value={form.address || ''}
        onChange={handleChange}
      />
      <div className="form-actions">
        <button type="submit">{editingContact ? 'Salveaza' : 'Adauga'}</button>
        {editingContact && (
          <button type="button" onClick={onCancelEdit}>
            Anuleaza
          </button>
        )}
      </div>
    </form>
  )
}
