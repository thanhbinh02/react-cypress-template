export interface CountryLanguageInfo {
  countryCode: string;
  languageCode: string;
}

export const getCountryLanguageInfo =
  (): Cypress.Chainable<CountryLanguageInfo> => {
    return cy.getAllLocalStorage().then((storage) => {
      let raw: string | undefined;

      for (const origin in storage) {
        const item = storage[origin]["aqua_client_selected_country_language"];
        if (item) {
          raw = item;
          break;
        }
      }

      if (!raw || typeof raw !== "string") {
        throw new Error(
          "Không tìm thấy hoặc kiểu dữ liệu không hợp lệ trong localStorage"
        );
      }

      const parsed = JSON.parse(raw);
      const countryCode = parsed.country?.code;
      const languageCode = parsed.language?.code;

      if (!countryCode || !languageCode) {
        throw new Error(
          "Thiếu countryCode hoặc languageCode trong dữ liệu localStorage"
        );
      }

      return {
        countryCode,
        languageCode,
      };
    });
  };

export const fetchLanguageData = (): Cypress.Chainable<any> => {
  return getCountryLanguageInfo().then(({ countryCode, languageCode }) => {
    const apiUrl = `https://api-dev.estuary.solutions/aqua-connect-web-api-dev/v1/language-key?languageCode=${languageCode}&countryCode=${countryCode}`;
    cy.log("API URL:", apiUrl);
    return cy.request(apiUrl).then((response) => {
      const languageData = response.body;
      Cypress.env("languageData", languageData); // lưu global nếu cần
      return languageData;
    });
  });
};
