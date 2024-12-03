import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export type CeTestAProps = {
  propA: string;
};

@customElement("vum-button")
export class CeTestA extends LitElement {
  @property({ attribute: "prop-a", type: String })
  propA: CeTestAProps["propA"] = "default value";

  render() {
    return html`<div>${this.propA}</div>`;
  }
}
