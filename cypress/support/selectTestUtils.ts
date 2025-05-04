export type SelectTestProps = {
  type?: "multiple" | "single" | "tags";
  placeholder?: string;
  defaultValue?: string | string[] | number | number[];
  defaultLabels?: string | string[];
};

export function checkSelectProps(
  selector: string | JQuery<HTMLElement>,
  props: SelectTestProps = {}
) {
  const getSelectWrapper = () => {
    if (typeof selector === "string") {
      return cy.get(selector).closest(".ant-select");
    } else {
      return cy.wrap(selector).closest(".ant-select");
    }
  };

  getSelectWrapper()
    .should("exist")
    .then(($select) => {
      const wrapped = cy.wrap($select);

      if (props.placeholder && !props.defaultValue) {
        wrapped
          .find(".ant-select-selection-placeholder")
          .should("contain", props.placeholder);
      }

      if (props.defaultValue) {
        if (props.type === "single") {
          if (!props.defaultLabels) {
            throw new Error(
              "defaultLabels is required for single mode when defaultValue is provided"
            );
          }

          wrapped
            .find(".ant-select-selection-item")
            .should("contain", props.defaultLabels);
        } else if (props.type === "multiple" || props.type === "tags") {
          if (!Array.isArray(props.defaultValue)) {
            throw new Error(
              `defaultValue must be an array in ${props.type} mode`
            );
          }
          if (!props.defaultLabels) {
            throw new Error(
              `defaultLabels is required for ${props.type} mode when defaultValue is provided`
            );
          }

          wrapped.find(".ant-select-selection-item-content").then(($items) => {
            const displayedLabels = $items
              .toArray()
              .map((item) => item.innerText.trim());

            expect(displayedLabels).to.have.length(
              (props.defaultValue as string[]).length
            );

            (props.defaultLabels as string[]).forEach((label, index) => {
              expect(displayedLabels).to.include(
                label,
                `Expected label "${label}" to be displayed for value "${
                  (props.defaultValue as string[])[index]
                }"`
              );
            });
          });
        } else {
          throw new Error(`Unsupported select type: ${props.type}`);
        }
      }
    });
}
