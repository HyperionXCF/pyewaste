import { API_BASE } from '../config/constants';

async function handleResp(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    console.error('API Error:', { status: res.status, text }); // Debug log
    const message = text || `Request failed ${res.status}`
    const err: any = new Error(message)
    err.status = res.status
    throw err
  }
  const data = await res.json().catch(() => null)
  console.log('API Response:', data); // Debug log
  return data;
}

export default {
  async register(payload: any) {
    const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    return handleResp(res)
  },

  async login(payload: any) {
    const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const body = await handleResp(res)
    // if login returns access_token, persist it
    if (body && body.access_token) {
      try { localStorage.setItem('access_token', body.access_token) } catch {}
    }
    return body
  },

  async addEwaste(formData: FormData) {
    const res = await fetch(`${API_BASE}/ewaste/add`, { method: 'POST', body: formData })
    return handleResp(res)
  },

  async getUserItems(userId: number) {
    const res = await fetch(`${API_BASE}/ewaste/user/${userId}`)
    return handleResp(res)
  },

  async getAllItems() {
    const res = await fetch(`${API_BASE}/ewaste/all`)
    return handleResp(res)
  },

  async getAnalytics() {
    const res = await fetch(`${API_BASE}/ewaste/analytics`)
    return handleResp(res)
  },

  async getReusableItems() {
    const res = await fetch(`${API_BASE}/ewaste/reusable`)
    return handleResp(res)
  },

  async deleteEwaste(itemId: number) {
    const headers: any = {}
    try { const t = localStorage.getItem('access_token'); if (t) headers['Authorization'] = `Bearer ${t}` } catch {}
    const res = await fetch(`${API_BASE}/ewaste/${itemId}`, { method: 'DELETE', headers })
    return handleResp(res)
  }
}
