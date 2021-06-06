const register = [];

export function Given(text, strategy) {
    register.push({ keyword: "Given", text, strategy });
}

export function When(text, strategy) {
    register.push({ keyword: "When", text, strategy });
}

export function Then(text, strategy) {
    register.push({ keyword: "Then", text, strategy });
}

export function entries() { return [...register]; }