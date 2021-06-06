const register = [];

module.exports = {

    Given(text, strategy) {
        register.push({ keyword: "Given", text, strategy });
    },

    When(text, strategy) {
        register.push({ keyword: "When", text, strategy });
    },

    Then(text, strategy) {
        register.push({ keyword: "Then", text, strategy });
    },

    get entries() { return [...register]; }

};