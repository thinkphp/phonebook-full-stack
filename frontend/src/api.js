const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Eroare necunoscuta' }))
    throw new Error(err.detail || 'Eroare la request')
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getContacts: (search = '') => {
    const query = search ? `?search=${encodeURIComponent(search)}` : ''
    return fetch(`${API_URL}/contacts${query}`).then(handleResponse)
  },
  createContact: (contact) =>
    fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    }).then(handleResponse),
  updateContact: (id, contact) =>
    fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    }).then(handleResponse),
  deleteContact: (id) =>
    fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' }).then(handleResponse),
}
