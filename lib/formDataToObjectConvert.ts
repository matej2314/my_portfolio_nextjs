export const convertFormData = (formData: FormData) => {
    const obj: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        obj[key] = value === "" ? null : value;
    }
    return obj;
}