/**
 * Register layouts in the app instance
 *
 * @param {import('vue').App<Element>} app
 */
export function registerLayouts(app) {
   // const layouts = import.meta.globEager('./*.vue');
    const layouts = import.meta.glob("./*.vue",{ eager: true })
    Object.entries(layouts).forEach(([, layout]) => {
      app.component(layout.default.name, layout.default);
    });
  }
