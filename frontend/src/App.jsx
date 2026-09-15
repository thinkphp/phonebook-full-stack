import { useEffect, useState, useCallback } from 'react'
import { api } from './api'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'

export default function App() {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [editingContact, setEditingContact] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadContacts = useCallback(async (searchTerm = '') => {
    try {
      setLoading(true)
      const data = await api.getContacts(searchTerm)
      setContacts(data)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  // Cautare cu mic delay, ca sa nu spam-uim API-ul la fiecare litera
  useEffect(() => {
    const timeout = setTimeout(() => loadContacts(search), 300)
    return () => clearTimeout(timeout)
  }, [search, loadContacts])

  async function handleAddOrUpdate(form) {
    try {
      if (editingContact) {
        await api.updateContact(editingContact.id, form)
        setEditingContact(null)
      } else {
        await api.createContact(form)
      }
      await loadContacts(search)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Sigur vrei sa stergi acest contact?')) return
    try {
      await api.deleteContact(id)
      await loadContacts(search)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <h1>📒 PhoneBook</h1>

      {error && <div className="error-banner">{error}</div>}

      <input
        className="search-bar"
        placeholder="Cauta dupa nume sau telefon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="main-layout">
        <ContactForm
          onSubmit={handleAddOrUpdate}
          editingContact={editingContact}
          onCancelEdit={() => setEditingContact(null)}
        />

        {loading ? (
          <p>Se incarca...</p>
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={setEditingContact}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
