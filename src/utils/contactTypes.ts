
export const  checkContactTypes = (value: string) => {
        if (!value.trim())
            return ""
        const cleanPhone = value.trim().replace(/[-\s]/g, "");
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
            return "tag-mail"
        if (/^0\d{8,9}$/.test(cleanPhone))
            return "tag-phone"
        return "tag-invalid"
    }

export const validateOptions = (options: { text: string }[]): true | string => {
    const texts = options.map(option => option.text.trim()).filter(text => text !== "");

    if (texts.length < 2)
        return "יש להזין לפחות 2 תשובות";

    if (texts.length > 10)
        return "ניתן להזין עד 10 תשובות";

    if (new Set(texts).size !== texts.length)
        return "אין להזין תשובות כפולות";

    return true;
};