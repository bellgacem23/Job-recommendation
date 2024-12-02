from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

app = Flask(__name__)

# Sample job descriptions (in real app, you would query this from your database)
job_data = [
    {"id": 1, "title": "Software Developer", "description": "Develop and maintain software applications."},
    {"id": 2, "title": "Data Scientist", "description": "Analyze and interpret complex data to help companies make decisions."},
    {"id": 3, "title": "Web Developer", "description": "Create and maintain websites and web applications."},
    {"id": 4, "title": "Product Manager", "description": "Oversee product development from concept to launch."},
    {"id": 5, "title": "UI/UX Designer", "description": "Design user interfaces and improve user experience."}
]

# Convert job descriptions to a DataFrame
df_jobs = pd.DataFrame(job_data)

@app.route('/recommendations', methods=['POST'])
def recommend_jobs():
    user_data = request.json  # Example: {"title": "Software Developer", "skills": "Python, JavaScript", "experience": "5 years"}
    
    # Combine user input (title, skills, experience) into a single string
    user_profile = f"{user_data['title']} {user_data['skills']} {user_data['experience']}"
    
    # Combine job descriptions with user profile for vectorization
    descriptions = df_jobs['description'].tolist()
    descriptions.append(user_profile)  # Add user profile to the corpus

    # Apply TF-IDF Vectorizer to the corpus (job descriptions + user profile)
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(descriptions)

    # Calculate cosine similarity between user profile and job descriptions
    cosine_similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])  # Compare last element (user profile) with others
    
    # Get the top 5 job recommendations based on cosine similarity
    similar_jobs_idx = cosine_similarities.argsort()[0][-5:][::-1]
    
    recommendations = df_jobs.iloc[similar_jobs_idx].to_dict(orient='records')
    
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
