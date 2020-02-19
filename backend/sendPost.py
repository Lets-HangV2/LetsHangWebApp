import requests

url = "http://127.0.0.1:8000/test"
jsonBody = {"username": "carloaclao", "password": "testing"}

response = requests.post(url = url, data = jsonBody)
print(response.text)