import json
import cohere
import faiss
import numpy as np
import re

co = cohere.Client('9U1arTaBk7dBninVJArtzR6oZlQwSfnZXcNnoJga')

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

def retrieve_relevant_section(query, sections, topics, index, embeddings):
    query_embedding = co.embed(texts=[query], model="embed-english-v2.0", input_type="text").embeddings[0]
    _, closest_section_idx = index.search(np.array([query_embedding]), k=1)
    
    section_text = sections[closest_section_idx[0][0]]
    topic = topics[closest_section_idx[0][0]]
    
    sentences = re.split(r'(?<=[.!?])\s+', section_text.strip())
    limited_text = ' '.join(sentences[:2])  

    return f"**{topic}:** {limited_text}"

def chatbot(json_path):
    """Chatbot loop for interacting with the user."""
    print("Welcome to the Hurricane Preparedness Bot!")

    sections, topics, embeddings = load_json_vectors(json_path)
    index = create_faiss_index(embeddings)
    
    county = "Alachua"  
    num_people = 3  
    kids = True  
    pets = False  
    
    while True:
        user_query = input("Enter your question (or type 'exit' to quit): ")
        if user_query.lower() == 'exit':
            print("Goodbye!")
            break
        
        response = retrieve_relevant_section(user_query, sections, topics, index, embeddings)
        print("Bot:", response)

if __name__ == "__main__":
    json_path = "/Users/anishpai/NewHacks/backend/hurricane_preparedness_vectors.json"  
    chatbot(json_path)
