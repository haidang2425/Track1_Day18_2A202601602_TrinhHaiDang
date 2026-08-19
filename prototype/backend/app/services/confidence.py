ESCALATION_THRESHOLD = 0.6

def compute_confidence(retrieval_score: float, grounded_ratio: float) -> float:
    return round(0.5 * retrieval_score + 0.5 * grounded_ratio, 4)

def requires_escalation(confidence: float) -> bool:
    return confidence < ESCALATION_THRESHOLD
