## Public link : http://13.127.199.129/

## Name : Aishwarya Ashok Patil

## Agent Name : Personalized News Agent

## LLM API used for generation : I have used Google Gemini API (Gemini 2.5 Flash model).

## Suggestions from Pritesh sir : 
  - Initially I had used Gradio for UI.
  - Suggested switching to basic HTML + CSS for a simpler, lightweight web interface.

## Challenges faced? : 
The challenges I faced : 
1)OpenAI API quota exceeded (Error 429: insufficient_quota).
- Summarization failed when the number of requests exceeded because I was using the free plan.
- So I used Google Gemini API (gemini-2.5-flash)
  
## Screenshots of my implementation.
<img width="1920" height="964" alt="NewsAgentSS1" src="https://github.com/user-attachments/assets/383b1f93-6cca-4107-a56f-41b3138cb49c" />
<img width="1920" height="963" alt="NewsAgentSS2" src="https://github.com/user-attachments/assets/17548c07-4fec-4bc2-9f5d-d503f585982d" />
<img width="1920" height="965" alt="NewsAgentSS3" src="https://github.com/user-attachments/assets/43929b1c-2f77-4832-9902-cd8075a903cb" />
<img width="1920" height="1020" alt="NewsAgentSS4" src="https://github.com/user-attachments/assets/98525bd9-94fd-4ad9-b372-d41eddecbaf4" />


## Email Address  : aishupatil2708@gmail.com

## Stepwise Flow of the Agent:
1.User Interface
  - The user opens the web app (index.html) in a browser.
  - The user enters a topic or keyword and selects language, region, category, and date range filters.

2.Frontend Request
  -By default, Clicking “Get News” sends a POST request to /get_news with JSON data:{ "topic": "AI", "language": "en" }

3.Fetch News Articles
  - Backend calls fetch_news(topic, language).
  - For English, it uses NewsAPI (https://newsapi.org/v2/everything) with the API key.
  - For Hindi or Marathi, it uses Google News RSS feeds.
  - Returns up to 5 articles with title, description, url, and content.

4.Summarize Articles using Gemini LLM
  - For each article, summarize_article(article, language):
    - Prepares a prompt in the selected language.
    - Calls Gemini API to generate 2–3 concise bullet points.
    - Cleans up output (splits into lines, removes empty strings).

5.Return Response to Frontend
  - Backend constructs a JSON response:[{"title": "Article Title", "summary": ["Bullet point 1", "Bullet point 2"], "url": "https://..."}]
  - Frontend renders each article with its summary.

6.Optional Features
  - Trending news strip using a marquee.
  - Dark mode toggle button.
    
## Tech Stack : 
  - Backend: Python, Flask
  - LLM: Google Gemini API (gemini-2.5-flash)
  - News API: NewsAPI (English), Google News RSS (Hindi/Marathi)
  - Frontend: HTML, CSS, JavaScript
  - Environment: dotenv for API keys, requests, feedparser for RSS
    
## Github Profile : https://github.com/aishwarya-2708
