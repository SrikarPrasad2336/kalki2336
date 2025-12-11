# app.py
from flask import Flask, jsonify
from flask_cors import CORS # This is crucial for connecting front-end and back-end

app = Flask(__name__)
# Enable CORS to allow the HTML/JS running in your browser to access this server
CORS(app)

# Initial dummy data for the tasks
tasks_data = [
    {"id": 1, "task": "Finish Portfolio HTML Structure", "completed": False, "priority": "High"},
    {"id": 2, "task": "Write Python automation script", "completed": True, "priority": "Low"},
    {"id": 3, "task": "Design CSS for project cards", "completed": False, "priority": "Medium"}
]

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """
    API endpoint to return the list of tasks as a JSON response.
    """
    print("--- Task data requested ---")
    return jsonify(tasks_data)

@app.route('/')
def home():
    """
    Simple confirmation route.
    """
    return "Python Flask Server is Running. Access /api/tasks for data."

if __name__ == '__main__':
    # Run the server on http://127.0.0.1:5000/
    # Ensure this port is used in your script.js file
    app.run(debug=True)