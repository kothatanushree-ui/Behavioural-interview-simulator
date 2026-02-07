from flask import Flask, request, jsonify
from evaluator import evaluate_star, calculate_score
from feedback import generate_feedback

app = Flask(__name__)

@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.json
    answer = data["answer"]

    star = evaluate_star(answer)
    score = calculate_score(star)
    feedback = generate_feedback(star)

    return jsonify({
        "score": score,
        "star": star,
        "feedback": feedback
    })

if __name__ == "__main__":
    app.run(debug=True)

