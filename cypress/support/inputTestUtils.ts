/// <reference types="cypress" />

export type InputProps = {
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  testTyping?: string;
  sizeClass?: "large" | "middle" | "small";
  prefix?: boolean;
  suffix?: boolean;
  addonBefore?: boolean;
  addonAfter?: boolean;
  statusError?: boolean;
  statusWarning?: boolean;
  clearable?: boolean;
  passwordEye?: boolean;
};

export function checkInputProps(selector: string, props: InputProps = {}) {
  const input = cy.get(selector).should("be.visible");

  if (props.placeholder) {
    input.should("have.attr", "placeholder", props.placeholder);
  }

  if (props.type) {
    input.should("have.attr", "type", props.type);
  }

  if (props.defaultValue !== undefined) {
    input.should("have.value", props.defaultValue);
  }

  if (props.disabled) {
    input.should("be.disabled");
  }

  if (props.readOnly) {
    input.should("have.attr", "readonly");
  }

  if (props.testTyping) {
    input.type(props.testTyping).should("have.value", props.testTyping);
  }

  if (props.sizeClass) {
    if (props.sizeClass === "large") {
      input.should("be.visible").and("have.class", "ant-input-lg");
    } else if (props.sizeClass === "small") {
      input.should("be.visible").and("have.class", "ant-input-sm");
    } else {
      return;
    }
  }

  if (props.prefix) {
    input.parents(".ant-input-affix-wrapper").within(() => {
      cy.get(".ant-input-prefix").should("be.visible");
    });
  }

  if (props.suffix) {
    input.parents(".ant-input-affix-wrapper").within(() => {
      cy.get(".ant-input-suffix").should("be.visible");
    });
  }

  if (props.addonBefore) {
    input.parents(".ant-input-group").within(() => {
      cy.get(".ant-input-group-addon").first().should("be.visible");
    });
  }

  if (props.addonAfter) {
    input.parents(".ant-input-group").within(() => {
      cy.get(".ant-input-group-addon").last().should("be.visible");
    });
  }

  if (props.statusError) {
    input.should("have.class", "ant-input-status-error");
  }

  if (props.statusWarning) {
    input.should("have.class", "ant-input-status-warning");
  }

  if (props.clearable) {
    input.type("Clear me").should("have.value", "Clear me");
    input.parent().find(".ant-input-clear-icon").click();
    input.should("have.value", "");
  }

  if (props.passwordEye) {
    input.type("password123");
    cy.get(".ant-input-password-icon").click();
  }
}
