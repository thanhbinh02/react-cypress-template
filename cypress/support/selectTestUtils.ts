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
  const select =
    typeof selector === "string"
      ? cy.get(selector).closest(".ant-select").should("exist")
      : cy.wrap(selector).closest(".ant-select").should("exist");

  if (props.placeholder && !props.defaultValue) {
    select
      .find(".ant-select-selection-placeholder")
      .should("contain", props.placeholder);
  }

  if (props.defaultValue) {
    if (props.type === "single") {
      expect(props.defaultValue).to.satisfy(
        (value) =>
          typeof value === "string" ||
          typeof value === "number" ||
          (Array.isArray(value) &&
            value.every(
              (item) => typeof item === "string" || typeof item === "number"
            ))
      );

      if (!props.defaultLabels) {
        throw new Error(
          "defaultLabels is required for single mode when defaultValue is provided"
        );
      }

      select
        .find(".ant-select-selection-item")
        .should("contain", props.defaultLabels);
    } else if (props.type === "multiple" || props.type === "tags") {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(Array.isArray(props.defaultValue)).to.be.true;
      if (!props.defaultLabels) {
        throw new Error(
          `defaultLabels is required for ${props.type} mode when defaultValue is provided`
        );
      }

      select.find(".ant-select-selection-item-content").then(($items) => {
        const displayedLabels = $items
          .toArray()
          .map((item) => item.innerText.trim());

        expect(displayedLabels).to.have.length(
          (props.defaultValue as string[]).length,
          `Expected ${props.defaultValue} to have ${
            (props.defaultValue as string[]).length
          } items, but got ${displayedLabels.length}`
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
}
