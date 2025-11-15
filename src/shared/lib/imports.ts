import type { App, Component } from 'vue';

const getComponentName = (path: string, prefix: string) => {
    const filename = path
        .split('/')
        .flatMap((part) => part.split('\\'))
        .pop()!;
    const componentName = filename.endsWith('.vue') ? filename.slice(0, -4) : filename;
    const componentNameToPascalCase = componentName.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
    );

    return `${prefix}${componentNameToPascalCase[0]!.toUpperCase()}${componentNameToPascalCase.slice(1)}`;
};

export const registerComponents = <T extends { default: U }, U extends Component>(
    app: App,
    modules: Record<string, T>,
    prefix: string,
) => {
    for (const path in modules) {
        const component = modules[path];
        const name = getComponentName(path, prefix);

        if (component) {
            app.component<U>(name, component.default);
        }
    }
};
