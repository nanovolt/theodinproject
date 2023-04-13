export function AppendComponents(parent, components) {
  components.forEach((component) => {
    component.initializeComponent(parent);
  });
}

export function initializeEventListeners(components) {
  components.forEach((component) => {
    component.initializeEventListeners();
  });
}
