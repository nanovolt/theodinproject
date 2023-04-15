export default function InitializeComponents(parent, components) {
  components.forEach((component) => {
    component.initializeComponent(parent);
  });
}
