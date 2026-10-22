
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