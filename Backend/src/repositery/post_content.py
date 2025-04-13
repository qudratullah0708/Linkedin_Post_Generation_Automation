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


def RetrieveNews():
    query = "latest real estate news, market reports, construction updates, and emerging tools in the industry"

    print("Fetching Latest News.....")
    
    response = tavily_client.search(query)
    
    if not response or "results" not in response:
        raise ValueError("Invalid response from Tavily API.")
    
    retrieved_content = "\n".join(
        [result["content"] for result in response.get("results", []) if "content" in result]
    )
    print(retrieved_content)
    return retrieved_content


def generatePost(retrieved_content):
    prompt = f""" 
    You are a LinkedIn post generator for a real estate company. 
    Your mission is to create daily LinkedIn posts based on real-time industry news. 

    **Input Content:** 
    {retrieved_content}

    **Instructions:**
    1. Summarize the key insights in an engaging and professional tone.
    2. Align the post with industry trends, ensuring it's relevant to real estate professionals.
    3. Keep it concise and actionable, including a CTA if needed.
    4. Format the output clearly as a LinkedIn post.

    Few-shot Examples:

    ## Example 1:
    <Example>
    Input Content: "Recent market report highlights a steady increase in property values and evolving buyer trends."
    Generated Post: "Market Insight: Property values are on the rise and buyer trends are shifting. Discover what these changes mean for your investments in our latest report!"
    </Example>

    ## Example 2:
    <Example>
    Input Content: "New construction update: A major urban development project is nearing completion, promising to transform city landscapes."
    Generated Post: "Construction Update: A landmark urban development is nearing completion, set to transform our cityscape. Follow us for more insights on its market impact!"
    </Example>

    Now generate a LinkedIn post based on the provided content.
    """
     
    print("Generating LinkedIn Post...")
    # Initialize Groq client with API key
    client = Groq(api_key=model_api_key)

    completion = client.chat.completions.create(
        model="deepseek-r1-distill-llama-70b",
        messages=[{"role": "user", "content": prompt}]
    )
    
    raw_response =  completion.choices[0].message.content.split("</think>")

    response = raw_response[1]
    return response

