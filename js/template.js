export default class TabPanelTemplateController {
    constructor(name, element) {
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                }
                :host([type="column"]) {
                    flex-direction: row;
                }
                :host([type="column"]) .shadowWrapper {
                    display: flex;
                }
                .tabs {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                }
                :host([type="column"]) .tabs {
                    flex-direction: column;
                }
                .tabs ::slotted(*) {
                    user-select: none;
                    cursor: pointer;
                    height: 48px;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    min-width: var(--tab-panel-default-div-min-width, auto);
                    padding-left: 12px;
                    font-size: 16px;
                }
                .tabs ::slotted(*:hover) {
                    background-color: var(--tab-panel-primary-hover-div-background-color, blue);
                    transition: all 0s;
                    transition-delay: 0s;
                }
                :host([type="column"]) .tabs ::slotted(.selected) {
                    border-left: 4px solid var(--tab-panel-primary-selected-div-border-color);
                   
                }
                :host([type="row"]) .tabs ::slotted(.selected) {
                    border-bottom: 4px solid var(--tab-panel-primary-selected-div-border-color);
                    background-color: var(--tab-panel-primary-selected-div-background-color, blue);
                }
                .tabs ::slotted(.selected) {
                    background-color: var(--tab-panel-primary-active-div-background-color,dark-blue);
                }

                .tab-contents ::slotted(.selected) {
                    background-color: #303136;
                    color: black; 
                }

                .tab-contents ::slotted(*) {
                    display: none;
                }
                .tab-contents ::slotted(.selected) {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    flex-grow: 1; 
                    padding: 5px;
                }
            </style>
            <div class="shadowWrapper" data-translate="${ name }">
                <div class="tabs" part="tabs">
                    <slot id="tab" name="tab"></slot>
                </div>
                <div class="tab-contents" part="tab-contents">
                    <slot id="content" name="content"></slot>
                </div>
            </div>`;
    }

    get() {
        return this.template;
    }
}