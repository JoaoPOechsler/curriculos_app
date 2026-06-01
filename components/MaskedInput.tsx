import { forwardRef } from "react";

type MaskType = "cpf" | "telefone" | "data";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: MaskType;
}

function applyMask(value: string, mask: MaskType): string {
  const d = value.replace(/\D/g, "");

  if (mask === "cpf") {
    return d
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  if (mask === "data") {
    if (!/^\d/.test(value)) return value; // permite "Atual", "Em andamento", etc.
    return d.slice(0, 6).replace(/(\d{2})(\d{1,4})/, "$1/$2");
  }

  if (mask === "telefone") {
    if (d.length <= 10) {
      return d
        .slice(0, 10)
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
    }
    return d
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  }

  return value;
}

const MaskedInput = forwardRef<HTMLInputElement, Props>(
  ({ mask, onChange, ...props }, ref) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.target.value = applyMask(e.target.value, mask);
      onChange?.(e);
    }
    return <input ref={ref} onChange={handleChange} {...props} />;
  }
);

MaskedInput.displayName = "MaskedInput";
export default MaskedInput;
