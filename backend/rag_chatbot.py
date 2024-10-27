from flask import Flask, request, jsonify
import json
import cohere
import faiss
import numpy as np
import re
from datascraping import prepare_emergency_plan  # Import the function from your data-scraping script

app = Flask(__name__)

# Initialize Cohere client and load embeddings
co = cohere.Client('9U1arTaBk7dBninVJArtzR6oZlQwSfnZXcNnoJga')

# Load JSON vectors and FAISS index
def load_json_vectors(json_path):
    with open(json_path, 'r') as file:
        data = json.load(file)
    
    sections = [entry['content'] for entry in data]
    topics = [entry['topic'] for entry in data]
    embeddings = co.embed(texts=sections, model="embed-english-v2.0", input_type="text").embeddings
    return sections, topics, np.array(embeddings).astype('float32')

def create_faiss_index(embeddings):
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)
    return index

# Load vectors
json_path = "/Users/anishpai/NewHacks/backend/hurricane_preparedness_vectors.json"
sections, topics, embeddings = load_json_vectors(json_path)
index = create_faiss_index(embeddings)

def retrieve_relevant_section(query, sections, topics, index, embeddings):
    query_embedding = co.embed(texts=[query], model="embed-english-v2.0", input_type="text").embeddings[0]
    _, closest_section_idx = index.search(np.array([query_embedding]), k=1)
    
    section_text = sections[closest_section_idx[0][0]]
    topic = topics[closest_section_idx[0][0]]
    
    sentences = re.split(r'(?<=[.!?])\s+', section_text.strip())
    limited_text = ' '.join(sentences[:2])  # First two sentences for brevity

    return f"**{topic}:** {limited_text}"

@app.route('/generate_response', methods=['POST'])
def generate_response():
    """Generate a response based on user query and emergency plan details."""
    data = request.json
    user_query = data.get("user_query")
    county = data.get("county")
    num_people = data.get("num_people", 1)
    kids = data.get("kids", False)
    pets = data.get("pets", False)

    # Generate emergency plan details
    emergency_plan = prepare_emergency_plan(county, num_people, kids, pets)
    
    # Check for specific queries related to the emergency plan
    if "evacuate" in user_query.lower():
        response = f"You {'need to evacuate' if emergency_plan['Evacuation Needed'] == 'Yes' else 'do not need to evacuate'} in {county}. Zone: {emergency_plan['Evacuation Zone']} ({emergency_plan['Zone Description']})."
    elif "supplies" in user_query.lower() or "bring" in user_query.lower():
        response = f"Based on your requirements, here’s your supplies checklist:\n{emergency_plan['Supplies Checklist']}"
    elif "shelter" in user_query.lower():
        response = f"Nearest shelter(s) for {county}:\n{emergency_plan['Shelters']}"
    elif "website" in user_query.lower() or "contact" in user_query.lower():
        response = f"Emergency contact website: {emergency_plan['County Website']}"
    elif "distribution" in user_query.lower():
        response = f"Distribution center: {emergency_plan['Distribution Center']}"
    else:
        # Use RAG (Retrieve and Generate) response for other queries
        response = retrieve_relevant_section(user_query, sections, topics, index, embeddings)

    return jsonify({"response": response})

@app.route('/get_emergency_plan', methods=['POST'])
def retrieve_emergency_plan():
    """API endpoint to get emergency plan details."""
    data = request.json
    county = data.get("county")
    num_people = data.get("num_people", 1)
    kids = data.get("kids", False)
    pets = data.get("pets", False)

    # Get the emergency plan
    emergency_plan = prepare_emergency_plan(county, num_people, kids, pets)
    
    # Convert DataFrame in 'Supplies Checklist' to JSON-serializable format
    emergency_plan["Supplies Checklist"] = emergency_plan["Supplies Checklist"].to_dict(orient="records")
    
    return jsonify(emergency_plan)


if __name__ == "__main__":
    app.run(debug=True)
