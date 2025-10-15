## Public link : http://3.111.32.254/

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
<img width="1920" height="1020" alt="NewsAgent1" src="https://github.com/user-attachments/assets/b469e79a-f087-4f27-be89-71b59a565b86" />
<img width="1920" height="1020" alt="NewsAgent2" src="https://github.com/user-attachments/assets/d8753bdf-bdc6-4833-ac2a-7a99ccd0ffa3" />
<img width="1920" height="1020" alt="NewsAgent3" src="https://github.com/user-attachments/assets/8826243a-249c-4e18-8be5-38c5d31e2528" />
<img width="1920" height="1020" alt="NewsAgent4" src="https://github.com/user-attachments/assets/6813bdf5-62d7-4647-a6b8-5ae1f98cde6f" />



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
