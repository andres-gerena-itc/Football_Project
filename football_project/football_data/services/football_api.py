import requests

API_TOKEN = '325d4f2048754e699e43dfe32ff4cbdf'  # remplazar con tu API key real
BASE_URL = 'https://api.football-data.org/v4/'
HEADERS = {'X-Auth-Token': API_TOKEN}

def fetch_champions_league_matches(season):
    url = BASE_URL + f'competitions/CL/matches?season={season}'
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()['matches']
    else:
        print(f"Error {response.status_code}: {response.text}")
        return []
