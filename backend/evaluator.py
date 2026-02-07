# evaluator.py

def evaluate_star(answer):
    answer = answer.lower()

    star = {
        "Situation": "situation" in answer or "when" in answer,
        "Task": "task" in answer or "role" in answer,
        "Action": "action" in answer or "i did" in answer or "did" in answer,
        "Result": "result" in answer or "outcome" in answer
    }
    return star


def calculate_score(star):
    score = 0
    for value in star.values():
        if value:
            score += 2.5
    return score


def generate_summary(answer, star):
    parts = []

    if star["Situation"]:
        parts.append("described the situation")
    if star["Task"]:
        parts.append("explained your responsibility")
    if star["Action"]:
        parts.append("outlined the actions you took")
    if star["Result"]:
        parts.append("mentioned the outcome")

    if not parts:
        return "Your answer needs more structure and clarity."

    return "You " + ", ".join(parts) + "."
