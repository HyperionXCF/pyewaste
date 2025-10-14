import { useEffect, useState } from 'react'
import api from '../services/api'

export default function UserDashboard({ user, onAdd }: { user?: any, onAdd: () => void }) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    api.getUserItems(user.id).then((res: any) => setItems(res || []))
  }, [user])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Items</h3>
        <button onClick={onAdd} className="btn btn-primary">Add</button>
      </div>

      {items.length === 0 && <div className="text-slate-600">No items yet.</div>}

      <ul className="space-y-3 mt-4">
        {items.map(it => (
          <li key={it.id} className="bg-white p-3 rounded shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{it.product_name || '(no name)'}</div>
                <div className="text-sm text-slate-600">Category: {it.category} — Tag: {it.tag}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={async () => {
                  try {
                    await api.deleteEwaste(it.id)
                    setItems(items.filter(x => x.id !== it.id))
                  } catch (e) {
                    console.error('delete failed', e)
                  }
                }} className="text-sm text-red-600">Delete</button>
                <div className="text-sm text-slate-500">#{it.id}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
