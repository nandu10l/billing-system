import requests
import json

with open('test.json', 'r') as f:
    data = json.load(f)

response = requests.post('http://localhost:8000/generate-bill', json=data)
print(response.json())