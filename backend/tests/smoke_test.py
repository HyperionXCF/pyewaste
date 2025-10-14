# Simple smoke test for the backend API using FastAPI TestClient
import os
# Use a separate test database to avoid clobbering development DB
os.environ['DATABASE_URL'] = 'sqlite:///./ewaste_test.db'

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

print('Client created, testing endpoints...')

# 1) Register
register_payload = {"name": "Test User", "email": "test@example.com", "password": "testpass", "address": "", "phone": ""}
resp = client.post('/auth/register', json=register_payload)
print('REGISTER', resp.status_code, resp.json() if resp.status_code < 500 else resp.text)

# 2) Login
resp2 = client.post('/auth/login', json={"email": "test@example.com", "password": "testpass"})
print('LOGIN', resp2.status_code, resp2.json() if resp2.status_code < 500 else resp2.text)

token = None
user_id = None
if resp2.status_code == 200:
    body = resp2.json()
    token = body.get('access_token')
    if body.get('user'):
        user_id = body['user'].get('id')

# 3) Add e-waste (no file)
if not user_id:
    user_id = 1
add_data = {
    'user_id': str(user_id),
    'category': 'consumer',
    'product_name': 'Test Phone',
    'is_working': 'false'
}
headers = {}
if token:
    headers['Authorization'] = f'Bearer {token}'
resp3 = client.post('/ewaste/add', data=add_data, headers=headers)
print('ADD_EWASTE', resp3.status_code, resp3.json() if resp3.status_code < 500 else resp3.text)

# 4) Analytics (admin token required) - create an admin token directly
from utils.auth_utils import create_access_token
admin_token = create_access_token({'sub': 'admin@test', 'user_id': 0, 'role': 'admin'})
resp4 = client.get('/ewaste/analytics', headers={'Authorization': f'Bearer {admin_token}'})
print('ANALYTICS', resp4.status_code, resp4.json() if resp4.status_code < 500 else resp4.text)

print('Smoke test finished.')
