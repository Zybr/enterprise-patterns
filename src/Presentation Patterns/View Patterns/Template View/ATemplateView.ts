export default abstract class ATemplateView {
  protected fillTemplate(template: string, variables: Object): string {
    for (const key in variables) {
      const value = variables[key];
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return template;
  }
}
