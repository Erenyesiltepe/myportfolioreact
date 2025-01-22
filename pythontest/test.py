import cohere
import asyncio
import json
import nltk
from nltk.tokenize import sent_tokenize

co = cohere.AsyncClient("Enter the api key here")

async def main():
    # Download required NLTK data
    nltk.download('punkt_tab')
    
    # Read the CV text file
    with open('cvtext.txt', 'r') as f:
        text = f.read()
    
    # Split into sentences
    sentences = sent_tokenize(text)
    
    # Get embeddings for all sentences
    response = await co.embed(
        texts=sentences,
        model="embed-english-v3.0",
        input_type="classification",
    )
    
    # Create list of dictionaries with id, text and embedding
    embeds_data = []
    for i, (sentence, embedding) in enumerate(zip(sentences, response.embeddings)):
        embeds_data.append({
            "id": i,
            "text": sentence,
            "embed": embedding
        })
    
    # Save to JSON file
    with open('embeddings.json', 'w') as f:
        json.dump(embeds_data, f)


asyncio.run(main())
