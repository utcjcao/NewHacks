import requests

import json
import os
from dotenv import load_dotenv



def get_nearby_hotels(lat, lon, radius=50000, limit=10, cache_file="hotels_cache.json"):
    # Check if cache file exists and load data if present
    if os.path.exists(cache_file):
        with open(cache_file, "r") as file:
            cached_data = json.load(file)
            if cached_data.get("location") == (lat, lon) and cached_data.get("radius") == radius:
                print("Using cached data.")
                return cached_data["hotels"]
    
    # API request to Google Places if cache is not found or doesn't match
    print("Calling Google Places API...", lat, lon, radius)
    url = "https://places.googleapis.com/v1/places:searchNearby"
    params = {
        "includedTypes": ["hotel"],
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": lat,
                    "longitude": lon
                },
                "radius": radius
            }
        }
    }

    headers = {
        'Content-type': 'application/json',
        "X-Goog-FieldMask": "places.id,places.displayName,places.location",
        "X-Goog-Api-Key": api_key
    }
    response = requests.post(url, json=params, headers=headers)
    data = response.json()
    hotels = data.get("places", [])[:limit]

    # Extract latitude, longitude, and availability (mocked here for example purposes)
    hotel_list = []
    for hotel in hotels:
        hotel_info = {
            "id": hotel["id"],
            "name": hotel["displayName"]["text"],
            "lat": hotel["location"]["latitude"],
            "lng": hotel["location"]["longitude"],
            "availability": 0.7  # Mocked availability; replace with actual data if accessible
        }
        hotel_list.append(hotel_info)
    
    # Save data to cache
    with open(cache_file, "w") as file:
        json.dump({"location": (lat, lon), "radius": radius, "hotels": hotel_list}, file)
    
    return hotel_list
    
def get_route_to_hotel(start_lat, start_lon):
    # Call routing API to get directions from start to hotel
    print("Calling routing API...")
    url = "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix"
    params = {
             "origins": [
            {
                "waypoint": {
                    "location": {
                        "latLng": {
                            "latitude": start_lat,
                            "longitude": start_lon
                        }
                    }
                },
                "routeModifiers": {"avoid_ferries": True}
            }
        ],
        "destinations": [],
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE_OPTIMAL",
        "languageCode": "en-US",
        "units": "IMPERIAL"
    }

    # Dynamically add each hotel as a destination waypoint using its ID
    for hotel in hotel_list:
        waypoint = {
            "waypoint": {
                "placeId": hotel["id"]
            }
        
        }
        params["destinations"].append(waypoint)   


    headers = {
        'Content-type': 'application/json',
        "X-Goog-FieldMask": "originIndex,destinationIndex,duration,distanceMeters",
        "X-Goog-Api-Key": api_key
    }

    response = requests.post(url, json=params, headers=headers)
    if response.status_code != 200:
        print('not 200')
        print("Error:", response.status_code)
        print("Response:", response.text)
        return
    else:
        print(response.json())
    # data = response.json()
    # print(json.dumps(data))

    return



if __name__ == "__main__":
    # initial location of user
    user_lat, user_lon = 28.602198676663033, -80.81752273354974
    # Load environment variables from .env.local
    load_dotenv()
    api_key = os.getenv("NEXT_PUBLIC_API_KEY")

    print(api_key)
    print("User's initial location:", user_lat, user_lon) 
    hotel_list = get_nearby_hotels(user_lat, user_lon)
    print(hotel_list)
    get_route_to_hotel(user_lat, user_lon)

