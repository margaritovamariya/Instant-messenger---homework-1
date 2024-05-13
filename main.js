import TabPanelTemplate from './js/template.js';

export default class TabPanelModule extends HTMLElement {
    static elementName = 'tab-panel';
    #tabs = [];
    #tabsContainers = [];
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.addEventListener('render', this.render);
        this.status = 'created';
    }

    get type() {
        return this.getAttribute('type') || 'column';
    }

    set type(value) {
        if (value) {
            this.setAttribute('type', value);
        } else {
            this.setAttribute('type', 'column');
        }
    }

    connectedCallback() {               //kogato zakachim element kum doma
        if (this.status !== 'destroyed') {
            this.status = 'connected';

            this.dispatchEvent(new CustomEvent("connected", { bubbles: true, composed: true, detail: { component: TabPanelModule.elementName } }));

            this.addMutationsObserver();
            this.render();
        }
    }

    addMutationsObserver() {
        let observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    this.shadowLoaded();
                };
            });
        });
        observer.observe(this.shadow, { childList: true });
    }

    shadowLoaded() {
        this.#tabs = this.shadow.querySelector('#tab').assignedElements();
        this.#tabs.forEach(el => {
            el.addEventListener('click', this.onTabClick);
        });

        this.#tabsContainers = this.shadow.querySelector('#content').assignedElements();
    }

    render = () => {
        while (this.shadow.hasChildNodes()) {
            this.shadow.removeChild(this.shadow.firstChild);
        }

        const template = new TabPanelTemplate(TabPanelModule.elementName, this).get();
        this.shadow.appendChild(template.content.cloneNode(true));

        this.dispatchEvent(new CustomEvent("subscribe", { bubbles: true, composed: true, detail: { topic: 'selectTab', listener: this.externalSelectTab.bind(this) } }));
    };

    onTabClick = (event) => {
        if (event && event.target && event.target.slot === 'tab') {
            this.selectTab(this.#tabs.indexOf(event.target));
            this.dispatchEvent(new CustomEvent("tabClick", { bubbles: true, composed: true, detail: { component: TabPanelModule.elementName, index: this.#tabs.indexOf(event.target) } }));
        }
    };

    externalSelectTab(event) {
        if (typeof event.detail.selectTab === 'number') {
            if (event.detail.selectTab < 0) {
                this.#tabs.forEach(el => {
                    el.classList.remove("selected");
                });
            } else {
                this.selectTab(event.detail.selectTab);
            }
        }
    }

    selectTab(index) {
        const tab = this.#tabs[index];
        const container = this.#tabsContainers[index];
        if (!tab) return;

        this.#tabsContainers.forEach(el => {
            el.classList.remove("selected");
        });
        this.#tabs.forEach(el => {
            el.classList.remove("selected");
        });
        container && container.classList.add("selected");
        tab.classList.add("selected");
    }

    disconnectedCallback() {              //aktivira se kogato elementa se mahne ot doma
        this.status = 'destroyed';
        this.dispatchEvent(new CustomEvent("disconnected", { bubbles: true, composed: true, detail: { component: TabPanelModule.elementName } }));
    }
}

window.customElements.define(TabPanelModule.elementName, TabPanelModule);
