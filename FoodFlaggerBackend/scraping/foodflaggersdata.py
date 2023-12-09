import json
import requests
from bs4 import BeautifulSoup
# URL and endpoint
import requests

# URL and endpoint
url = "https://dukegroups.com/mobile_ws/v17/mobile_events_list"

# Query parameters
params = {
    'range': '0',
    'limit': '40',
    'filter4_contains': 'OR',
    'filter4_notcontains': 'OR',
    'filter6': '8349646',
    'order': 'undefined',
    'search_word': ''
}

# Headers based on the screenshot provided
headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'CG.SessionID=fvy32cv1ddrrd21fkivr1wkn-zEzi%2blja0OKxC7xuFNNABIRa%2fA8%3d; _ga=GA1.2.1929615001.1702155538; _gid=GA1.2.497223764.1702155538; cg_uid=3588805-TMZsVHANlhjnMrA7Rk93B2EW2GvjJlB7h9kFZI1Sj/w=; _gat_UA-11274264-4=1; _ga_J32WC9NWNJ=GS1.2.1702155538.1.1.1702156960.0.0.0',
    'Referer': 'https://dukegroups.com/events',
    'Sec-Ch-Ua': '"Google Chrome";v="119", "Chromium";v="119", "NotA;Brand";v="24"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

# Make the GET request
response = requests.get(url, headers=headers, params=params)

# Check if the request was successful
if response.status_code == 200:
    # Assuming the response contains JSON data
    json_data = response.json()

    # Define the filename
    filename = '/Users/nathanshenkerman/Desktop/FoodFlaggers/FoodFlaggerBackend/scraping/events_data.json'

    # Write the JSON data to a file
    with open(filename, 'w') as outfile:
        json.dump(json_data, outfile)

    print(f"Data written to {filename}")
else:
    print(f"Failed to retrieve data: {response.status_code}")

# Function to extract event details
def extract_event_details(events_data):
    extracted_data = []
    for event in events_data:
        # Extracting relevant fields
        title = event.get('p3')  # Assuming 'p3' holds the event title
        location = event.get('p6')  # Assuming 'p6' holds the location
        description = event.get('p30')  # Assuming 'p30' holds the description
        date = event.get('p4')
        tags_html = event.get('p22', '')  # Assuming 'p22' holds the tags in HTML

        # Parse HTML to extract tags
        soup = BeautifulSoup(tags_html, 'html.parser')
        tags_text = soup.get_text().lower()

        # Check if tags contain 'Food' or 'Free Food'
        if 'food' in tags_text or 'free food' in tags_text:
            extracted_data.append({
                'title': title,
                'location': location,
                'tags': tags_text,
                'description': description,
                'date': date
            })
    return extracted_data


# Read the JSON data from file
with open(filename, 'r') as file:
    json_data = json.load(file)

# Extract the event details
event_details = extract_event_details(json_data)


output_filename = '/Users/nathanshenkerman/Desktop/FoodFlaggers/FoodFlaggerBackend/scraping/extracted_events.json'  # Path to save the extracted data
with open(output_filename, 'w') as outfile:
    json.dump(event_details, outfile)

output_filename  # Return the path of the saved file for the user to download
