export function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const customDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return customDescriptor;
}
