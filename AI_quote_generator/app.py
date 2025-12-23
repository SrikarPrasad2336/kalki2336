import requests
import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for

# Load environment variables
load_dotenv()

API_KEY = os.getenv("NINJA_API_KEY")
API_URL = "https://api.api-ninjas.com/v1/quotes"
headers = {"X-Api-Key": API_KEY}

app = Flask(__name__)

def generate_ai_quote():
    try:
        response = requests.get(API_URL, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        if isinstance(data, list) and len(data) > 0:
            return data[0].get("quote", "No quote available"), data[0].get("author", "Unknown")
        return "No quote received", "Unknown"
    except Exception as e:
        return f"Error: {str(e)}", "System"

# 1. Entrance Page
@app.route("/")
def entrance():
    return render_template("home.html")

# 2. Registration Page
@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Logic to save user would go here
        return redirect(url_for('login'))
    return render_template("registration.html")

# 3. Login Page
@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Logic to verify user would go here
        return redirect(url_for('index')) # Matches function name below
    return render_template("login.html")

# 4. Main Quote Page (Renamed to 'index' to match your templates)
@app.route("/index")
def index():
    quote, author = generate_ai_quote()
    return render_template("index.html", quote=quote, author=author)

if __name__ == "__main__":
    app.run(debug=True)