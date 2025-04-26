from tavily import TavilyClient
from groq import Groq
import os
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))  # Adjust as needed
# Get API keys
model_api_key = os.getenv("GROQ_API_KEY")
tavily_api_key = os.getenv("TAVILY_API_KEY")  # Ensure correct env var name

# Ensure API keys are loaded correctly
if not model_api_key:
    raise ValueError("Groq API key is missing. Set GROQ_API_KEY in your .env file.")
if not tavily_api_key:
    raise ValueError("Tavily API key is missing. Set TAVILY_API_KEY in your .env file.")

# Initialize Tavily client
tavily_client = TavilyClient(api_key=tavily_api_key)

def RetrieveNews(topic: str):
    print(f"Fetching Latest News for: {topic}...")
    response = tavily_client.search(topic)
    
    if not response or "results" not in response:
        raise ValueError("Invalid response from Tavily API.")
    
    retrieved_content = "\n".join(
        [result["content"] for result in response.get("results", []) if "content" in result]
    )
    print(retrieved_content)
    return retrieved_content


def generatePost(retrieved_content: str, topic: str):
    prompt = f""" 
    You are a LinkedIn post generator for the topic: **{topic}**.
    Your mission is to create daily LinkedIn posts based on real-time updates.

    **Input Content:** 
    {retrieved_content}

    **Instructions:**
    1. Summarize the key insights in an engaging and professional tone.
    2. Align the post with current trends in the given topic.
    3. Keep it concise and actionable, including a CTA if needed.
    4. Format the output clearly as a LinkedIn post.
    5.  use less emojis in your output. 
    Now generate a LinkedIn post based on the provided content.
    """

    print("Generating LinkedIn Post...")
    client = Groq(api_key=model_api_key)

    completion = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "user", "content": prompt}]
    )

    raw_response = completion.choices[0].message.content.split("</think>")
    return raw_response[1] if len(raw_response) > 1 else raw_response[0]


def EditPost(content: str):
    prompt = f"""
You are a professional LinkedIn content editor.

Your task is to refine the following draft into a polished LinkedIn post.

### Raw Draft:
{content}

### Guidelines:
1. Summarize key points in a clear, engaging, and professional tone.
2. Ensure the content is aligned with current trends in the relevant domain.
3. Keep it concise, actionable, and insight-driven.
4. Structure it as a LinkedIn post using short paragraphs or bullet points.
5. Include a subtle call-to-action (CTA), if relevant.
6. use less emojis in post

Now, rewrite and refine the above content into a compelling LinkedIn post.
"""

    print("Editing LinkedIn Post...")
    client = Groq(api_key=model_api_key)

    completion = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "user", "content": prompt}]
    )

    raw_response = completion.choices[0].message.content.split("</think>")
    return raw_response[1] if len(raw_response) > 1 else raw_response[0]
