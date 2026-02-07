from flask import Flask, request, jsonify
from flask_cors import CORS

from evaluator import evaluate_star, calculate_score
from feedback import generate_feedback

app = Flask(__name__)
CORS(app)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    answer = data["answer"]

    star = evaluate_star(answer)
    score = calculate_score(star)
    feedback = generate_feedback(star)

    return jsonify({
        "score": score,
        "feedback": feedback
    })

# 🔥 THIS PART IS MANDATORY 🔥
if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True)
