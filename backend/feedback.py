# feedback.py

def generate_feedback(star):
    feedback = []

    if not star["Situation"]:
        feedback.append("Explain the situation clearly.")
    if not star["Task"]:
        feedback.append("Describe your role or responsibility.")
    if not star["Action"]:
        feedback.append("Mention the actions you took.")
    if not star["Result"]:
        feedback.append("Add the result or outcome.")

    if not feedback:
        feedback.append("Great job! Your answer follows the STAR method well.")

    return feedback
